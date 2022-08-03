app.components.formField = (props) => {
    var input = '';
    var label = props.label ? `<label>${props.label}</label>` : '';
    var name = props.name ? ` name="${props.name}"` : '';
    var type = props.type || 'text';
    var value = props.value || '';
    var placeholder = props.placeholder ? ` placeholder="${placeholder}"` : '';
    var required = (props.required) ? ' required' : '';
    var disabled = (props.disabled) ? ' disabled' : '';
    var events = '';
    var selectedValue = props.selectedValue || '';

    if (props.events) {
        props.events.forEach((ev) => {
            var source = (ev.source) ? `, '${ev.source}'` : '';
            events += ` ${ev.action}="app.run(event, '${ev.function}'${source})"`
        });
    }

    var grouped = `${name}${placeholder}${events}${required}${disabled}`;

    if (type === 'text' || type === 'email' || type === 'password' || type === 'date' || type === 'number' || type === 'datetime-local') {
        input = `<input type="${type}" value="${value}"${grouped}>`;
    } else if (type === 'textarea') {
        input = `<textarea${grouped}>${value}</textarea>`;
    } else if (type === 'select') {
        var options = '';

        props.options.forEach((item) => {
            var selected = (item.value === selectedValue) ? ' selected' : '';
            options += `<option value="${item.value}"${selected}>${item.text}</option>`;
        });

        input = `<select${name}${events}>${options}</select>`;
    } else if (type === 'radio' || type === 'checkbox') {
        var options = '';

        label = '';

        props.options.forEach((item) => {
            var itemEvents = '';

            if (item.events) {
                item.events.forEach((ev) => {
                    var source = (ev.source) ? `, '${ev.source}'` : '';
                    itemEvents += ` ${ev.action}="app.run(event, '${ev.function}'${source})"`
                });
            }

            options += `<label><input type="${type}"${name} value="${item.value}"${itemEvents}> ${item.text}</label>`;
        });

        input = `<fieldset><legend>${props.label}</legend>${options}</fieldset>`;
    }

    return {
        template: `
            <div class="form-group">
                ${label}
                ${input}
            </div>
        `
    }
};