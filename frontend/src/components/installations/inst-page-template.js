app.components.instPageTemplate = (props) => {
    var inst = app.data.installation;
    var section = app.data.instSections.find(sect => sect.slug === app.url.pathArray[0]);
    var subnavItems = [];
    var bcItems = [{text: section.title}];
    var pageTitle = section.title;

    if (inst) {
        var cust = app.data.customer;

        pageTitle = inst.name;

        bcItems = (!app.data.user.customer) ? 
            [
                {text: 'Customers', url: '/customers'},
                {text: cust.name, url: '/customers/' + cust.id},
                {text: 'Installations', url: '/installations?customer=' + cust.id},
                {text: inst.name}
            ] : [
                {text: 'Installations', url: '/installations'},
                {text: inst.name}
            ];

        app.data.instSections.forEach(item => {
            var active = (item.title === section.title) ? true : false;
            var url = (item.title === 'Overview') ? `/installations/${inst.id}` : `/${item.slug}?installation=${inst.id}`;
            subnavItems.push({text: item.title, url: url, active: active});
        });

        output = `
            <div class="grid grid-1-3">
                ${app.render('subnav', {items: subnavItems})}
                <div>
                    ${props.mainContent}
                </div>
            </div>
        `;
    } else {
        output = `${app.render('table', {model: section.slug})}`;
    }

    var breadcrumbs = app.render('breadcrumbs', {items: bcItems});
    

    return {
        template: `
            <div class="installations">
                ${app.render('headingBar', {title: pageTitle, breadcrumbs: breadcrumbs})}
                ${output}
            </div>
        `
    }
};