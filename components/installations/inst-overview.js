app.components.instOverview = ({inst}) => {
    var signalStrengthModal = '';

    if (app.data.showSignalStrengthModal) {
        var ssHtml = app.render('signalStrengthChart', { installation: inst });
        signalStrengthModal = app.render('modal', { header: 'Signal Strength Readings', body: ssHtml, toggleKey: 'showSignalStrengthModal' });
    }

    var formFields = '';

    app.models.installation.attributes.forEach(attr => {
        formFields += app.render('formField', {label: attr.label, name: attr.name, value: inst[attr.name], required: attr.required || false});
    });

    return {
        watch: ['showSignalStrengthModal'],

        template: `
            <div>
                <h2>Overview</h2>
                <div class="form-container">
                    <form onsubmit="app.run(event, 'saveInst')">
                    ${formFields}
                        ${app.render('formField', {label: 'Name', name: 'name', value: inst.name, required: true})}
                        ${app.render('formField', {label: `Address (<a target="_blank" href="https://maps.google.com?q=${inst.lat}, ${inst.lng}">Map</a>)`, name: 'address', value: `${inst.address} ${inst.city}, ${inst.state} ${inst.zip}`})}
                        ${app.render('formField', {label: 'Latitude', name: 'lat', value: inst.lat})}
                        ${app.render('formField', {label: 'Longitude', name: 'lng', value: inst.lng})}
                        ${app.render('formField', {label: 'RTU Model', name: 'rtu_model', value: inst.rtu_model})}
                        ${app.render('formField', {label: 'Signal Strength (<a href="#" onclick="app.run(event, \'viewSignalStrength\', \'instOverview\')">View History</a>)', name: 'signal_strength', value: inst.signal_strength, disabled: true})}
                        <button type="submit" class="btn">Save</button>    
                    </form>
                </div>
                ${signalStrengthModal}
            </div>
        `,

        functions: {
            viewSignalStrength: (e) => {
                e.preventDefault();
                app.update('showSignalStrengthModal', true);
            },

            saveInst: (e) => {
                e.preventDefault();
                alert('Saving installation...');
            }
        }
    }
};