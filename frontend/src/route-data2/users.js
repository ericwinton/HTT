app.routeData.users = async () => {
    app.data.users = await app.functions.get('users');
}