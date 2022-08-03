app.components.usersList = ({ includeCustomer }) => {
    var rows = '';
    var users = (app.data.user.customer_id) ? app.data.users.filter(u => u.customer_id === app.data.user.customer_id) 
        : (app.url.mapped.custId) ? app.data.users.filter(u => u.customer_id === +app.url.mapped.custId) 
        : app.data.users;
    var showCustomer = (includeCustomer !== null && includeCustomer !== undefined) ? includeCustomer : (app.data.user.customer_id) ? false : true;
    var headers = ['Name', 'Username', 'Email', 'Phone', 'Role'];

    users.forEach((user, i) => {
        var role = app.data.roles.find(r => r.id === user.role_id);
        var customerCell = '';

        if (showCustomer) {
            var customer = (user.customer_id) ? app.data.customers.find(c => c.id === user.customer_id) : null;
            customerCell = (customer) ? `<td><a href="/customers/${customer.id}">${customer.name}</a></td>` : '<td>-</td>';
        }

        if (i === 0 && showCustomer) {
            headers.push('Customer');
        }

        rows += `
            <tr>
                <td><a href="/users/${user.id}">${user.first_name} ${user.last_name}</a></td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${role.name}</td>
                ${customerCell}
            </tr>
        `;
    });

    return {
        template: `
            <div class="users-list">
                ${app.render('table', {headers: headers, rows: rows})}
            </div>
        `
    }
};