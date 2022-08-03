app.components.customersView = () => {
    var rows = '';

    app.data.pageTitle = 'Customers';

    app.data.customers.forEach(cust => {
        var dist = app.data.distributors.find(d => d.id === cust.distributor_id);

        rows += `
            <tr>
                <td><a href="/customers/${cust.id}">${cust.name}</a></td>
                <td><a href="/distributors/${dist.id}">${dist.name}</a></td>
            </tr>
        `;
    });

    return {
        template: `
            <div>
                <h1>Customers</h1>
                ${app.render('table', {headers: ['Name', 'Distributor'], rows: rows})}
            </div>
        `
    }
};