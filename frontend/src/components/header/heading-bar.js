app.components.headingBar = (props) => {
    app.data.pageTitle = props.seoPageTitle || props.title;
    
    return {
        template: `
            <div class="heading-bar">
                <h1>${props.title}</h1>
                ${props.breadcrumbs}
            </div>
        `,

        styles: `
            .heading-bar {
                border-bottom: 5px solid #459CE0;
                margin-bottom: 30px;
            }
        `
    }
};