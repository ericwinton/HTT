app.components.root = () => {
    var header = (app.route.component === 'loginView') ? '' : app.render('header');

    return {
        template: `
            <div class="container">
                ${header}
                ${app.render('route')}
                ${app.render('toast')}
            </div>
        `,

        onFirstRender: () => {
            document.title = app.data.pageTitle + ' | HTT SCADA';

            document.onclick = (e) => {
                if (!e.target.closest('.remove-on-click')) {
                    document.querySelectorAll('.remove-on-click').forEach(item => {
                        item.remove();
                    });
                }
            };
        },

        styles: `
            @primary: #459CE0;

            * {
                box-sizing: border-box;
            }
            body {
                padding: 0;
                margin: 0;
                font-family: 'Roboto', Arial, sans-serif;
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

            p {
                margin-top: 0;
            }

            .margin-bottom {
                margin-bottom: 15px;
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

            .text-right {
                text-align: right;
            }

            .grid {
                display: grid;
            }

            .grid-1-3 {
                grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
                gap: 30px;
            }

            li {
                margin-bottom: 5px;
            }
            
            .list-unstyled {
                list-style: none;
                padding: 0;
                margin-top: 0;
                margin-left: 0;
                margin-right: 0;
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
                margin-bottom: 25px;
                position: relative;
            }

            .btn,
            .btn-no-bg {
                padding: 8px 15px;
                border-radius: 4px;
                border: none;
                text-transform: uppercase;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                margin-bottom: 15px;
                font-size: 14px;
            }

            .btn {
                background: #459ce0;
                color: #fff;
            }

            .btn-sm {
                padding: 5px 10px;
            }

            form {
                width: 500px;
                max-width: 100%;
            }

            label,
            legend {
                display: block;
                font-size: 14px;
                margin-bottom: 4px;
                opacity: .7;
            }

            fieldset label {
                opacity: 1;
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
                padding: 6px 0;
                border: none;
                border-bottom: 1px solid #ccc;
                font-family: 'Arial';
                font-size: 16px;

                &:focus {
                    outline: none;
                    border-bottom: 1px solid #459ce0;
                }
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

            .color-red {
                color: #c10000;
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