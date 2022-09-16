app.routeData.hardwareDetail = async () => {
    app.data.hardware = await app.functions.getById(app.url.mapped.hardwareType, app.url.mapped.hardwareId);
};

app.components.hardwareDetail = () => {
    return {
        template: `
            ${app.render('hardwarePageTemplate', {
                mainContent: `
                    <div>
                        <h2>${app.data.hardware.name}</h2>
                        ${app.render('form', {model: 'rtus', data: app.data.hardware})}
                    </div>
                `
            })}
        `
    }
};