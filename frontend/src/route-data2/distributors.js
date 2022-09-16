app.routeData.distributors = async () => {
    app.data.distributors = await app.functions.get('distributors');
};