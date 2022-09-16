module.exports = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'UL Number',
        name: 'ul_number',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Sales Order Number',
        name: 'sales_order_number',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Model',
        name: 'model',
        type: 'select',
        options: [{
            text: '1100',
            value: '1100'
        },{
            text: '3100',
            value: '3100'
        }],
        data_type: 'string',
        required: true,
    },{
        label: 'Installation',
        name: 'installation',
        type: 'relationship',
        rel_model: 'installations',
        rel_type: 'one-to-one',
        rel_display_key: 'name',
    }]
};