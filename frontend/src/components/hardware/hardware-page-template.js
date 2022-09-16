app.components.hardwarePageTemplate = (props) => {
    var hardwareType = app.url.mapped.hardwareType || 'rtus';
    var hardwareTitle = (hardwareType === 'stackups') ? 'Stackups' : 'RTUs';
    var breadcrumbs = app.render('breadcrumbs', {items: [{text: 'Hardware', url: '/hardware'}, {text: hardwareTitle}]});
    var subnavItems = [{text: 'RTUs', url: '/hardware/rtus'}, {text: 'Stackups', url: '/hardware/stackups'}];

    subnavItems.forEach(item => {
        if ((app.url.path.indexOf(item.url) > -1) || (app.url.path === '/hardware' && item.url === '/hardware/rtus')) {
            item.active = true;
        }
    });

    return {
        template: `
            <div>
                ${app.render('headingBar', {title: hardwareTitle, breadcrumbs: breadcrumbs})}
                <div class="grid grid-1-3">
                    ${app.render('subnav', {items: subnavItems})}
                    ${props.mainContent}
                </div>
            </div>
        `
    }
}