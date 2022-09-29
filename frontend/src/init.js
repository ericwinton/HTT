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
            paths: [
                '/customers/:custId', 
                '/customers/:custId/users', 
                '/customers/:custId/installations',
                '/customers/:custId/installations/new',
                '/customers/:custId/installations/map',
            ],
            component: 'custPageTemplate',
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
            paths: [
                '/installations/:instId', 
                '/installations/:instId/io/:ioType', 
                '/installations/:instId/io/:ioType/:ioId', 
                '/installations/:instId/:instSection',
                '/installations/:instId/:instSection/:instDetailId', 
            ],
            component: 'instPageTemplate'
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
        toCamelCase: (str) => {
            return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        },
        toast: (message, status = 'Success') => {
            app.components.toast().functions.open(message, status);
        },
        loadStylesheets: (stylesheets) => {
            stylesheets.forEach(ssSrc => {
                if (!document.querySelector('link[href="' + ssSrc + '"]')) {
                    var ss = document.createElement('link');
                    ss.rel = 'stylesheet';
                    ss.href = ssSrc;
                    document.head.appendChild(ss);
                }
            });
        },
        loadScripts: (scripts) => {
            return new Promise((resolve, reject) => {
                var index = 0;

                function loaded() {
                    console.log('loaded');
                    index++;

                    if (index < scripts.length) {
                        console.log('load the next');
                        loadScript(scripts[index]);
                    } else {
                        console.log('calling back');
                        resolve();
                    }
                }

                function loadScript(scriptSrc) {
                    console.log('loading ', scriptSrc);
                    if (document.querySelector('script[src="' + scriptSrc + '"]')) {
                        console.log('exists: ', scriptSrc);
                        loaded();
                    } else {
                        console.log('does not exist: ', scriptSrc);
                        var s = document.createElement('script');
                        s.src = scriptSrc;
                        s.onload = () => {
                            loaded();
                        };
                        document.body.appendChild(s);
                    }
                }

                loadScript(scripts[0]);
            });
        }
    },
    afterRouteChange: () => {
        var user = JSON.parse(sessionStorage.getItem('htt_user'));

        app.data.user = user;

        if (!user && app.url.path !== '/login') {
            app.newRoute('/login');
        }
        
        if (!app.route || app.route.httRoute && app.data.user.customer) {
            app.newRoute('/404');
        }
    }
});