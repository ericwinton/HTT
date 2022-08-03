app.models.installation = {
    attributes: [
        { label: 'Name', name: 'name', data_type: 'string', required: true },
        { label: 'Address', name: 'address', data_type: 'string' },
        { label: 'City', name: 'city', data_type: 'string' },
        { label: 'State', name: 'state', data_type: 'string' },
        { label: 'Zip', name: 'zip', data_type: 'string' },
        { label: 'Latitude', name: 'lat', data_type: 'float' },
        { label: 'Longitude', name: 'lng', data_type: 'float' },
    ],
    relationships: [
        { model: 'signal_strength', type: 'one-to-many' }
    ]
};