app.components.installationPageTemplate = () => {
    var inst = app.data.installations.find(cust => cust.id === +app.url.mapped.instId);
    var cust = app.data.customers.find(cust => cust.id === inst.customer_id);
    var subnavItems = [];
    var sectionSlug = (app.url.path.indexOf('/io') === 0) ? 'io' 
        : (app.url.path.indexOf('/alarms') === 0) ? 'alarms' 
        : (app.url.mapped.instSection) ? app.url.mapped.instSection 
        : 'overview';
    var currentSection = app.data.instSections.find(section => section.toLowerCase().replace(/ /g, '-') === sectionSlug);
    var isDetail = (app.url.mapped.instSectionDetailId) ? 'Detail' : '';
    var component = (app.url.mapped.instSectionDetailId === 'new') ? 'instNewIO' : 'inst' + currentSection.replace(/ /g, '') + isDetail;
    var bcItems = [
        {text: 'Installations', url: '/installations'},
        {text: inst.name}
    ];

    app.data.pageTitle = currentSection + ' | ' + inst.name;

    if (!app.data.user.customer_id) {
        bcItems = [
            {text: 'Customers', url: '/customers/' + inst.customer_id},
            {text: cust.name, url: '/customers/' + cust.id},
            {text: inst.name}
        ];
    }

    app.data.instSections.forEach(item => {
        var active = (item === currentSection) ? true : false;
        subnavItems.push({text: item, url: `/installations/${inst.id}/${item.toLowerCase().replace(/ /g, '-')}`, active: active});
    });

    return {
        template: `
            <div>
                <h1>${inst.name}</h1>
                ${app.render('breadcrumbs', {items: bcItems})}
                <div class="grid grid-1-3">
                    ${app.render('subnav', {items: subnavItems})}
                    <div>
                        ${app.render(component, {inst: inst})}
                    </div>
                </div>
            </div>
        `
    }
};