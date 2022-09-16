app.routeData.customerDetail = async () => {
    var customer = await app.functions.getById('customers', app.url.mapped.custId);
    var installations = await app.functions.get('installations', {customer: customer.id});
    var users = await app.functions.get('users', {customer: customer.id});
    var distributor = await app.functions.getById('distributors', customer.distributor.id);

    app.data.customer = customer;
    app.data.installations = installations;
    app.data.users = users;
    app.data.distributor = distributor;
}