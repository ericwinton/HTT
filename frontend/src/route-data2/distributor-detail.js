app.routeData.distributorDetail = async () => {
    app.data.distributor = await app.functions.getById('distributors', app.url.mapped.distId);
}