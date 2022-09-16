app.components.newBtn = ({model, params}) => {
    var queryParams = params || '';

    return {
        template: `
            <div class="text-right">
                <p><a href="/${model}/new${queryParams}"><i class="fa fa-plus" aria-hidden="true"></i> Add New</a></p>
            </div>
        `
    }
};