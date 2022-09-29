app.components.distributorsList = (props) => {
    return {
        template: `
            <div class="distributors-list">
                ${app.render('btnGroup', { newBtnUrl: '/distributors/new' })}
                ${app.render('table', { model: 'distributors', data: app.data.distributors, detailLink: '/distributors/{{id}}' })}
            </div>
        `
    }
};