app.routeData.userDetail = async () => {
    app.data.userDetail = await app.functions.getById('users', app.url.mapped.userId);
}

app.components.userDetail = () => {
    var user = app.data.userDetail;
    var fullName = `${user.first_name} ${user.last_name}`;
    var breadcrumbs = app.render('breadcrumbs', {items: [
        {text: 'Users', url: '/users'},
        {text: fullName}
    ]});

    return {
        template: `
            <div>
                ${app.render('headingBar', {title: fullName, breadcrumbs: breadcrumbs})}
                ${app.render('form', {model: 'users', data: user})}
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