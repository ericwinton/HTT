app.components.installationsList = (props) => {
    return {
        template: `
            <div class="installations-list">
                ${app.render('table', { model: 'installations', data: app.data.installations, detailLink: '/installations/{{id}}'})}
            </div>
        `,

        styles: `
            .alarm-status {
                .fa-bell {
                    color: #c70000;
                }

                .fa-check {
                    color: green;
                }
            }
        `
    }
};