app.components.custDetail = function({cust}) {
    return {
        template: `
            <div class="customer-detail">
                <h2>Overview</h2>
                ${app.render('form', {model: 'customers', data: cust, type: 'edit'})}
            </div>
        `
    }
};