app.components.instAlarmDetail = () => {
    return {
        template: `
            ${app.render('instPageTemplate', {
                mainContent: `
                    <div>
                        <h2>${alarm.name}</h2>
                        ${app.render('form', {model: 'alarms', data: app.data.alarm})}
                    </div>
                `
            })}
        `
    }
};