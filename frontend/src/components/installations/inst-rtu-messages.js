app.routeData.instRtuMessages = async () => {
    app.data.installation = await app.functions.getById('installations', app.url.params.installation);
    app.data.customer = app.data.installation.customer;
};

app.components.instRtuMessages = () => {
    return {
        template: `
            ${app.render('instPageTemplate', {
                mainContent: `
                    <div>
                        <h2>RTU Messages</h2>
                        ${app.render('table', {model: 'rtuMessages'})}
                    </div>
                `
            })}
        `
    }
};