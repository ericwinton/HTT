app.components.hardwareView = () => {
    var headers = [];
    var rows = '';

    app.data.pageTitle = 'Hardware';

    if (app.url.mapped.hardwareType === 'rtus') {
        headers = ['Name', 'Model', 'Installation', 'Stackup'];

        app.data.pageTitle = 'RTU Hardware';

        app.data.rtus.forEach(rtu => {
            var installation = app.data.installations.find(inst => inst.id === rtu.installation_id);
            var stackup = app.data.stackups.find(stackup => stackup.id === rtu.id);

            rows += `
                <tr>
                    <td><a href="/hardware/rtus/${rtu.id}">${rtu.name}</a></td>
                    <td>${rtu.model}</td>
                    <td><a href="/installations/${installation.id}">${installation.name}</a></td>
                    <td><a href="/hardware/stackups/${stackup.id}">${stackup.name}</a></td>
                </tr>
            `;
        });
    } else if (app.url.mapped.hardwareType === 'stackups') {
        headers = ['Name', 'Model', 'Installation', 'RTU'];

        app.data.pageTitle = 'Stackup Hardware';

        app.data.stackups.forEach(stackup => {
            var rtu = app.data.rtus.find(rtu => rtu.id === stackup.rtu_id);
            var installation = app.data.installations.find(inst => inst.id === rtu.installation_id);

            rows += `
                <tr>
                    <td><a href="/hardware/stackups/${stackup.id}">${stackup.name}</a></td>
                    <td>${stackup.model}</td>
                    <td><a href="/installation/${installation.id}">${installation.name}</a></td>
                    <td><a href="/hardware/rtus/${rtu.id}">${rtu.name}</a></td>
                </tr>
            `;
        });
    }

    return {
        template: `
            <div>
                <h1>Hardware</h1>
                <p><a href="/hardware/rtus">RTUs</a> | <a href="/hardware/stackups">Stackups</a></p>

                ${app.render('table', {headers: headers, rows: rows})}
            </div>
        `
    }
};