app.components.instLogs = () => {
    return {
        template: `
            <div class="inst-logs">
                <h2>Logs</h2>
                ${app.render('table', {model: 'logs'})}
            </div>
            
        `
    }
};