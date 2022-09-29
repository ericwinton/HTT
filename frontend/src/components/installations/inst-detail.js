app.components.instDetail = ({inst}) => {
    return {
        template: `
            <div class="inst-detail">
                <h2>Overview</h2>
                <div id="map"></div>
                ${app.render('form', {model: 'installations', data: inst})}
            </div>
        `,

        styles: `
            #map {
                height: 250px;
                margin-bottom: 30px;
            }
        `,

        onEveryRender: async () => {
            if (inst.lat && inst.lng) {
                app.functions.loadStylesheets(['https://unpkg.com/leaflet@1.7.1/dist/leaflet.css']);

                await app.functions.loadScripts(['https://unpkg.com/leaflet@1.7.1/dist/leaflet.js']);

                const latLng = [parseFloat(inst.lat), parseFloat(inst.lng)];

                const map = L.map("map", {
                    center: latLng,
                    zoom: 15
                });

                L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap'
                }).addTo(map);

                var marker = L.marker(latLng);
                marker.bindPopup(inst.name);

                marker.addTo(map);
            }
        }
    }
};