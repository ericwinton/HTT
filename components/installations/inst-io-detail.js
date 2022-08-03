app.components.instIODetail = ({ioName}) => {
    var io = app.data.io.find(io => io.id === +app.url.mapped.instSectionDetailId);
    var ioHeader = ioName || io.name;
    var ioOptions = '';

    app.data.ioTypes.forEach((type) => {
        var selected = (type.id === io.type_id) ? ' selected' : '';
        ioOptions += `<option value="${type.id}"${selected}>${type.name}</option>`;
    });

    app.data.pageTitle = io.name + ' | IO';

    return {
        template: `
            <div class="io-detail">
                ${app.render('backLink', {url: `/installations/${app.url.mapped.instId}/io`})}

                <h2>${ioHeader}</h2>

                <div class="form-container">
                    <form>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" value="${io.name}" onkeyup="app.run(event, 'updateIOName')">
                        </div>

                        <div class="form-group">
                            <label>Type</label>
                            <select name="type">
                                ${ioOptions}
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Location</label>
                            <input type="number" value="${io.location}">
                        </div>

                        <button type="submit" class="btn">Save</button>
                    </form>
                </div>
            </div>
        `,

        functions: {
            updateIOName: (e) => {
                app.render('instIODetail', {ioName: e.target.value}, e.target.closest('.io-detail'));
            }
        }
    }
};