app.routeData.instDetail = async () => {
    app.data.installation = await app.functions.getById('installations', app.url.mapped.instId);
    app.data.customer = app.data.installation.customer;
};

app.components.instDetail = () => {
    return {
        template: `
            ${app.render('instPageTemplate', {
                mainContent: `
                    <div>
                        <h2>Overview</h2>
                        ${app.render('form', {model: 'installations', data: app.data.installation})}
                    </div>
                `
            })}
        `
    }
};