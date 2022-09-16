module.exports = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Type',
        name: 'type',
        type: 'relationship',
        rel_model: 'io-types',
        rel_type: 'many-to-one',
        rel_display_key: 'name',
        required: true,
    },{
        label: 'Installation',
        name: 'installation',
        type: 'relationship',
        rel_model: 'installations',
        rel_type: 'many-to-one',
        rel_display_key: 'name',
        required: true,
    }]
}