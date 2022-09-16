app.routeData.instIO = async () => {
    if (app.url.params.installation) {
        app.data.installation = await app.functions.getById('installations', app.url.params.installation);
        app.data.customer = app.data.installation.customer;
    }

    var io = [];
    var ioTypes = await app.functions.get('io-types');

    for (var i = 0; i < ioTypes.length; i++) {
        var ioType = ioTypes[i];
        var typeResults = await app.functions.get(ioType.model, app.url.params);

        typeResults.forEach(res => {
            res._type = ioType.model;
            io.push(res);
        });
    }

    app.data.io = io;
};