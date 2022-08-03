app.components.installationsView = () => {
    var includeCustomer = (app.data.user.role === 'HTT Admin');
    var installations = (app.data.user.customer_id) ? app.data.installations.filter(inst => inst.customer_id === app.data.user.customer_id) : app.data.installations;

    app.data.pageTitle = 'Installations';

    return {
        template: `
            <div>
                <h1>Installations</h1>
                ${app.render('installationsList', {installations: installations, includeCustomer: includeCustomer, customerId: app.data.user.customer_id})}
            </div>
        `
    }
};