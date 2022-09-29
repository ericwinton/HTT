app.components.custNewInstallation = function({cust}) {
    return {
        template: `
            <div class="new-installation">
                <h2>New Installation</h2>
                ${app.render('form', {model: 'installations', data: {customer: cust}})}
            </div>
        `
    }
};