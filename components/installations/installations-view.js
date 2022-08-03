app.components.installationsView = () => {
    var includeCustomer = (app.data.user.role === 'HTT Admin');
    var installations = (app.data.user.customer_id) ? app.data.installations.filter(inst => inst.customer_id === app.data.user.customer_id) : app.data.installations;
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Installations'}]});

    return {
        template: `
            <div>
                ${app.render('headingBar', {title: 'Installations', breadcrumbs: breadcrumbs})}
                ${app.render('installationsList', {installations: installations, includeCustomer: includeCustomer, customerId: app.data.user.customer_id})}
            </div>
        `
    }
};