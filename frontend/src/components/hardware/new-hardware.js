app.components.newHardware = () => {
    var hardwareType = app.url.mapped.hardwareType;

    return {
        template: `
            ${app.render('hardwarePageTemplate', {
                mainContent: `
                    ${app.render('form', {model: hardwareType})}
                `
            })}
        `
    }
};