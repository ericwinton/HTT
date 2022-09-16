app.components.usersNew = () => {
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Users', url: '/users'}, {text: 'New'}]});
    
    return {
        template: `
            <div>
                ${app.render('headingBar', {title: 'Users', breadcrumbs: breadcrumbs})}
                ${app.render('form', {model: 'users'})}
            </div>
        `
    }
};