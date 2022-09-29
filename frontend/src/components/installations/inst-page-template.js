app.routeData.instPageTemplate = async () => {
    var instId = app.url.mapped.instId;
    
    app.data.installation = await app.functions.getById('installations', instId);
    app.data.customer = await app.functions.getById('customers', app.data.installation.customer.id);

    var sectionSlug = app.url.pathArray[2];

    if (sectionSlug === 'io') {
        var ioTypes = await app.functions.get('io-types');

        app.data.ioTypes = ioTypes;

        if (app.url.mapped.ioType && app.url.mapped.ioType !== 'new') {
            // io by type
            app.data.io = await app.functions.get(app.url.mapped.ioType, {installation: instId});

            if (app.url.mapped.ioId && app.url.mapped.ioId !== 'new') {
                // io detail
                app.data.ioItem = await app.functions.getById(app.url.mapped.ioType, app.url.mapped.ioId);
            }
        } else {
            // all io for installation
            var io = [];

            for (var i = 0; i < ioTypes.length; i++) {
                var ioType = ioTypes[i];
                var typeResults = await app.functions.get(ioType.model, {installation: instId});

                if (typeResults) {
                    typeResults.forEach(item => {
                        item._type = ioType.model;
                        io.push(item);
                    });
                }
            }

            app.data.io = io;
        }
    } else if (sectionSlug === 'alarms') {
        if (app.url.mapped.alarmId) {
            app.data.alarm = await app.functions.getById('alarms', app.url.mapped.alarmId, {depth: 2});
        } else {
            app.data.alarms = await app.functions.get('alarms', app.url.params);
        }
    }
}

app.components.instPageTemplate = () => {
    var inst = app.data.installation;
    var cust = app.data.customer;
    var baseUrl = `/installations/${inst.id}`;
    var subnavItems = [
        {text: 'Overview', url: baseUrl, component: 'instDetail'}, 
        {text: 'Alarms', url: `${baseUrl}/alarms`, component: 'instAlarms'}, 
        {text: 'Logs', url: `${baseUrl}/logs`, component: 'instLogs'},
        {text: 'IO',  url: `${baseUrl}/io`, component: 'instIO'},
        {text: 'RTU Configs', url: `${baseUrl}/rtu-configs`, component: 'instRtuConfigs'},
        {text: 'RTU Messages', url: `${baseUrl}/rtu-messages`, component: 'instRtuMessages'},
        {text: 'Telemetry Data', url: `${baseUrl}/telemetry-data`, component: 'instTelemetryData'},
        {text: 'Legacy Controls', url: `${baseUrl}/legacy-controls`, component: 'instLegacyControls'}
    ];

    var section = (!app.url.pathArray[2]) ? subnavItems[0] : subnavItems.find(sect => app.url.path.indexOf(sect.url) > -1 && sect.text !== 'Overview');
    var component = null;

    console.log('why');

    // Detail pages
    if (app.url.mapped.alarmId) {
        component = 'instAlarmDetail';
    } else if (app.url.mapped.logId) {
        component = 'instLogDetail';
    } else if (app.url.pathArray[2] === 'io') {
        console.log('yep');
        if (app.url.mapped.ioId === 'new' || app.url.mapped.ioType === 'new') {
            console.log('in here');
            component = 'instNewIO';
        } else if (app.url.mapped.ioId) {
            component = 'instIODetail';
        } else {
            component = 'instIO';
        }
    } else if (app.url.mapped.rtuConfigId) {
        component = 'instRtuConfigDetail';
    } else if (app.url.mapped.rtuMessageId) {
        component = 'instRtuMessageDetail';
    } else if (app.url.mapped.rtuTelemetryDataId) {
        component = 'instTelemetryDataDetail';
    } else if (app.url.mapped.rtuLegacyControlId) {
        component = 'instLegacyControlDetail';
    } else {
        component = section.component;
    }

    section.active = true;

    var bcItems = (!app.data.user.customer) ? [
        {text: 'Customers', url: '/customers'},
        {text: cust.name, url: '/customers/' + cust.id},
        {text: 'Installations', url: '/customers/' + cust.id + '/installations'},
        {text: inst.name}
    ] : [
        {text: 'Installations', url: '/installations'},
        {text: inst.name}
    ];

    var breadcrumbs = app.render('breadcrumbs', {items: bcItems});
    

    return {
        template: `
            <div class="installation">
                ${app.render('headingBar', {title: inst.name, breadcrumbs: breadcrumbs})}
                <div class="grid grid-1-3">
                    <div>
                        ${app.render('subnav', {items: subnavItems})}
                    </div>
                    <div>
                        ${app.render(component, {inst: inst})}
                    </div>
                </div>
            </div>
        `,

        styles: `
            #map {
                height: 250px;
                margin-bottom: 30px;
            }
        `
    }
};