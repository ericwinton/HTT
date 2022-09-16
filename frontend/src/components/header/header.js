app.components.header = () => {
    return {
        template: `
            <div class="header grid">
                ${app.render('logoSvg')}
                <div class="header-right">
                    ${app.render('headerNav')}
                </div>
            </div>
        `,

        styles: `
            .header {
                padding-top: 15px;
                padding-bottom: 15px;
                grid-template-columns: 150px auto;
                gap: 30px;
            }
        `
    }
};