var app = new ReadyJS({
    cssPreprocessor: 'less',
    routes: [
        {
            paths: ['/login'],
            component: 'loginView'
        },
        {
            paths: ['/logout'],
            component: 'logoutView'
        },
        {
            paths: ['/', '/customers'],
            component: 'customers',
            httRoute: true
        },
        {
            paths: ['/customers/new'],
            component: 'newCustomer',
            httRoute: true
        },
        {
            paths: ['/customers/:custId'],
            component: 'customerDetail',
            httRoute: true
        },
        {
            paths: ['/distributors'],
            component: 'distributors',
            httRoute: true
        },
        {
            paths: ['/distributors/new'],
            component: 'newDistributor',
            httRoute: true
        },
        {
            paths: ['/distributors/:distId'],
            component: 'distributorDetail',
            httRoute: true
        },
        {
            paths: ['/installations'],
            component: 'installations'
        },
        {
            paths: ['/installations/new'],
            component: 'newInstallation',
            httRoute: true
        },
        {
            paths: ['/installations/:instId'],
            component: 'instDetail'
        },
        {
            paths: ['/io'],
            component: 'instIO'
        },
        {
            paths: ['/io/new', '/io/:ioType/new'],
            component: 'instNewIO'
        },
        {
            paths: ['/io/:ioType/:ioId'],
            component: 'instIODetail'
        },
        {
            paths: ['/alarms'],
            component: 'instAlarms'
        },
        {
            paths: ['/alarms/:alarmId'],
            component: 'instAlarmDetail'
        },
        {
            paths: ['/logs'],
            component: 'instLogs',
            httRoute: true
        },
        {
            paths: ['/logs/:logId'],
            component: 'instLogDetail',
            httRoute: true
        },
        {
            paths: ['/rtu-configs'],
            component: 'instRtuConfigs',
            httRoute: true
        },
        {
            paths: ['/rtu-messages'],
            component: 'instRtuMessages',
            httRoute: true
        },
        {
            paths: ['/telemetry-data'],
            component: 'instTelemetryData',
            httRoute: true
        },
        {
            paths: ['/legacy-controls'],
            component: 'instLegacyControls',
            httRoute: true
        },
        {
            paths: ['/hardware', '/hardware/:hardwareType'],
            component: 'hardware',
            httRoute: true
        },
        {
            paths: ['/hardware/:hardwareType/new'],
            component: 'newHardware',
            httRoute: true
        },
        {
            paths: ['/hardware/:hardwareType/:hardwareId'],
            component: 'hardwareDetail',
            httRoute: true
        },
        {
            paths: ['/users'],
            component: 'users'
        },
        {
            paths: ['/users/new'],
            component: 'usersNew',
            httRoute: true
        },
        {
            paths: ['/users/:userId'],
            component: 'userDetail'
        },
        {
            paths: ['/404'],
            component: 'pageNotFound'
        }
    ],
    data: {
        noProfile: '/assets/images/no-profile.jpg',
        showSignalStrengthModal: false,
        instSections: [
            {title: 'Overview', slug: 'installations'}, 
            {title: 'Alarms', slug: 'alarms'}, 
            {title: 'Logs', slug: 'logs'},
            {title: 'IO',  slug: 'io'},
            {title: 'RTU Configs', slug: 'rtu-configs'},
            {title: 'RTU Messages', slug: 'rtu-messages'},
            {title: 'Telemetry Data', slug: 'telemetry-data'},
            {title: 'Legacy Controls', slug: 'legacy-controls'}
        ],
    },
    functions: {
        isHTT: () => {
            if (app.data.user.customer) { return false; }
        },
        get: async (collection, filters = {}, options = {}) => {
            var res = await app.functions.getRes(collection, filters, options);
            app.data[collection + 'TotalCount'] = res.totalCount;
            return res.data;
        },
        getRes: async (collection, filters = {}, options = {}) => {
            var queryString = '';
            var queryOptions = '';
            var i = 0;

            for (var key in filters) {
                queryString += (i === 0) ? '?' + key + '=' + filters[key] : '&' + key + '=' + filters[key];
                i++;
            }

            for (var key in options) {
                queryOptions += (!queryString) ? '?_' + key + '=' + options[key] : '&_' + key + '=' + options[key];
                i++;
            }

            var res = await fetch('/api/' + collection + queryString + queryOptions);
            var resJson = await res.json();

            return resJson;
        },
        getOne: async (collection, filters, options) => {
            var results = await app.functions.get(collection, filters, options);
            return results[0] || {};
        },
        getById: async (collection, id, options) => {
            var queryOptions = '';

            for (var key in options) {
                queryOptions += (!queryOptions) ? '?_' + key + '=' + options[key] : '&_' + key + '=' + options[key];
            }

            try {
                var res = await fetch('/api/' + collection + '/' + id + queryOptions);
                var resJson = await res.json();
                return resJson.data;
            } catch(err) {
                return {};
            }
        },
        save: async (e, collection, id) => {
            e.preventDefault();
            var form = e.target;
            var formData = new FormData(form);
            var data = {};
            var method = form.getAttribute('method');
            var idPath = (id) ? '/' + id : '';

            formData.forEach((value, key) => data[key] = value);

            var res = await fetch('/api/' + collection + idPath, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            var resJson = await res.json();

            if (resJson.status === 200) {
                if (app.url.pathArray[1] === 'new') {
                    app.newRoute('/' + collection + '/' + resJson.data.id);
                } else {
                    alert('Item Saved');
                }
            }
        },
        delete: async (e, collection, id) => {
            e.preventDefault();

            if (confirm('Are you sure you would like to delete this ' + collection + ' item?')) {
                var res = await fetch('/api/' + collection + '/' + id, { method: 'DELETE' });
                var resJson = await res.json();

                if (resJson.status === 200) {
                    var newData = app.data[collection.replace(/-/g, '_')].filter(item => item.id !== id);
                    app.update(collection, newData);
                }
            }
        },
        toCamelCase: (str) => {
            return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        }
    },
    afterRouteChange: () => {
        var user = JSON.parse(sessionStorage.getItem('htt_user'));

        app.data.user = user;

        if (!user && app.url.path !== '/login') {
            app.newRoute('/login');
        }
        
        if (app.route.httRoute && app.data.user.customer) {
            app.newRoute('/404');
        }
    }
});