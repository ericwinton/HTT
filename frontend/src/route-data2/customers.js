app.routeData.customers = async () => {
    app.data.customers = await app.functions.get('customers', app.url.params);
};