app.routeData.hardware = async () => {
    var hardwareType = app.url.mapped.hardwareType || 'rtus';
    app.data.hardware = await app.functions.get(hardwareType);
};