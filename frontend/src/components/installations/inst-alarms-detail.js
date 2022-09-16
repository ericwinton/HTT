app.routeData.instAlarmDetail = async () => {
    app.data.alarm = await app.functions.getById('alarms', app.url.mapped.alarmId, {depth: 2});
    app.data.installation = app.data.alarm.installation;
    app.data.customer = app.data.installation.customer;
}

app.components.instAlarmDetail = () => {
    var alarm = app.data.alarm;
    var ackUser = app.data.ackUser;
    var acknowledgedBy = (ackUser) ? '<p><strong>Acknowledged By</strong>: ' + ackUser.first_name + ' ' + ackUser.last_name + '</p>' : '';

    return {
        template: `
            ${app.render('instPageTemplate', {
                mainContent: `
                    <div>
                        <h2>${alarm.name}</h2>
                        ${app.render('form', {model: 'alarms', data: alarm})}
                    </div>
                `
            })}
        `
    }
};