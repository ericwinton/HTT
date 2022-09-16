app.models.roles = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Slug',
        name: 'slug',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Permissions',
        name: 'permissions',
        type: 'relationship',
        rel_model: 'permissions',
        rel_type: 'many-to-many',
        rel_display_key: 'name',
        required: true,
    }]
};