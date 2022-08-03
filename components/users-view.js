app.components.usersView = () => {
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