app.routeData.instNewIO = async () => {
    if (app.url.params.installation) {
        app.data.installation = await app.functions.getById('installations', app.url.params.installation);
        app.data.customer = app.data.installation.customer;
    }

    app.data.ioTypes = await app.functions.get('io-types');
};

app.components.instNewIO = () => {
    var ioForm = '';
    var ioType = app.url.mapped.ioType;
    var ioOpts = [];
    var newText = 'New IO';
    var selectedIoValue = '';

    app.data.ioTypes.forEach(type => {
        if (ioType === type.slug) {
            newText = type.name;
            selectedIoValue = type.model;
        }

        ioOpts.push({text: type.name, value: type.slug});
    });

    if (selectedIoValue) {
        ioForm = app.render('form', {model: selectedIoValue, data: app.url.params});

        /*if (selectedIOType === 'analog-input') {
            formFields += `
                ${app.render('formField', {label: 'Units', name: 'units', required: true})}
                ${app.render('formField', {label: 'Assigned Location', type: 'number', name: 'location', required: true})}
                ${app.render('formField', {label: 'PLC', type: 'checkbox', name: 'plc', required: true, options: [
                    { text: 'Yes', value: true, events: [ { action: 'onclick', function: 'togglePlc', source: 'instNewIO' } ]}
                ]})}
                ${app.render('formField', {label: 'Slot', type: 'number', name: 'slot', disabled: true})}
                ${app.render('formField', {label: 'Sensor Type', type: 'select', name: 'sensor_type', required: true, options: [
                    { text: 'Current', value: 'current' },
                    { text: 'Voltage', value: 'voltage' },
                    { text: 'Scale', value: 'scale' },
                    { text: 'Expansion', value: 'expansion' },
                    { text: 'Decimal', value: 'decimal' },
                    { text: 'Alarm as Digital', value: 'alarm-as-digital' },
                ]})}
                ${app.render('formField', {label: 'Resistor (Ohms)', type: 'number', name: 'resitor'})}
                ${app.render('formField', {label: 'High Val (in above units)', type: 'number', name: 'high_val_units'})}
                ${app.render('formField', {label: 'Low Val (in above units)', type: 'number', name: 'low_val_units'})}
                ${app.render('formField', {label: 'High Val (4 - 20)', type: 'number', name: 'high_val'})}
                ${app.render('formField', {label: 'Low Val (4 - 20)', type: 'number', name: 'low_val'})}
                ${app.render('formField', {label: 'Offset', type: 'number', name: 'offset'})}
                ${app.render('formField', {label: 'Precision Level', type: 'number', name: 'precision_level'})}
                ${app.render('formField', {label: 'Maximum Display Value', type: 'number', name: 'max_display_value'})}
                ${app.render('formField', {label: 'Minimum Display Value', type: 'number', name: 'min_display_value'})}
            `;
        } else if (selectedIOType === 'analog-output') {
            formFields += `
                ${app.render('formField', {label: 'Units', name: 'units', required: true})}
                ${app.render('formField', {label: 'Output', type: 'number', name: 'output', required: true})}
                ${app.render('formField', {label: 'PLC', type: 'checkbox', name: 'plc', required: true, options: [
                    { text: 'Yes', value: true, events: [ { action: 'onclick', function: 'togglePlc', source: 'instNewIO' } ]}
                ]})}
                ${app.render('formField', {label: 'Slot', type: 'number', name: 'slot', disabled: true})}
                ${app.render('formField', {label: 'High Val', type: 'number', name: 'high_val'})}
                ${app.render('formField', {label: 'Low Val', type: 'number', name: 'low_val'})}
                ${app.render('formField', {label: 'Max Val', type: 'number', name: 'max_val'})}
                ${app.render('formField', {label: 'Min Val', type: 'number', name: 'min_val'})}
            `;
        } else if (selectedIOType === 'digital-input') {
            formFields += `
                ${app.render('formField', {label: 'Input', type: "number", name: 'input', required: true})}
                ${app.render('formField', {label: 'PLC', type: 'checkbox', name: 'plc', required: true, options: [
                    { text: 'Yes', value: true, events: [ { action: 'onclick', function: 'togglePlc', source: 'instNewIO' } ]}
                ]})}
                ${app.render('formField', {label: 'Slot', type: 'number', name: 'slot', disabled: true})}
                ${app.render('formField', {label: 'Closed Text', name: 'closed_text'})}
                ${app.render('formField', {label: 'Open Text', name: 'open_text'})}
                ${app.render('formField', {label: 'Alarm Polarity', type: 'radio', name: 'alarm_polarity', required: true, options: [
                    { text: 'Alarm on closed', value: 'closed' },
                    { text: 'Alarm on open', value: 'open' },
                ]})}
                ${app.render('formField', {label: 'Alarm Action', type: 'select', name: 'alarm_action', required: true, options: [
                    { text: 'Alarm', value: 'alarm' },
                    { text: 'Alert', value: 'alert' },
                    { text: 'Report', value: 'report' },
                    { text: 'Disabled', value: 'disabled' },
                ]})}
            `;
        } else if (selectedIOType === 'digital-output') {
            formFields += `
                ${app.render('formField', {label: 'Output', name: 'output', required: true})}
                ${app.render('formField', {label: 'PLC', type: 'checkbox', name: 'plc', required: true, options: [
                    { text: 'Yes', value: true, events: [ { action: 'onclick', function: 'togglePlc', source: 'instNewIO' } ]}
                ]})}
                ${app.render('formField', {label: 'Slot', type: 'number', name: 'slot', disabled: true})}
                ${app.render('formField', {label: 'Call on text', name: 'call_on_text'})}
                ${app.render('formField', {label: 'Call off text', name: 'call_off_text'})}
                ${app.render('formField', {label: 'Call Polarity', type: 'radio', name: 'call_polarity', required: true, options: [
                    { text: 'Closed', value: 'closed' },
                    { text: 'Open', value: 'open' },
                ]})}
                ${app.render('formField', {label: 'Pulse', type: 'checkbox', name: 'pulse', required: true, options: [
                    { text: 'Yes', value: true, events: [ { action: 'onclick', function: 'togglePulse', source: 'instNewIO' } ]}
                ]})}
                ${app.render('formField', {label: 'Pulse Duration (in 1/8s of a second)', name: 'pulse_duration', disabled: true})}
            `;
        }

        formFields += `
            <button type="submit" class="btn">Create</button>
        `;
        */
    }

    return {
        template: `
            ${app.render('instPageTemplate', {
                mainContent: `
                    <div>
                        <form>
                            ${app.render('formField', {label: 'IO Type', type: 'select', name: 'type', required: true, options: ioOpts, value: selectedIoValue, events: [{ action: 'onchange', function: 'changeIOType', source: 'instNewIO' }]})}
                        </form>
                        ${ioForm}
                    </div>
                `
            })}
        `,

        functions: {
            changeIOType: (e) => {
                app.newRoute(`/io/${e.target.value}/new?installation=${app.data.installation.id}`);
            },

            togglePlc: (e) => {
                var checked = e.target.checked;
                var slotInput = document.querySelector('[name="slot"]');
                
                if (checked) {
                    slotInput.disabled = false;
                    slotInput.required = true;
                } else {
                    slotInput.disabled = true;
                    slotInput.required = false;
                }
            },

            togglePulse: (e) => {
                var checked = e.target.checked;
                var pulseDurationInput = document.querySelector('[name="pulse_duration"]');
                
                if (checked) {
                    pulseDurationInput.disabled = false;
                    pulseDurationInput.required = true;
                } else {
                    pulseDurationInput.disabled = true;
                    pulseDurationInput.required = false;
                }
            }
        }
    }
};