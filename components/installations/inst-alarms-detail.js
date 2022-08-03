app.components.instAlarmsDetail = () => {
    var alarm = app.data.alarms.find(a => a.id === +app.url.mapped.instSectionDetailId);
    var inst = app.data.installations.find(inst => inst.id === +app.url.mapped.instId);
    var cust = app.data.customers.find(cust => cust.id === inst.customer_id);
    var acknowledgedBy = '';
    
    if (alarm.ack_user_id) {
        var ackUser = app.data.users.find(u => u.id === alarm.ack_user_id);
        acknowledgedBy = '<p><strong>Acknowledged By</strong>: ' + ackUser.first_name + ' ' + ackUser.last_name + '</p>';
    }

    return {
        template: `
            <div>
                ${app.render('backLink', {url: `/installations/${app.url.mapped.instId}/alarms`})}

                <h2>${alarm.name}</h2>

                <p><strong>Time</strong>: ${alarm.created}</p>

                ${acknowledgedBy}
            </div>
        `
    }
};