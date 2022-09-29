app.components.instRtuConfigs = () => {
    return {
        template: `
            <div class="inst-rtu-configs">
                <h2>RTU Configs</h2>
                ${app.render('table', {model: 'rtu-configs'})}
            </div>
        `
    }
};