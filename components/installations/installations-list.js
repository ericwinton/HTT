app.components.installationsList = (props) => {
    var headers = (props.includeCustomer) ? ['Name', 'Customer', 'Location', 'Status'] : ['Name', 'Location', 'Status'];
    var rows = '';

    props.installations.forEach(inst => {
        var customer = (props.customer) ? props.customer : null;
        var customerCell = '';
        var statusIcon = (inst.has_active_alarm) ? 'bell' : 'check';

        if (props.includeCustomer) {
            customer = app.data.customers.find(cust => cust.id === inst.customer_id);
            customerCell = `<td><a href="/customers/${customer.id}">${customer.name}</a></td>`;
        }

        rows += `
            <tr>
                <td><a href="/installations/${inst.id}">${inst.name}</a></td>
                ${customerCell}
                <td>${inst.city}, ${inst.state}</td>
                <td class="alarm-status"><i class="fa fa-${statusIcon}" aria-hidden="true"></i></td>
            </tr>
        `;
    });

    return {
        template: `
            <div class="installations-list">
                ${app.render('table', { headers, rows })}
            </div>
        `,

        styles: `
            .alarm-status {
                .fa-bell {
                    color: #c70000;
                }

                .fa-check {
                    color: green;
                }
            }
        `
    }
};