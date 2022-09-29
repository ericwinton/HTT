app.components.usersList = (props) => {
    var exclude = (props.exclude) ? ['image', 'customerId'].concat(props.exclude) : ['image', 'customerId'];

    return {
        template: `
            <div class="users-list">
                ${app.render('btnGroup', { newBtnUrl: '/users/new' })}
                ${app.render('table', {model: 'users', data: app.data.users, exclude: exclude, detailLink: '/users/{{id}}'})}
            </div>
        `
    }
};