app.routeData.instAlarms = async () => {
    if (app.url.params.installation) {
        app.data.installation = await app.functions.getById('installations', app.url.params.installation, {depth: 2});
        app.data.customer = app.data.installation.customer;
    }

    app.data.alarms = await app.functions.get('alarms', app.url.params);
};