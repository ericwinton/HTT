app.components.formField = (props) => {
    var input = '';
    var name = props.name ? ` name="${props.name}"` : '';
    var type = props.type || 'text';
    var value = props.value || '';
    var placeholder = props.placeholder ? ` placeholder="${placeholder}"` : '';
    var required = (props.required) ? ' required' : '';
    var requiredLabel = (props.required) ? ' *' : '';
    var disabled = (props.disabled) ? ' disabled' : '';
    var events = '';
    var label = props.label ? `<label>${props.label}${requiredLabel}</label>` : '';

    if (props.events) {
        props.events.forEach((ev) => {
            var source = (ev.source) ? `, '${ev.source}'` : '';
            events += ` ${ev.action}="app.run(event, '${ev.function}'${source})"`
        });
    }

    var grouped = `${name}${placeholder}${events}${required}${disabled}`;

    if (type === 'text' || type === 'email' || type === 'password' || type === 'date' || type === 'number' || type === 'datetime') {
        var step = (type === 'number') ? ' step="any"': '';
        var type = (type === 'datetime') ? 'datetime-local' : type;
        input = `<input type="${type}" value="${value}"${grouped}${step}>`;
    } else if (type === 'textarea') {
        input = `<textarea${grouped}>${value}</textarea>`;
    } else if (type === 'select') {
        var options = '<option value="">Select...</option>';

        if (props.options) {
            props.options.forEach((item) => {
                var selected = (item.value === value) ? ' selected' : '';
                options += `<option value="${item.value}"${selected}>${item.text}</option>`;
            });

            input = `<select${name}${events}>${options}</select>`;
        }
    } else if (type === 'radio' || type === 'checkbox') {
        var options = '';

        label = '';

        if (props.options) {
            props.options.forEach((item) => {
                var itemEvents = '';
                var checked = (value == item.value) ? ' checked' : '';

                if (item.events) {
                    item.events.forEach((ev) => {
                        var source = (ev.source) ? `, '${ev.source}'` : '';
                        itemEvents += ` ${ev.action}="app.run(event, '${ev.function}'${source})"`
                    });
                }

                options += `<label><input type="${type}"${name} value="${item.value}"${itemEvents}${disabled}${checked}> ${item.label}</label>`;
            });

            input = `<fieldset><legend>${props.label}</legend>${options}</fieldset>`;
        }
    } else if (type === 'relationship') {
        var relResults = '';
        var removeResult = `<a href="#" onclick="app.run(event, 'removeResult')"><i class="fa fa-times" aria-hidden="true"></i></a>`;
        var relatedIds = [];
        var relRequired = (value) ? '' : ' required';

        // TODO: Combine
        if (value.id) {
            // editing form
            if (props.rel_type.indexOf('to-one') > -1) {
                var relDisplayKeyArray = props.rel_display_key.split(' ');
                var displayTitle = '';

                relDisplayKeyArray.forEach(key => {
                    displayTitle += (displayTitle) ? ' ' + value[key] : value[key];
                });

                relatedIds = [value.id];
                relResults += `<li>${removeResult} ${displayTitle}</li>`;
            } else if (props.rel_type.indexOf('to-many') > -1) {
                value.forEach(rec => {
                    var relDisplayKeyArray = props.rel_display_key.split(' ');
                    var relDisplayTitle = '';

                    relDisplayKeyArray.forEach(key => {
                        relDisplayTitle += (relDisplayTitle) ? ' ' + rec[key] : rec[key];
                    });

                    relatedIds.push(rec.id);
                    relResults = `<li>${removeResult} ${relDisplayTitle}</li>`;
                });
            }
        } else if (value) {
            // new form
            if (props.rel_type.indexOf('to-one') > -1) {
                relatedIds = [value];
            } else if (props.rel_type.indexOf('to-many') > -1) {
                value.forEach(recId => {
                    relatedIds.push(recId);
                });
            }
        }

        input = `
            <div class="relationship-group">
                <input type="hidden" value="${relatedIds.join(',')}"${name}>
                <input type="text" value="" data-rel-model="${props.rel_model}" data-rel-display-key="${props.rel_display_key}" onkeyup="app.run(event, 'autocomplete')" placeholder="Search..."${disabled}${relRequired}>
                <ul class="list-inline list-unstyled related-results">
                    ${relResults}
                </ul>
            </div>
        `;
    } else if (type === 'file') {
        input = (value) ? `<a href="#" onclick="app.run(event, 'uploadFile')"><img class="image-preview" src="${value}" alt=""></a>` : '<input type="file">';
    }

    return {
        template: `
            <div class="form-group">
                ${label}
                ${input}
            </div>
        `,

        styles: `
            .relationship-group {
                position: relative;
                
                .autocomplete-results {
                    position: absolute;
                    background: #fff;
                    box-shadow: 0 0 10px rgba(0,0,0,.2);
                    top: 30px;
                    z-index: 10;

                    li {
                        margin: 0;

                        &.no-results {
                            padding: 8px;
                        }
                    }

                    a {
                        display: block;
                        padding: 8px;
                    }
                }
            }
            .related-results {
                li {
                    padding: 5px;
                    border-radius: 4px;
                    background: #eee;
                    font-size: 14px;
                    margin-top: 5px;
                    font-size: 13px;
                }
            }

            .image-preview {
                max-height: 160px;
            }
        `,

        functions: {
            removeResult: (e) => {
                e.preventDefault();
                alert('removing');
            },

            uploadFile: (e) => {
                e.preventDefault();
                alert('uploading...');
            },

            selectItem: async (e) => {
                e.preventDefault();
                var item = e.target;
                var relGroup = item.closest('.relationship-group');
                var displayInput = relGroup.querySelector('input[type="text"]');
                var relModel = displayInput.dataset.relModel;
                var itemId = item.closest('li').dataset.id;
                var relItem = await app.functions.getById(relModel, itemId);

                props.value = relItem;

                app.render('formField', props, e.target.closest('.form-group'));

                displayInput.required = false;
                displayInput.value = '';
                displayInput.focus();
            },

            autocomplete: async (e) => {          
                clearTimeout(app.data.typingTimer);

                app.data.typingTimer = setTimeout(async () => {
                    var input = e.target;
                    var q = input.value;
                    var relModel = input.dataset.relModel;
                    var relDisplayKey = input.dataset.relDisplayKey;
                    var relGroup = input.closest('.relationship-group');
                    var resultsDiv = relGroup.querySelector('.autocomplete-results');

                    if (q.length > 1) {
                        var res = await app.functions.get(relModel, {name: '*' + q + '*'});
                        var results = '';

                        if (!resultsDiv) {
                            resultsDiv = document.createElement('ul');
                            resultsDiv.className = 'autocomplete-results list-unstyled remove-on-click';
                            relGroup.appendChild(resultsDiv);
                        }

                        if (res.length) {
                            res.forEach(item => {
                                results += `<li data-id="${item.id}"><a href="#" onclick="app.run(event, 'selectItem')">${item[relDisplayKey]}</a></li>`;
                            });

                            resultsDiv.innerHTML = results;
                        } else {
                            resultsDiv.innerHTML = '<li class="no-results">No results</li>';
                        }
                    } else {
                        if (resultsDiv) {
                            resultsDiv.remove();
                        }
                    }
                }, 500);
            }
        }
    }
};