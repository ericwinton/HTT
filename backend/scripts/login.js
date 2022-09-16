module.exports = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const users = require('../db/users.json');
    const roles = require('../db/roles.json');
    const permissions = require('../db/permissions.json');
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        const role = roles.find(role => role.id === user.role);

        if (role) {
            const perms = permissions.filter(perm => role.permissions.indexOf(perm.id) > -1);

            if (perms.length) {
                user.role = role;
                user.role.permissions = perms;

                req.session.userId = user.id;

                return res.json({
                    status: 'Success',
                    data: user,
                    token: Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
                });
            } else {
                return res.json({
                    status: 'Error',
                    message: 'No permissions found'
                });
            }
        } else {
            return res.json({
                status: 'Error',
                message: 'Role not found (id: ' + user.role + ')'
            });
        }
    } else {
        return res.json({
            status: 'Error',
            message: 'Email or password incorrect'
        });
    }
};