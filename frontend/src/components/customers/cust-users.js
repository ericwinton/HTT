app.components.custUsers = function({cust}) {
    return {
        template: `
            <div class="customer-users">
                <h2>Users</h2>
                ${app.render('table', {model: 'users', data: app.data.custUsers, exclude: ['image', 'customer'], detailLink: `/users/{{id}}`})}
            </div>
        `
    }
};