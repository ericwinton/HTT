app.components.pagination = (props) => {
    var totalCount = app.data[props.model + 'TotalCount'];
    var pagination = '';

    if (props.numItems < totalCount) {
        var numPages = Math.ceil(totalCount / props.perPage);

        for (var i = 1; i <= numPages; i++) {
            var active = (i === props.page) ? ' class="active"' : '';
            pagination += `<li${active}><a href="#" onclick="app.run(event, 'goToPage')">${i}</a></li>`;
        }

        pagination = `<ul class="list-inline list-unstyled pagination">${pagination}</ul>`;
    }

    return {
        template: pagination,

        styles: `
            .pagination {
                a {
                    width: 24px;
                    height: 24px;
                    text-align: center;
                    line-height: 24px;
                    display: block;
                    text-decoration: none;
                    border-radius: 50%;
                }

                .active a {
                    background: @primary;
                    color: #fff;
                }
            }
        `,

        functions: {
            goToPage: async (e) => {
                e.preventDefault();
                var newPage = +e.target.innerText;

                var offset = (newPage * props.perPage) - props.perPage;

                if (props.options) {               
                    props.options.offset = offset;
                } else {
                    props.options = {offset: offset};
                }

                props.page = newPage;

                props.data = await app.functions.get(props.model, props.filters, props.options);

                app.render('table', props, e.target.closest('.table'));
            }
        }
    }
};