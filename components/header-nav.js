app.components.headerNav = () => {
    var navItemsHtml = '';

    var navItems = [
        { name: 'Installations', url: '/installations' },
        { name: 'Users', url: '/users' },
        { name: '<i class="fa fa-user" aria-hidden="true"></i>', title: 'My Profile', url: `/users/${app.data.user.id}` },
        { name: '<i class="fa fa-sign-out" aria-hidden="true"></i>', title: 'Logout', url: '/logout'}
    ];
    
    if (app.data.user?.role === 'HTT Admin') {
        navItems = [
            { name: 'Distributors', url: '/distributors' },
            { name: 'Customers', url: '/customers' },
            { name: 'Installations', url: '/installations' },
            { name: 'Hardware', url: '/hardware' },
            { name: 'Users', url: '/users' },
            { name: '<i class="fa fa-user" aria-hidden="true"></i>', title: 'My Profile', url: `/users/${app.data.user.id}` },
            { name: '<i class="fa fa-sign-out" aria-hidden="true"></i>', title: 'Logout', url: '/logout'}
        ];
    }

    navItems.forEach(item => {
        var title = (item.title) ? ' title="' + item.title + '"' : '';
        navItemsHtml += `<li><a href="${item.url}"${title}>${item.name}</a></li>`;
    });

    return {
        template: `
            <div class="nav-wrap">
                <div class="nav-toggle"><a class="show-mobile" href="#" onclick="app.run(event, 'toggleNav')"><i class="fa fa-bars" aria-hidden="true"></i></a></div>
                <div class="nav-panel">
                    <p class="close-nav show-mobile"><a href="#" onclick="app.run(event, 'toggleNav')">&times; Close</a></p>
                    <ul class="list-inline list-unstyled list-align-right header-nav">
                        ${navItemsHtml}
                    </ul>
                </div>
            </div>
        `,

        styles: `
            .nav-toggle a {
                text-align: right;
                font-size: 24px;
            }
            
            .header-nav {
                a {
                    color: #000;
                    text-decoration: none;
                }
            }

            @media (max-width: 767px) {
                .close-nav {
                    text-align: right;

                    a {
                        color: #fff;
                        padding: 15px 30px;
                        font-size: 20px;
                    }
                }

                .nav-panel {
                    position: fixed;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    background: #335589;
                    display: none;
                    color: #fff;

                    &.open {
                        display: block;
                    }

                    .list-inline.list-align-right li {
                        display: block;
                        margin: 0;

                        a {
                            padding: 15px 30px;
                            display: block;
                            font-size: 20px;
                            color: #fff;
                        }
                    }
                }
            }
        `,

        functions: {
            toggleNav: (e) => {
                e.preventDefault();
                var navPanel = document.querySelector('.nav-panel');

                if (!navPanel.classList.contains('open')) {
                    navPanel.classList.add('open');
                } else {
                    navPanel.classList.remove('open');
                }
            }
        }
    }
};