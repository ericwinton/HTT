app.components.pageNotFound = () => {
    app.data.pageTitle = '404 - Page Not Found';

    return {
        template: `
            <h1>${app.data.pageTitle}</h1>
        `,
    }
}