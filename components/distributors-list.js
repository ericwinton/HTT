app.components.distributorsList = ({customer}) => {
    var distList = '';

    app.data.distributors.forEach(dist => {
        if (!customer || (customer && customer.distributor_id === dist.id)) {
            distList += `<tr><td><a href="/distributors/${dist.id}">${dist.name}</a></td></tr>`;
        }
    });
    
    return {
        template: `
            <div class="distributors-list">
                ${app.render('table', { headers: ['Name'], rows: distList })}
            </div>
        `
    }
};