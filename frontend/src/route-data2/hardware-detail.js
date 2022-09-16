app.routeData.hardwareDetail = async () => {
    app.data.hardware = await app.functions.getById(app.url.mapped.hardwareType, app.url.mapped.hardwareId);
};