app.components.userDetail = () => {
    var user = app.data.users.find(u => u.id === +app.url.mapped.userId);
    var roleOptions = '';
    var profilePic = (user.image) ? user.image : app.data.noProfile;
    var customerField = '';
    var breadcrumbs = app.render('breadcrumbs', {items: [
        {text: 'Users', url: '/users'},
        {text: `${user.first_name} ${user.last_name}`}
    ]});

    if (!app.data.user.customer_id) {
        var customerOptions = '';

        app.data.customers.forEach((cust) => {
            var selected = (cust.id === user.customer_id) ? ' selected' : '';
            customerOptions += `<option value="${cust.id}"${selected}>${cust.name}</option>`;
        });

        customerField = `
            <div class="form-group">
                <label>Customer</label>
                <select name="customer_id" required>
                    ${customerOptions}
                </select>
            </div>
        `;
    }

    app.data.roles.forEach((role) => {
        var selected = (role.id === user.role_id) ? ' selected' : '';
        roleOptions += `<option value="${role.id}"${selected}>${role.name}</option>`;
    });

    return {
        template: `
            <div>
                ${app.render('headingBar', {title: `${user.first_name} ${user.last_name}`, breadcrumbs: breadcrumbs})}

                <div class="form-container">
                    <form>
                        <div class="form-group">
                            <a href="#" onclick="app.run(event, 'editProfilePic')"><img class="profile-pic-lg rounded" src="${profilePic}"></a>
                            <input type="file" name="upload_profile_pic" class="upload-profile-pic" onchange="app.run(event, 'uploadProfilePic')">
                        </div>
                        <div class="form-group">
                            <label>First Name *</label>
                            <input type="text" name="first_name" value="${user.first_name}" required>
                        </div>
                        <div class="form-group">
                            <label>First Name *</label>
                            <input type="text" name="last_name" value="${user.last_name}" required>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" value="${user.email}" required>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="text" name="phone" value="${user.phone}">
                        </div>
                        <div class="form-group">
                            <label>Role *</label>
                            <select name="role_id" required>
                                ${roleOptions}
                            </select>
                        </div>
                        ${customerField}
                        <button type="submit" class="btn">Save</button>
                    </form>
                </div>
            </div>
        `,

        styles: `
            .profile-pic-lg {
                width: 120px;
            }
            .upload-profile-pic {
                display: none;
            }
        `,

        functions: {
            editProfilePic: (e) => {
                e.preventDefault();
                document.querySelector('.upload-profile-pic').click();
            },

            uploadProfilePic: (e) => {
                e.preventDefault();
                alert('Uploading Profile Pic...');
            }
        }
    }
};