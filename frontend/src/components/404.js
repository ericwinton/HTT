app.components.pageNotFound = () => {
    app.data.pageTitle = '404 - Page Not Found';

    return {
        template: `
            <p>${app.data.pageTitle}</p>
        `,
    }
}