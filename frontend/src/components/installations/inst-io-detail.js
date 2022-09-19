app.routeData.instIODetail = async () => {
    var io = await app.functions.getById(app.url.mapped.ioType, app.url.mapped.ioId, {depth: 2});
    app.data.io = io;
    app.data.installation = io.installation;
    app.data.customer = io.installation.customer;
}

app.components.instIODetail = () => {
    var io = app.data.io;

    return {
        template: `
            <div class="inst-io-detail">
                ${app.render('instPageTemplate', {
                    mainContent: `
                        <div>
                            <h2>${io.name}</h2>
                            ${app.render('form', {model: app.url.mapped.ioType, data: io})}
                        </div>
                    `
                })}
            </div>
        `
    }
};