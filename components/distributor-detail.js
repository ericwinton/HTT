app.components.distributorDetail = () => {
    var dist = app.data.distributors.find(d => d.id === +app.url.mapped.distId);
    var customers = app.data.customers.filter(cust => cust.distributor_id === dist.id);
    var rows = '';

    app.data.pageTitle = dist.name;

    customers.forEach(cust => {
        rows += `
            <tr>
                <td><a href="/customers/${cust.id}">${cust.name}</a></td>
            </tr>
        `
    });

    return {
        template: `
            <div>
                <h1>${dist.name}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
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