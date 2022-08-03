app.components.usersView = () => {
    app.data.pageTitle = 'Users';
    
    return {
        template: `
            <div>
                <h1>Users</h1>
                ${app.render('usersList')}
            </div>
        `
    }
};