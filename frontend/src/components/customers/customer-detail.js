app.routeData.customerDetail = async () => {
    var customer = await app.functions.getById('customers', app.url.mapped.custId);

    app.data.installations = await app.functions.get('installations', {customer: customer.id});
    app.data.users = await app.functions.get('users', {customer: customer.id});
    app.data.distributor = await app.functions.getById('distributors', customer.distributor.id);
    app.data.customer = customer;
};

app.components.customerDetail = function() {
    var customer = app.data.customer;
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Customers', url: '/customers'}, {text: customer.name}]});

    return {
        template: `
            <div class="customer-detail">
                ${app.render('headingBar', {title: customer.name, breadcrumbs: breadcrumbs})}
                        
                <h2>Installations</h2>
                ${app.render('installationsList', {newBtnParams: '?customer=' + customer.id})}
                <br /><br />
                <h2>Users</h2>
                <p>${app.render('usersList', {filters: {customer: customer.id}, exclude: ['customer']})}</p>
                <br /><br />
                <h2>Distributor</h2>
                ${app.render('distributorsList')}
            </div>
        `
    }
};