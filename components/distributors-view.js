app.components.distributorsView = () => {
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