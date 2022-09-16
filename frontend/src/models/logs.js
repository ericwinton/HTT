app.models.logs = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        dataType: 'string',
        required: true,
    },{
        label: 'Time',
        name: 'created',
        type: 'datetime',
        required: true,
    },{
        label: 'Installation',
        name: 'installation',
        type: 'relationship',
        rel_model: 'installations',
        rel_type: 'many-to-one',
        rel_display_key: 'name',
    }]
};