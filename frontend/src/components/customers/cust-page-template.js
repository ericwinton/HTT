app.routeData.custPageTemplate = async () => {
    var sectionSlug = app.url.pathArray[2];
    var instSection = app.url.pathArray[3];
    var custId = app.url.mapped.custId;
    
    app.data.customer = await app.functions.getById('customers', custId);

    if (sectionSlug === 'installations' && instSection !== 'new') {
        app.data.custInstallations = await app.functions.get('installations', {customer: custId});
    } else if (sectionSlug === 'users') {
        app.data.custUsers = await app.functions.get('users', {customer: custId});
    }
};

app.components.custPageTemplate = function() {
    var customer = app.data.customer;
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Customers', url: '/customers'}, {text: customer.name}]});
    var sectionSlug = app.url.pathArray[2];
    var component = (sectionSlug === 'installations' && app.url.pathArray[3] === 'map') ? 'custInstallationsMap'
        : (sectionSlug === 'installations' && app.url.pathArray[3] === 'new') ? 'custNewInstallation'
        : (sectionSlug === 'installations') ? 'custInstallations' 
        : (sectionSlug === 'users') ? 'custUsers' 
        : 'custDetail';

        console.log(component);
    var baseUrl = `/customers/${customer.id}`;
    var subnavItems = [
        {text: 'Overview', url: `${baseUrl}`},
        {text: 'Installations', url: `${baseUrl}/installations`},
        {text: 'Users', url: `${baseUrl}/users`},
    ];
    var match = false;

    subnavItems.forEach(item => {
        if (item.url === app.url.path) {
            item.active = true;
            match = true;
        }
    });

    if (!match) {
        subnavItems[1].active = true;
    }

    return {
        template: `
            <div class="customer">
                ${app.render('headingBar', {title: customer.name, breadcrumbs: breadcrumbs})}
                <div class="grid grid-1-3">
                    ${app.render('subnav', {items: subnavItems})}
                    <div>
                        ${app.render(component, {cust: customer})}
                    </div>
                </div>
            </div>
        `
    }
};