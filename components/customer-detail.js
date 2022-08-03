app.components.customerDetail = () => {
    var customer = app.data.customers.find(cust => cust.id === +app.url.mapped.custId);
    var installations = app.data.installations.filter(inst => inst.customer_id === customer.id);

    app.data.pageTitle = customer.name;

    return {
        template: `
            <div>
                <h1>${customer.name}</h1>

                ${app.render('breadcrumbs', {items: [
                    {text: 'Customers', url: '/customers'},
                    {text: customer.name}
                ]})}

                <h2>Distributor</h2>
                ${app.render('distributorsList', {customer})}

                <h2>Installations</h2>
                ${app.render('installationsList', {installations: installations, customer: customer})}

                <h2>Users</h2>
                <p>${app.render('usersList', {includeCustomer: false})}</p>
            </div>
        `
    }
};