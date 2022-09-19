app.components.newCustomer = () => {
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Customers', url: '/customers'}, {text: 'New Customer'}]});

    return {
        template: `
            <div class="customers">
                ${app.render('headingBar', {title: 'New Customer', breadcrumbs: breadcrumbs})}
                ${app.render('form', {model: 'customers'})}
            </div>
        `
    }
};