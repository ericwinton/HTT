app.components.instTelemetryData = () => {
    return {
        template: `
            <div class="inst-telemetry-data">
                <h2>Telemtetry Data</h2>
                ${app.render('table', {model: 'telemetry-data'})}
            </div>
        `
    }
};