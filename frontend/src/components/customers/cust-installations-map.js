app.components.custInstallationsMap = function({cust}) {
    return {
        template: `
            <div class="customer-installations-map">
                <h2>Installations</h2>
                ${app.render('btnGroup', {newBtnUrl: `/customer/${cust.id}/installations/new`, items: [{text: 'List View', icon: 'list', url: `/customers/${cust.id}/installations`}]})}
                <div id="map"></div>
            </div>
        `,

        styles: `
            #map {
                height: 500px;
            }
        `,

        onFirstRender: async () => {
            if (app.data.custInstallations) {
                app.functions.loadStylesheets([
                    'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
                    'https://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.css',
                    'https://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.Default.css'
                ]);

                await app.functions.loadScripts([
                    'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
                    'https://leaflet.github.io/Leaflet.markercluster/dist/leaflet.markercluster-src.js'
                ]);

                const map = L.map("map");

                L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap'
                }).addTo(map);

                let markers = L.markerClusterGroup();

                app.data.custInstallations.forEach(inst => {
                    const latLng = [parseFloat(inst.lat), parseFloat(inst.lng)];
                    var marker = L.marker(latLng);
                    marker.bindPopup(inst.name);
                    markers.addLayer(marker);
                });

                map.addLayer(markers);
                map.fitBounds(markers.getBounds());
            }
        }
    }
};