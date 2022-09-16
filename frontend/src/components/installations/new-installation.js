app.routeData.newInstallation = async () => {
    console.log('in here');
    app.data.customer = (app.url.params.customer) ? await app.functions.getById('customers', app.url.params.customer) : null;
};

app.components.newInstallation = () => {
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Installations', url: '/installations'}, {text: 'New'}]});

    return {
        template: `
            <div>
                ${app.render('headingBar', {title: 'New Installation', breadcrumbs: breadcrumbs})}
                ${app.render('form', {model: 'installations', data: {customer: app.data.customer}})}
            </div>
            
        `
    }
};