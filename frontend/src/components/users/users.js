app.routeData.users = async () => {
    app.data.users = await app.functions.get('users');
}

app.components.users = () => {
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Users'}]});
    
    return {
        template: `
            <div>
                ${app.render('headingBar', {title: 'Users', breadcrumbs: breadcrumbs})}
                ${app.render('usersList')}
            </div>
        `
    }
};