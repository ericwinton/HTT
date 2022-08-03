app.components.instIO = ({inst}) => {
    var headers = ['Name', 'Type', 'Location'];
    var rows = '';
    var io = app.data.io.filter(io => inst.id === io.installation_id);

    io.forEach(io => {
        var ioType = app.data.ioTypes.find(type => type.id === io.type_id);

        rows += `
            <tr>
                <td><a href="/installations/${inst.id}/io/${io.id}">${io.name}</a></td>
                <td>${ioType.name}</td>
                <td>${io.location}</td>
            </tr>
        `;
    });

    return {
        template: `
            <div>
                <h2>IO</h2>
                <p><i class="fa fa-plus-circle color-green" aria-hidden="true"></i> <a href="/installations/${inst.id}/io/new">New IO</a></p>
                ${app.render('table', {headers, rows})}
            </div>
        `
    }
};