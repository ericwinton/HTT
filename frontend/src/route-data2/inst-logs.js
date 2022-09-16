app.routeData.instLogs = async () => {
    if (app.url.params.installation) {
        app.data.installation = await app.functions.getById('installations', app.url.params.installation, {depth: 2});
        app.data.customer = app.data.installation.customer;
    }

    app.data.logs = await app.functions.get('logs', app.url.params);
};