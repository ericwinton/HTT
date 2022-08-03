app.components.distributorsView = () => {
    app.data.pageTitle = 'Distributors';
    
    return {
        template: `
            <div>
                <h1>Distributors</h1>
                ${app.render('distributorsList')};
            </div>
        `
    }
};