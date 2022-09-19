app.components.loginView = () => {
    app.data.pageTitle = 'Login';

    return {
        template: `
            <div class="login">
                <p>${app.render('logoSvg')}</p>
                <br /><br />

                <div class="login-message"></div>

                <form onsubmit="app.run(event, 'login')">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" required>
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        `,

        styles: `
            .login {
                width: 360px;
                margin: 15px auto;

                .login-message-error {
                    background: #f1e6e8;
                    padding: 10px;
                    margin-bottom: 15px;
                    border-radius: 4px;
                }
            }
        `,

        functions: {
            login: async (e) => {
                e.preventDefault();
                var email = e.target.querySelector('[name="email"]').value;
                var password = e.target.querySelector('[name="password"]').value;
                var res = await fetch('/scripts/login', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email: email, password: password})
                });
                var resJson = await res.json();

                if (resJson.status === 'Success') {
                    var user = resJson.data;
                    //var role = await app.functions.getById('roles', user.role);
                    //var perms = [];

                    //for (var i = 0; i < role.permissions.length; i++) {
                    //    var permId = role.permissions[i];
                    //    var perm = await app.functions.getById('permissions', permId);
                    //    perms.push(perm);
                    //}

                    user.token = resJson.token;
                    //user.role = role;
                    //user.permissions = perms;
                    sessionStorage.setItem('htt_user', JSON.stringify(user));
                    var homeRoute = (user.customer?.id) ? '/installations' : '/customers';
                    app.newRoute(homeRoute);
                } else {
                    document.querySelector('.login-message').innerHTML = '<div class="login-message-error">' + resJson.message + '</div>';
                }
            }
        }
    }
};