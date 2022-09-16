app.routeData.distributorDetail = async () => {
    app.data.distributor = await app.functions.getById('distributors', app.url.mapped.distId);
}

app.components.distributorDetail = () => {
    var dist = app.data.distributor;
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Distributors', url: '/distributors'}, {text: dist.name}]});

    return {
        template: `
            <div class="distributor-detail">
                ${app.render('headingBar', {title: dist.name, breadcrumbs: breadcrumbs})}
                ${app.render('form', {model: 'distributors', data: dist})}
            </div>
        `
    }
};