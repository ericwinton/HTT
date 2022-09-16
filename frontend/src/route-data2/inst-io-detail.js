app.routeData.instIODetail = async () => {
    var io = await app.functions.getById(app.url.mapped.ioType, app.url.mapped.ioId, {depth: 2});
    app.data.io = io;
    app.data.installation = io.installation;
    app.data.customer = io.installation.customer;
}