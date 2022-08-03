app.components.instOverview = ({inst}) => {
    var signalStrengthModal = '';

    if (app.data.showSignalStrengthModal) {
        var ssHtml = app.render('signalStrengthChart', { installation: inst });
        signalStrengthModal = app.render('modal', { header: 'Signal Strength Readings', body: ssHtml, toggleKey: 'showSignalStrengthModal' });
    }

    return {
        watch: ['showSignalStrengthModal'],

        template: `
            <div>
                <h2>Overview</h2>
                <table width="100%">
                    <tr><td>Name</td><td>${inst.name}</td></tr>
                    <tr><td>Address</td><td>${inst.address} ${inst.city}, ${inst.state} ${inst.zip}</td></tr>
                    <tr><td>RTU Model</td><td>${inst.rtu_model}</td></tr>
                    <tr><td>Signal Strength</td><td>${inst.signal_strength} dB (<a href="#" onclick="app.run(event, 'viewSignalStrength')">View History</a>)</td></tr>
                </table>
                ${signalStrengthModal}
            </div>
        `,

        functions: {
            viewSignalStrength: (e) => {
                e.preventDefault();
                app.update('showSignalStrengthModal', true);
            }
        }
    }
};