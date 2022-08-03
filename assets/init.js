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
            component: 'customersView'
        },
        {
            paths: ['/customers/:custId'],
            component: 'customerDetail'
        },
        {
            paths: ['/distributors'],
            component: 'distributorsView'
        },
        {
            paths: ['/distributors/:distId'],
            component: 'distributorDetail'
        },
        {
            paths: ['/installations'],
            component: 'installationsView'
        },
        {
            paths: [
                '/installations/:instId', 
                '/installations/:instId/:instSection',
                '/installations/:instId/:instSection/:instSectionDetailId',
                '/installations/:instId/:instSection/:instSectionDetailId/:ioType'
            ],
            component: 'installationPageTemplate'
        },
        {
            paths: ['/hardware', '/hardware/:hardwareType'],
            component: 'hardwareView'
        },
        {
            paths: ['/users', '/htt-users'],
            component: 'usersView'
        },
        {
            paths: ['/users/:userId', '/htt-users/:userId'],
            component: 'userDetail'
        }
    ],
    data: {
        noProfile: '/assets/images/no-profile.jpg',
        showSignalStrengthModal: false,
        instSections: ['Overview', 'Alarms', 'Logs', 'IO', 'RTU Configs', 'RTU Messages', 'Telemetry Data', 'Legacy Controls'],
        ioTypes: [
            { id: 1, name: 'Analog Input', slug: 'analog-input' },
            { id: 2, name: 'Analog Output', slug: 'analog-output' },
            { id: 3, name: 'Digital Input', slug: 'digital-input' },
            { id: 4, name: 'Digital Output', slug: 'digital-output' },
            { id: 5, name: 'Counter', slug: 'counter' },
            { id: 6, name: 'Pump', slug: 'pump' },
            { id: 7, name: 'Valve', slug: 'valve' },
            { id: 8, name: 'Rain Counter', slug: 'rain-counter' },
            { id: 9, name: 'PLC Register', slug: 'plc-register' },
        ]
    },
    afterRouteChange: () => {
        var user = JSON.parse(sessionStorage.getItem('htt_user'));

        app.data.user = user;

        if (!user && app.url.path !== '/login') {
            app.newRoute('/login');
        }
    }
});