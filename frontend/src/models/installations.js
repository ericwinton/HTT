app.models.installations = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Has Active Alarm',
        table_header: 'Status',
        name: 'has_active_alarm',
        type: 'radio',
        data_type: 'boolean',
        options: [{
            label: 'Yes',
            value: true,
        },{
            label: 'No',
            value: false,
        }],
        disabled: true,
        table_value: (value) => {
            return (!value) ? '<i class="color-green fa fa-check"></i>' : '<i class="color-red fa fa-bell"></i>';
        }
    },{
        label: 'Address',
        name: 'address',
        type: 'text',
        data_type: 'string'
    },{
        label: 'City',
        name: 'city',
        type: 'text',
        data_type: 'string'
    },{
        label: 'State',
        name: 'state',
        type: 'text',
        data_type: 'string'
    },{
        label: 'Zip',
        name: 'zip',
        type: 'text',
        data_type: 'string'
    },{
        label: 'Latitude',
        name: 'lat',
        type: 'number',
        data_type: 'float'
    },{
        label: 'Longitude',
        name: 'lng',
        type: 'number',
        data_type: 'float'
    },{
        label: 'Signal Strength',
        name: 'signal_strength',
        type: 'number',
        disabled: true
    },{
        label: 'Signal Power',
        name: 'signal_power',
        type: 'number',
        disabled: true
    },{
        label: 'Signal Quality',
        name: 'signal_quality',
        type: 'number',
        disabled: true
    },{
        label: 'Signal to Noise Ratio',
        name: 'signal_to_noise',
        type: 'number',
        disabled: true
    },{
        label: 'Customer',
        name: 'customer',
        type: 'relationship',
        rel_model: 'customers',
        rel_type: 'many-to-one',
        rel_display_key: 'name',
        required: true
    }]
};