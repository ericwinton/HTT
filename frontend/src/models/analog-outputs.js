app.models['analog-outputs'] = {
    extends: 'io',
    fields: [{
        label: 'Units',
        name: 'units',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Output',
        name: 'output',
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
        label: 'Max Val',
        name: 'max_val',
        type: 'number',
        data_type: 'int'
    },{
        label: 'Min Val',
        name: 'min_val',
        type: 'number',
        data_type: 'int'
    }]
};