module.exports = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var users = [{
        id: 1,
        first_name: 'Eric',
        last_name: 'Winton',
        username: 'ewinton',
        email: 'eric.winton@htt.io',
        password: 'password',
        phone: '(555) 555-5555',
        role_id: 1,
    },{
        id: 2,
        first_name: 'Alex',
        last_name: 'Admin',
        username: 'alexadmin',
        email: 'alex.admin@gmail.com',
        password: 'password',
        phone: '(555) 555-5555',
        role_id: 2,
        customer_id: 1,
    },
    {
        id: 3,
        first_name: 'Suzie',
        last_name: 'Supervisor',
        username: 'suziesupervisor',
        email: 'suzie.supervisor@gmail.com',
        password: 'password',
        phone: '(555) 555-5555',
        role_id: 3,
        customer_id: 1,
    },
    {
        id: 4,
        first_name: 'Olaf',
        last_name: 'Operator',
        username: 'olafoperator',
        email: 'olaf.operator@gmail.com',
        password: 'password',
        phone: '(555) 555-5555',
        role_id: 4,
        customer_id: 2,
    },
    {
        id: 5,
        first_name: 'Vicky',
        last_name: 'Viewer',
        username: 'vickyviewer',
        email: 'vicky.viewer@gmail.com',
        password: 'password',
        phone: '(555) 555-5555',
        role_id: 5,
        customer_id: 1,
    }];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        req.session.userId = user.id;

        return res.json({
            status: 'Success',
            data: user,
            token: Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
        });
    } else {
        return res.json({
            status: 'Error',
            message: 'Email or password incorrect'
        });
    }
};