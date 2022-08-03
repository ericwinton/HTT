app.components.customersView = () => {
    var rows = '';
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Customers'}]});

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
                ${app.render('headingBar', {title: 'Customers', breadcrumbs: breadcrumbs})}
                ${app.render('table', {headers: ['Name', 'Distributor'], rows: rows})}
            </div>
        `
    }
};