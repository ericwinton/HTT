app.routeData.instDetail = async () => {
    app.data.installation = await app.functions.getById('installations', app.url.mapped.instId);
    app.data.customer = app.data.installation.customer;
};