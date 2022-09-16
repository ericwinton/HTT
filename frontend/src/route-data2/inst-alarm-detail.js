app.routeData.instAlarmDetail = async () => {
    app.data.alarm = await app.functions.getById('alarms', app.url.mapped.alarmId, {depth: 2});
    app.data.installation = app.data.alarm.installation;
    app.data.customer = app.data.installation.customer;
}