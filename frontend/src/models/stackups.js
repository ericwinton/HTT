app.models.stackups = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Mac Address',
        name: 'mac_address',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Modem Type',
        name: 'modem_type',
        type: 'select',
        options: [{
            text: 'Verizon',
            value: 'verizon'
        },{
            text: 'ATT',
            value: 'att'
        }],
        data_type: 'string',
        required: true,
    },{
        label: 'Model',
        name: 'model',
        type: 'select',
        options: [{
            text: '1100S',
            value: '1100S'
        },{
            text: '3100S',
            value: '3100S'
        }],
        data_type: 'string',
        required: true,
    },{
        label: 'RTU',
        name: 'rtu',
        type: 'relationship',
        rel_model: 'rtus',
        rel_type: 'one-to-one',
        rel_display_key: 'name',
    }]
};