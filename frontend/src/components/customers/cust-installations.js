app.components.custInstallations = function({cust}) {
    return {
        template: `
            <div class="customer-installations">
                <h2>Installations</h2>
                ${app.render('btnGroup', {newBtnUrl: `/customers/${cust.id}/installations/new`, items: [{text: 'Map View', url: `/customers/${cust.id}/installations/map`, icon: 'map-marker-alt'}]})}
                ${app.render('table', {model: 'installations', data: app.data.custInstallations, exclude: ['customer'], detailLink: `/installations/{{id}}`})}
            </div>
        `
    }
};