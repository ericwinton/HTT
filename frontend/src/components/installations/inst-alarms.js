app.routeData.instAlarms = async () => {
    if (app.url.params.installation) {
        app.data.installation = await app.functions.getById('installations', app.url.params.installation, {depth: 2});
        app.data.customer = app.data.installation.customer;
    }

    app.data.alarms = await app.functions.get('alarms', app.url.params);
};

app.components.instAlarms = () => {
    return {
        template: `
            <div class="inst-alarms">
                ${app.render('instPageTemplate', {
                    mainContent: `
                        <div>
                            <h2>Alarms</h2>
                            ${app.render('table', { model: 'alarms', data: app.data.alarms, detailLink: `/alarms/{{id}}`})}
                        </div>
                    `
                })}
            </div>
        `
    }
};