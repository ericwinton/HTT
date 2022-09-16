module.exports = {
    fields: [{
        label: 'Name',
        name: 'name',
        type: 'text',
        type_type: 'string',
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
    },{
        label: 'Acknowledged By',
        name: 'ack_user',
        type: 'relationship',
        rel_model: 'users',
        rel_type: 'many-to-one',
        rel_display_key: 'first_name last_name',
    }]
};