app.components.table = (props) => {
    var headers = '';

    props.headers.forEach(h => {
        headers += `<th>${h}</th>`;
    });

    return {
        template: `
            <div class="table-wrap">
                <table>
                    <thead><tr>${headers}</tr></thead>
                    <tbody>${props.rows}</tbody>
                </table>
            </div>
        `
    }
};