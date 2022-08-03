app.components.backLink = ({url, text = 'Back'}) => {
    return {
        template: `
            <p><a class="back-link" href="${url}"><i class="fa fa-chevron-left" aria-hidden="true"></i> ${text}</a></p>
        `,

        styles: `
            .back-link {
                text-decoration: none;
                
                i {
                    font-size: 12px;
                }
            }
        `
    }
}