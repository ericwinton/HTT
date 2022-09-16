app.models.signalStrengthReadings = {
    fields: [{
        label: 'Signal Strength', 
        name: 'signal_strength', 
        type: 'number', 
        data_type: 'int', 
        required: true
    },{
        label: 'Signal Power', 
        name: 'signal_power', 
        type: 'number', 
        data_type: 'int', 
        required: true
    },{
        label: 'Signal Quality', 
        name: 'signal_quality', 
        type: 'number', 
        data_type: 'int', 
        required: true
    },{
        label: 'Signal to Noise Ratio', 
        name: 'signal_to_noise', 
        type: 'number', 
        data_type: 'int', 
        required: true
    },{
        label: 'Installation', 
        name: 'installation', 
        type: 'relationship', 
        rel_model: 'installations',
        rel_type: 'many-to-one',
        rel_display_key: 'name',
        disabled: true
    }]
};