app.models.users = {
    fields: [{
        label: 'Image',
        name: 'image',
        type: 'file',
        data_type: 'string',
    },{
        label: 'First Name',
        name: 'first_name',
        type: 'text',
        data_type: 'string',
        required: true,
    },{
        label: 'Last Name',
        name: 'last_name',
        type: 'text',
        data_type: 'string'
    },{
        label: 'Email',
        name: 'email',
        type: 'text',
        data_type: 'string'
    },{
        label: 'Phone',
        name: 'phone',
        type: 'text',
        data_type: 'string'
    },{
        label: 'Role',
        name: 'role',
        type: 'relationship',
        rel_type: 'many-to-one',
        rel_model: 'roles',
        rel_display_key: 'name'
    },{
        label: 'Customer',
        name: 'customer',
        type: 'relationship',
        rel_type: 'many-to-one',
        rel_model: 'customers',
        rel_display_key: 'name'
    }]
};