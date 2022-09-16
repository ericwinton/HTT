app.routeData.distributors = async () => {
    app.data.distributors = await app.functions.get('distributors');
};

app.components.distributors = () => {
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Distributors'}]});
    
    return {
        template: `
            <div>
                ${app.render('headingBar', {title: 'Distributors', breadcrumbs: breadcrumbs})}
                ${app.render('distributorsList')}
            </div>
        `
    }
};