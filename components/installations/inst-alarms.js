app.components.instAlarms = ({inst}) => {
    var alarms = app.data.alarms.filter(a => a.installation_id === inst.id);
    var rows = '';

    alarms.forEach(a => {
        var acknowledgedBy = '';
        
        if (a.ack_user_id) {
            var ackUser = app.data.users.find(u => u.id === a.ack_user_id);
            acknowledgedBy = ackUser.first_name + ' ' + ackUser.last_name;
        }
        
        rows += `
            <tr>
                <td><a href="/installations/${inst.id}/alarms/${a.id}">${a.name}</a></td>
                <td>${a.created}</td>
                <td>${acknowledgedBy}</td>
            </tr>
        `;
    });

    return {
        template: `
            <div>
                <h2>Alarms</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Acknowledged</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `
    }
};