app.components.logoutView = () => {
    return {
        template: `
            <div>Logging out...</div>
        `,

        onFirstRender: async () => {
            const res = await fetch('/scripts/logout', { method: 'POST' });
            const resJson = await res.json();
            
            if (resJson.status === 'Success') {
                sessionStorage.removeItem('htt_user');
                app.data.user = null;
                app.newRoute('/login', 'replace');
            }
        }
    }
};