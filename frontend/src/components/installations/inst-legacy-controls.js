app.components.instLegacyControls = () => {
    return {
        template: `
            <div class="inst-legacy-controls">
                <h2>Legacy Controls</h2>
                ${app.render('table', {model: 'legacy-controls'})}
            </div>
        `
    }
};