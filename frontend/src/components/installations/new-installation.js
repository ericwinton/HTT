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