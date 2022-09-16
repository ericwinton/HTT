app.components.newDistributor = () => {
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Distributors', url: '/distributors'}, {text: 'New Distributor'}]});
    
    return {
        template: `
            <div>
                ${app.render('headingBar', {title: 'New Distributor', breadcrumbs: breadcrumbs})}
                ${app.render('form', {model: 'distributors'})}
            </div>
        `
    }
};