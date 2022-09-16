app.components.toast = () => {
    return {
        template: `
            <div class="toast">
                <a href="#" class="toast-close" onclick="app.run(event, 'closeToast')">&times;</a>
                <div class="toast-message"></div>
            </div>
        `,

        styles: `
            .toast {
                position: fixed;
                display: none;
                right: -300px;
                bottom: 15px;
                background: darkgreen;
                color: #fff;
                width: 250px;
                border-radius: 4px;
                transition: all .5s;
                padding: 10px 15px;

                .toast-close {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #444;
                    color: #fff;
                    text-align: center;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 50%;
                    text-decoration: none;
                    box-shadow: 0 0 5px rgba(0,0,0,.3);
                    border: 1px solid #fff;
                }

                &.error {
                    background: darkred;
                }

                &.open {
                    right: 15px;
                }
            }
        `,

        functions: {
            open: (message, status) => {
                var toast = document.querySelector('.toast');

                toast.querySelector('.toast-message').innerText = message;
                toast.style.display = 'block';
    
                if (status === 'Error') {
                    toast.classList.add('error');
                } else {
                    toast.classList.remove('error');
                }
    
                setTimeout(() => {
                    toast.classList.add('open');
                }, 10);
    
                if (status === 'Success') {
                    setTimeout(() => {
                        app.components.toast().functions.closeToast(null, toast);
                    }, 4000);
                }
            },

            closeToast: (e, toast) => {
                if (e) { e.preventDefault(); }

                var toast = toast || e.target.closest('.toast');

                toast.classList.remove('open');

                setTimeout(() => {
                    toast.style.display = 'none';
                    toast.classList.remove('error');
                }, 500);
            }
        }
    }
};