app.routeData.instRtuConfigs = async () => {
    app.data.installation = await app.functions.getById('installations', app.url.params.installation);
    app.data.customer = app.data.installation.customer;
};

app.components.instRtuConfigs = () => {
    return {
        template: `
            ${app.render('instPageTemplate', {
                mainContent: `
                    <div>
                        <h2>RTU Configs</h2>
                        ${app.render('table', {model: 'rtuConfigs'})}
                    </div>
                `
            })}
        `
    }
};