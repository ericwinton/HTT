app.components.breadcrumbs = ({items}) => {
    var bcList = '';
    var bcHomeLink = (app.data.user.customer?.id) ? '/installations' : '/';

    items.forEach(item => {
        bcLink = (item.url) ? `<a href="${item.url}">${item.text}</a>` : item.text;
        bcList += `<li>${bcLink}</li>`;
    });

    return {
        template: `
            <ul class="list-unstyled list-inline breadcrumbs">
                <li><a href="${bcHomeLink}"><i class="fa fa-home" aria-hidden="true"></i></a></li>
                ${bcList}
            </ul>
        `,

        styles: `
            .breadcrumbs.list-unstyled {
                font-size: 14px;
                margin-bottom: 15px;

                li {
                    margin-right: 8px;
                }

                li:not(:first-child):before {
                    content: "/";
                    padding-right: 10px;
                }
            }

            @media (max-width: 767px) {
                .breadcrumbs.list-unstyled {
                    margin-bottom: 15px;
                }
            }
        `
    }
};