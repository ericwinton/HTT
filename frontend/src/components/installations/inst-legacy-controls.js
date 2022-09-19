app.routeData.instLegacyControls = async () => {
    app.data.installation = await app.functions.getById('installations', app.url.params.installation);
    app.data.customer = app.data.installation.customer;
};

app.components.instLegacyControls = () => {
    return {
        template: `
            <div class="inst-legacy-controls">
                ${app.render('instPageTemplate', {
                    mainContent: `
                        <div>
                            <h2>Legacy Controls</h2>
                            ${app.render('table', {model: 'legacy-controls'})}
                        </div>
                    `
                })}
            </div>
        `
    }
};