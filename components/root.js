app.components.root = () => {
    var header = (app.route.component === 'loginView') ? '' : app.render('header');

    return {
        template: `
            <div class="container">
                ${header}
                ${app.render('route')}
            </div>
        `,

        onFirstRender: () => {
            document.title = app.data.pageTitle + ' | HTT SCADA';
        },

        styles: `
            * {
                box-sizing: border-box;
            }
            body {
                padding: 0;
                margin: 0;
                font-family: Arial;
            }

            a {
                color: #4e6e9d;
            }

            h2, h3, h4 {
                margin-top: 0;
            }

            h1 {
                font-size: 26px;
            }

            h2 {
                font-size: 22px;
            }

            .container {
                width: 1200px;
                max-width: 100%;
                margin: 0 auto;
                padding-left: 15px;
                padding-right: 15px;

                &-sm {
                    width: 400px;
                }
            }

            .table-wrap {
                overflow: auto;
                box-shadow: 0 0 10px rgba(0,0,0,.2);
                margin-bottom: 30px;
            }

            table {
                width: 100%;
                border-collapse: collapse;

                thead {
                    background: #f5f5f5;
                }

                th, td {
                    padding: 10px;
                    text-align: left;
                    white-space: nowrap;
                }
            }

            .grid {
                display: grid;
            }

            .grid-1-3 {
                grid-template-columns: 1fr 3fr;
                gap: 30px;
            }

            li {
                margin-bottom: 5px;
            }
            
            .list-unstyled {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .list-inline {
                li {
                    display: inline-block;
                    margin-right: 15px;
                }
            }

            .list-inline.list-align-right {
                text-align: right;

                li {
                    margin-left: 15px;
                    margin-right: 0;
                }
            }

            .form-group {
                margin-bottom: 15px;
            }

            .btn {
                background: #459ce0;
                color: #fff;
                padding: 10px 15px;
                border-radius: 4px;
                border: none;
                text-transform: uppercase;
                cursor: pointer;
            }

            label,
            legend {
                display: block;
                font-size: 14px;
                margin-bottom: 4px;
                font-weight: bold;
            }

            fieldset {
                border: none;
                padding: 0;
                margin: 0;
            }

            input[type="text"],
            input[type="email"],
            input[type="number"],
            input[type="password"],
            input[type="date"],
            input[type="datetime-local"],
            select {
                width: 100%;
                border-radius: 4px;
                min-height: 34px;
                padding: 0 5px;
                border: 1px solid #ccc;
                font-family: 'Arial';
            }

            .input-inline {
                width: auto;
            }

            .rounded {
                border-radius: 50%;
            }

            .color-green {
                color: green;
            }

            .form-container {
                width: 500px;
                max-width: 100%;
            }

            .show-mobile {
                display: none;
            }

            .hide-mobile {
                display: block;
            }

            @media (max-width: 767px) {
                .grid-1-3 {
                    grid-template-columns: auto;
                    gap: 15px;
                    display: block;
                }

                .show-mobile {
                    display: block;
                }

                .hide-mobile {
                    display: none;
                }
            }
        `
    }
};