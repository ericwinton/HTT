app.components.subnav = ({items}) => {
    var subnavList = '';
    var subnavOptions = '';

    items.forEach(item => {
        var active = (item.active) ? ' class="active"' : '';
        var selected = (item.active) ? ' selected' : '';
        subnavList += `<li${active}><a href="${item.url}">${item.text}</a></li>`;
        subnavOptions += `<option value="${item.url}"${selected}>${item.text}</option>`;
    });

    return {
        template: `
            <div class="subnav-wrap">
                <ul class="list-unstyled subnav hide-mobile">
                    ${subnavList}
                </ul>
                <div class="form-group show-mobile">
                    <label>Sections</label>
                    <select onchange="app.run(event, 'changeSubnavRoute')">
                        ${subnavOptions}
                    </select>
                </div>
            </div>
        `,

        styles: `
            .subnav {
                a {
                    display: block;
                    background: #f5f5f5;
                    border-radius: 4px;
                    padding: 10px;
                    color: #000;
                    text-decoration: none;
                }

                li.active {
                    a {
                        background: #459ce0;
                        color: #fff;
                    }
                }
            }
        `,

        functions: {
            changeSubnavRoute: (e) => {
                app.newRoute(e.target.value);
            }
        }
    }
};