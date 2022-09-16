app.routeData.userDetail = async () => {
    app.data.userDetail = await app.functions.getById('users', app.url.mapped.userId);
}