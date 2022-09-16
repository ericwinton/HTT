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
            <form onsubmit="app.functions.save(event, '${model.replace(/_/, '-')}'${itemIdArg})" method="${method}">
                ${formFields}
                <button type="submit" class="btn">Save</button>
            </form>
        `,

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
                    console.log(record);
                    relData[field.name] = record;
                }
            }

            app.render('form', {model: model, data: relData}, el);
        },
    }
}