app.components.instIODetail = () => {
    var ioItem = app.data.ioItem;

    return {
        template: `
            <div class="inst-io-detail">
                <h2>${ioItem.name}</h2>
                ${app.render('form', {model: app.url.mapped.ioType, data: ioItem})}
            </div>
        `
    }
};