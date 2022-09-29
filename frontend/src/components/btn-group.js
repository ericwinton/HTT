app.components.btnGroup = ({align, items, newBtnUrl}) => {
    var alignClass = (align === 'left') ? '' : ' list-align-right';
    var btns = '';
    var newBtn = '';
    
    if (items) {
        items.forEach(item => {
            var icon = (item.icon) ? `<i class="fa fa-${item.icon}" aria-hidden="true"></i> ` : '';
            
            btns += `<li><a class="btn btn-sm" href="${item.url}">${icon}${item.text}</a></li>`;
        });
    }

    if (newBtnUrl) {
        newBtn = app.render('newBtn', {url: newBtnUrl});
    }

    return {
        template: `
            <ul class="btn-group list-inline list-unstyled${alignClass}">
                ${btns}
                ${newBtn}
            </ul>
        `,

        styles: `
            .btn-group {
                .btn, li {
                    margin-bottom: 0;
                }
            }
        `
    }
}