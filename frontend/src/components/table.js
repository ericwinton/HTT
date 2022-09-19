app.components.table = (props) => {
    var model = props.model;
    var thisModel = app.models[model];

    if (!thisModel) return { template: `<p>Model not found: ${model}</p>` }

    var output = '<p>No results found</p>';
    var parentModel = (thisModel.extends) ? app.models[thisModel.extends] : null;
    var parentModelFields = parentModel?.fields || [];
    var data = props.data;
    var fields = thisModel.fields;
    var allFields = parentModelFields.concat(fields);
    var exclude = props.exclude || [];
    var headers = '';
    var rows = '';
    var includedFields = allFields.filter(field => exclude.indexOf(field.name) === -1);

    if (data?.length) {
        props.numItems = data?.length || 0;
        props.page = props.page || 1;
        props.perPage = 20;

        includedFields.forEach((field, i) => {
            var headerText = (field.tableHeader) ? field.tableHeader : field.label;
            headers += `<th>${headerText}</th>`;
        });

        data.forEach(record => {
            var cells = '';
            var itemModel = record._type || model;
            
            includedFields.forEach(async (field, i) => {
                var value = record[field.name] || '';
                
                if (field.type === 'relationship') {
                    value = (record[field.name]) ? record[field.name][field.rel_display_key] : '';
                }

                value = (field.tableValue) ? field.tableValue(value) : value;

                if (i === 0 && (record.detailLink || props.detailLink)) {
                    var linkHref = '';

                    if (record.detailLink) {
                        linkHref = record.detailLink;
                    } else if (props.detailLink) {
                        var linkParts = props.detailLink.match(/{{{?(#[a-z]+ )?[a-z]+.[a-z]*}?}}/g);
                        
                        linkParts.forEach((part) => {
                            var key = part.replace(/{{/g, '').replace(/}}/g, '');
                            linkHref = props.detailLink.replace(part, record[key]);
                        });
                    }

                    cells += `<td><a href="${linkHref}">${value}</a></td>`;
                } else {
                    cells += `<td>${value}</td>`;
                }
            });

            rows += `
                <tr data-id="${record.id}" data-model="${itemModel}">
                    <td class="trash"><a href="#" onclick="app.run(event, 'delete')"><i class="fa fa-trash color-red" aria-hidden="true"></i></a></td>
                    ${cells}
                </tr>
            `;
        });

        output = `
            <div class="table">
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <td>&nbsp;</td>
                                ${headers}
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
                ${app.render('pagination', props)}
            </div>
        `;
    }

    return {
        template: output,

        styles: `
            .table {
                margin-bottom: 30px;
            }

            .table-wrap {
                overflow: auto;
                box-shadow: 0 0 10px rgba(0,0,0,.2);
                border-radius: 4px;
                margin-bottom: 15px;
            }

            table {
                width: 100%;
                border-collapse: collapse;

                thead {
                    background: #459CE0;
                    color: #fff;

                    a {
                        color: #fff;
                        font-size: 13px;
                    }
                }

                tbody {
                    tr:nth-child(odd) {
                        background: #f9f9f9;
                    }
                }

                .trash {
                    width: 30px;
                }

                th, td {
                    padding: 10px;
                    text-align: left;
                    white-space: nowrap;
                    font-weight: normal;
                }
            }
        `,
        
        functions: {
            sortColumn: (e) => {
                var header = e.target.closest('th');
                var columnName = header.dataset.name;
                var direction = (header.dataset.sort) ? header.dataset.sort : 'asc';
            },

            delete: async (e) => {
                e.preventDefault();
                var id = e.target.closest('tr').dataset.id;
                var table = e.target.closest('.table');
                var itemModel = e.target.closest('tr').dataset.model;
    
                if (confirm('Are you sure you would like to delete this ' + model + ' item?')) {
                    var res = await fetch('/api/' + itemModel + '/' + id, { method: 'DELETE' });
                    var resJson = await res.json();
    
                    if (resJson.status === 200) {
                        app.functions.toast('Item Deleted');
                        props.data = props.data.filter(item => item.id !== id);
                        app.render('table', props, table);
                    } else {
                        app.functions.toast(resJson.message, 'Error');
                    }
                }
            },
        }
    }
};