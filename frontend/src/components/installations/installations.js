app.routeData.installations = async () => {
    app.data.installations = await app.functions.get('installations', app.url.params);

    if (app.url.params.customer) {
        app.data.customer = (app.data.installations[0]) ? app.data.installations[0].customer : null;
    }
};

app.components.installations = () => {
    var bcItems = (app.data.customer) ? [{text: app.data.customer.name, url: '/customers/' + app.data.customer.id}, {text: 'Installations'}] : [{text: 'Installations'}];
    var breadcrumbs = app.render('breadcrumbs', {items: bcItems});
    var output = (app.url.params.customer && !app.data.customer) ? '<p>Customer not found</p>' : app.render('installationsList');

    return {
        template: `
            <div>
                ${app.render('headingBar', {title: 'Installations', breadcrumbs: breadcrumbs})}
                ${output}
            </div>
        `
    }
};