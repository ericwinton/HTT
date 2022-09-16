app.components.modal = (props) => {
    var modalHeader = (props.header) ? `<h3>${props.header}</h3>` : '';

    return {
        template: `
            <div class="modal">
                <div class="modal-card">
                    <a href="#" onclick="app.run(event, 'closeModal')" class="close-modal">&times;</a>
                    ${modalHeader}
                    ${props.body}
                </div>
            </div>
        `,

        styles: `
            .modal {
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                padding: 100px 15px 15px 15px;
                background-color: rgba(0,0,0,.8);
                opacity: 0;
                display: none;
                transition: .3s;
                overflow: auto;

                &.open {
                    align-items: center;
                    opacity: 1;
                }

                .modal-card {
                    background: #fff;
                    border-radius: 4px;
                    width: 800px;
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 15px;
                    position: relative;

                    h3 {
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 15px;
                    }

                    .close-modal {
                        width: 30px;
                        height: 30px;
                        background: #000;
                        color: #fff;
                        border-radius: 50%;
                        line-height: 30px;
                        text-align: center;
                        font-size: 24px;
                        box-shadow: 0 0 10px rgba(0,0,0,.5);
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        text-decoration: none;
                    }
                }
            }
        `,

        functions: {
            closeModal: (e) => {
                e.preventDefault();
                app.update(props.toggleKey, false);
            }
        },

        onFirstRender: () => {
            document.querySelector('.modal').style.display = 'block';

            setTimeout(() => {
                document.querySelector('.modal').classList.add('open');
            });
        }
    }
};