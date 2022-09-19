app.components.instPageTemplate = (props) => {
    var inst = app.data.installation;
    var section = app.data.instSections.find(sect => sect.slug === app.url.pathArray[0]);
    var subnavItems = [];
    var bcItems = [{text: section.title}];
    var pageTitle = section.title;

    if (inst) {
        var cust = app.data.customer;

        pageTitle = inst.name;

        bcItems = (!app.data.user.customer) ? 
            [
                {text: 'Customers', url: '/customers'},
                {text: cust.name, url: '/customers/' + cust.id},
                {text: 'Installations', url: '/installations?customer=' + cust.id},
                {text: inst.name}
            ] : [
                {text: 'Installations', url: '/installations'},
                {text: inst.name}
            ];

        app.data.instSections.forEach(item => {
            var active = (item.title === section.title) ? true : false;
            var url = (item.title === 'Overview') ? `/installations/${inst.id}` : `/${item.slug}?installation=${inst.id}`;
            subnavItems.push({text: item.title, url: url, active: active});
        });

        output = `
            <div class="grid grid-1-3">
                <div>
                    ${app.render('subnav', {items: subnavItems})}
                    <div id="map"></div>
                </div>
                <div>
                    ${props.mainContent}
                </div>
            </div>
        `;
    } else {
        output = `${app.render('table', {model: section.slug})}`;
    }

    var breadcrumbs = app.render('breadcrumbs', {items: bcItems});
    

    return {
        template: `
            <div class="installations">
                ${app.render('headingBar', {title: pageTitle, breadcrumbs: breadcrumbs})}
                ${output}
            </div>
        `,

        styles: `
            #map {
                height: 250px;
                margin-bottom: 30px;
            }
        `,

        onEveryRender: async () => {
            if (inst.lat && inst.lng) {
                app.functions.loadStylesheets(['https://unpkg.com/leaflet@1.7.1/dist/leaflet.css']);

                await app.functions.loadScripts(['https://unpkg.com/leaflet@1.7.1/dist/leaflet.js']);

                const latLng = [parseFloat(inst.lat), parseFloat(inst.lng)];

                const map = L.map("map", {
                    center: latLng,
                    zoom: 15
                });

                L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap'
                }).addTo(map);

                var marker = L.marker(latLng);
                marker.bindPopup(inst.name);

                marker.addTo(map);
            }
        }
    }
};