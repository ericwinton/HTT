app.models['analog-inputs'] = {
    extends: 'io',
    fields: [{
        label: 'Units',
        name: 'units',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Input',
        name: 'input',
        type: 'number',
        data_type: 'int',
        required: true,
    },{
        label: 'PLC',
        name: 'plc',
        type: 'checkbox',
        data_type: 'boolean',
    },{
        label: 'Slot',
        name: 'slot',
        type: 'number',
        data_type: 'int'
    },{
        label: 'Sensor Type',
        name: 'sensor_type',
        type: 'select',
        options: [{
            text: 'Current',
            value: 'current'
        },{
            text: 'Voltage',
            value: 'voltage'
        },{
            text: 'Scale',
            value: 'scale'
        }],
        required: true
    },{
        label: 'Resistor',
        name: 'resistor',
        type: 'number',
        data_type: 'float'
    },{
        label: 'High Val - Calibrated',
        name: 'high_val_cal',
        type: 'number',
        data_type: 'int'
    },{
        label: 'Low Val - Calibrated',
        name: 'low_val_cal',
        type: 'number',
        data_type: 'int'
    },{
        label: 'High Val',
        name: 'high_val',
        type: 'number',
        data_type: 'int'
    },{
        label: 'Low Val',
        name: 'low_val',
        type: 'number',
        data_type: 'int'
    },{
        label: 'Offset',
        name: 'offset',
        type: 'number',
        data_type: 'int'
    },{
        label: 'Precision Level',
        name: 'precision_level',
        type: 'number',
        data_type: 'int'
    },{
        label: 'Max Display Value',
        name: 'max_display_value',
        type: 'number',
        data_type: 'int'
    },{
        label: 'Min Display Value',
        name: 'min_display_value',
        type: 'number',
        data_type: 'int'
    }],
    typeSlug: (id) => {
        return app.data.ioTypes.find(type => type.id === id);
    }
};