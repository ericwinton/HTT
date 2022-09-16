app.routeData.instNewIO = async () => {
    app.data.ioTypes = await app.functions.get('io-types');
};