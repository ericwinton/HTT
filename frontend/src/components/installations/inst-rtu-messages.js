app.components.instRtuMessages = () => {
    return {
        template: `
            <div class="inst-rtu-messages">
                <h2>RTU Messages</h2>
                ${app.render('table', {model: 'rtu-messages'})}
            </div>
        `
    }
};