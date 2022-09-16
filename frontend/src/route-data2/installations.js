app.routeData.installations = async () => {
    app.data.installations = await app.functions.get('installations', app.url.params);

    if (app.url.params.customer) {
        app.data.customer = (app.data.installations[0]) ? app.data.installations[0].customer : null;
    }
};