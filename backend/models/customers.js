module.exports = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Distributor',
        name: 'distributor',
        type: 'relationship',
        rel_model: 'distributors',
        rel_type: 'many-to-one',
        rel_display_name: 'name',
        required: true
    }]
}