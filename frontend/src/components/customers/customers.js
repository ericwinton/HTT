app.routeData.customers = async () => {
    app.data.customers = await app.functions.get('customers', app.url.params);
};

app.components.customers = () => {
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Customers'}]});

    return {
        template: `
            <div class="customers">
                ${app.render('headingBar', {title: 'Customers', breadcrumbs: breadcrumbs})}
                ${app.render('newBtn', { model: 'customers' })}
                ${app.render('table', {model: 'customers', data: app.data.customers, detailLink: '/customers/{{id}}'})}
            </div>
        `
    }
};