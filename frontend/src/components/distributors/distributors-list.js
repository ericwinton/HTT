app.components.distributorsList = () => {
    var distributors = (app.data.distributor) ? [app.data.distributor] : app.data.distributors;

    return {
        watch: ['distributors'],

        template: `
            <div class="distributors-list">
                ${app.render('newBtn', { model: 'distributors' })}
                ${app.render('table', { model: 'distributors', data: distributors, detailLink: '/distributors/{{id}}' })}
            </div>
        `
    }
};