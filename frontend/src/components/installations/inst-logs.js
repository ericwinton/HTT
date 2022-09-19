app.routeData.instLogs = async () => {
    if (app.url.params.installation) {
        app.data.installation = await app.functions.getById('installations', app.url.params.installation, {depth: 2});
        app.data.customer = app.data.installation.customer;
    }

    app.data.logs = await app.functions.get('logs', app.url.params);
};

app.components.instLogs = () => {
    return {
        template: `
            <div class="inst-logs">
                ${app.render('instPageTemplate', {
                    mainContent: `
                        <div>
                            <h2>Logs</h2>
                            ${app.render('table', {model: 'logs', data: null, link: `/logs/{{id}}`})}
                        </div>
                    `
                })}
            </div>
            
        `
    }
};