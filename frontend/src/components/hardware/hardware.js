app.routeData.hardware = async () => {
    var hardwareType = app.url.mapped.hardwareType || 'rtus';
    app.data.hardware = await app.functions.get(hardwareType);
};

app.components.hardware = () => {
    var hardwareType = app.url.mapped.hardwareType || 'rtus';

    return {
        template: `
            ${app.render('hardwarePageTemplate', {
                mainContent: `
                    <div>
                        ${app.render('btnGroup', {newBtnUrl: `/hardware/${hardwareType}`})}
                        ${app.render('table', {model: hardwareType, data: app.data.hardware, detailLink: `/hardware/${hardwareType}/{{id}}`})}
                    </div>
                `
            })}
        `
    }
}