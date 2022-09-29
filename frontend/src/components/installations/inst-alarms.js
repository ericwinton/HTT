app.components.instAlarms = () => {
    return {
        template: `
            <div class="inst-alarms">
                <h2>Alarms</h2>
                ${app.render('table', { model: 'alarms', data: app.data.alarms, detailLink: `/alarms/{{id}}`})}
            </div>
        `
    }
};