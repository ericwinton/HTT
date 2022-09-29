app.components.newBtn = ({url}) => {
    return {
        template: `
            <li><a class="btn btn-sm" href="${url}"><i class="fa fa-plus" aria-hidden="true"></i> Add New</a></li>
        `
    }
}