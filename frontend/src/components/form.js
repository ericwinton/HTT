app.components.form = ({model, data}) => {
    if (!app.models[model]) { return {template: `<p>Model not found: ${model}</p>`} } ;

    var formFields = '';
    var thisModel = app.models[model];
    var parentModel = (thisModel.extends) ? app.models[thisModel.extends] : null;
    var parentModelFields = parentModel?.fields || [];
    var fields = thisModel.fields;
    var allFields = parentModelFields.concat(fields);
    var type = (data && data.id) ? 'edit' : 'new';
    var method = (type === 'edit') ? 'PUT' : 'POST';
    var itemIdArg = (type === 'edit') ? `, '${data.id}'` : '';

    allFields.forEach(field => {
        if (!field.disabled) {
            var fieldVal = '';
            var fieldProps = {};
            
            if (data) {
                fieldVal = (field.type === 'relationship') ? data[field.name] : (data[field.name] !== undefined) ? data[field.name] : '';
                fieldProps = { value: fieldVal };
            }

            for (var key in field) {
                fieldProps[key] = field[key];
            }

            formFields += app.render('formField', fieldProps);
        }
    });

    return {
        template: `
            <form onsubmit="app.run(event, 'save')" method="${method}">
                ${formFields}
                <button type="submit" class="btn">Save</button>
            </form>
        `,

        functions: {
            save: async (e) => {
                e.preventDefault();
                var form = e.target;
                var fields = form.querySelector('input, textarea, select');
                console.log(fields);
                var formData = new FormData(form);
                var saveData = {};
                var method = form.getAttribute('method');
                var idPath = (data.id) ? '/' + data.id : '';
    
                formData.forEach((value, key) => saveData[key] = value);
    
                var res = await fetch('/api/' + model + idPath, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(saveData)
                });
    
                var resJson = await res.json();
    
                if (resJson.status === 200) {
                    if (app.url.pathArray[1] === 'new' || app.url.pathArray[2] === 'new') {
                        app.newRoute('/' + model + '/' + resJson.data.id);
                    } else {
                        app.functions.toast('Item Saved', 'Success');
                    }
                } else {
                    app.functions.toast(resJson.message, 'Error');
                }
            }
        },

        onFirstRender: async (el) => {
            // pre-fill all related fields
            var relFields = document.querySelectorAll('input[type="hidden"]');
            var relData = data;

            for (var i = 0; i < relFields.length; i++) {
                var field = relFields[i];
                var ids = field.value.split(',');
                var group = field.closest('.relationship-group');
                var displayField = group.querySelector('input[type="text"]');
                var relModel = displayField.dataset.relModel;

                for (var i = 0; i < ids.length; i++) {
                    var id = ids[i];
                    var record = await app.functions.getById(relModel, id);
                    relData[field.name] = record;
                }
            }

            app.render('form', {model: model, data: relData}, el);
        },
    }
}