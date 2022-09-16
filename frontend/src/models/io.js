app.models.io = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        data_type: 'string',
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
};