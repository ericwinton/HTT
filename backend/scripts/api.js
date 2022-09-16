const fs = require('fs');

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function readFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

module.exports = async (req, res) => {
    let output = { status: 200, message: '', type: req.params.collection };
    let data = [];
    let fields = [];
    let limit = +req.query._limit || 20;
    let offset = +req.query._offset || 0;
    let modelPath = BASE_DIR + '/models/' + req.params.collection + '.js';
    let modelExists = fs.existsSync(modelPath);
    let targetDepth = +req.query._depth || 1;
    let totalCount = 0;

    if (modelExists) {
        let model = require(modelPath);
        let parentModelPath = (model.extends) ? BASE_DIR + '/models/' + model.extends + '.js' : null;
        let parentModelExists = (parentModelPath) ? fs.existsSync(parentModelPath) : false;
        let parentModel = (parentModelExists) ? require(parentModelPath) : null;
        let filePath = BASE_DIR + '/db/' + req.params.collection + '.json';
        let collectionExists = fs.existsSync(filePath);
        
        fields = (parentModel) ? model.fields.concat(parentModel.fields) : model.fields;

        if (req.method === 'POST') {
            // POST
            let results = [];
            let newRecord = req.body;

            newRecord.id = guid();
            newRecord.created = new Date();
            newRecord.modified = new Date();

            if (collectionExists) {
                results = readFile(filePath);
                results.push(newRecord);
            } else {
                results = [newRecord];
            }

            fs.writeFileSync(filePath, JSON.stringify(results));

            output.message = 'Item Saved';
            output.data = req.body;
        } else if (req.method === 'PUT') {
            // PUT
            if (collectionExists) {
                var results = readFile(filePath);
                var result = null;
                
                for (var i = 0; i < results.length; i++) {
                    var item = results[i];

                    if (item.id === req.params.id) {
                        fields.forEach(field => {
                            if (req.body[field.name]) {
                                item[field.name] = req.body[field.name];
                            }
                        });

                        item.modified = new Date();

                        result = item;
                        break;
                    }
                }

                if (result) {
                    fs.writeFileSync(filePath, JSON.stringify(results));
                    output.data = result;
                } else {
                    output.status = 404;
                    output.message = 'ID not found';
                }
            } else {
                output.status = 404;
                output.message = 'Collection not found';
            }
        } else if (req.method === 'DELETE') {
            // DELETE
            if (collectionExists) {
                var results = readFile(filePath);

                results = results.filter(item => item.id !== req.params.id);

                fs.writeFileSync(filePath, JSON.stringify(results));

                output.message = 'Item Deleted Successfully';
            } else {
                output.status = 404;
                output.message = 'Collection not found';
            }

        } else {
            // GET
            function buildItem(item, fields, depth = 0) {
                let newItem = { id: item.id };

                for (var i = 0; i < fields.length; i++) {
                    let field = fields[i];
                    let fieldName = field.name;

                    if (field.type === 'relationship' && depth < targetDepth) {
                        let relModelPath = BASE_DIR + '/models/' + field.rel_model + '.js';
                        let relModelExists = fs.existsSync(relModelPath);

                        if (relModelExists) {
                            let relModel = require(relModelPath);
                            let relFields = relModel.fields;
                            let relFilePath = BASE_DIR + '/db/' + field.rel_model + '.json';
                            let relCollectionExists = fs.existsSync(relFilePath);

                            if (relCollectionExists) {
                                const relCollection = readFile(relFilePath);

                                for (var j = 0; j < relCollection.length; j++) {
                                    var relItem = relCollection[j];

                                    if (relItem && relItem.id === item[fieldName]) {
                                        newItem[fieldName] = buildItem(relItem, relFields, depth + 1);
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        newItem[fieldName] = item[fieldName];
                    }
                }

                return newItem;
            }

            if (collectionExists) {
                let collection = readFile(filePath);

                if (req.params.id) {
                    let item = collection.find(item => item.id === req.params.id);
                    data = buildItem(item, fields);
                } else {
                    for (var i = 0; i < collection.length; i++) {
                        if (i < offset) { continue; }
                        
                        var item = collection[i];
                        var match = true;

                        for (var key in req.query) {
                            if (key.indexOf('_') === 0) { continue; }

                            var itemVal = (item[key]) ? item[key].toString().toLowerCase() : null;
                            var queryVal = req.query[key].toLowerCase();

                            if (!itemVal) { match = false; break; }

                            if (queryVal.indexOf('*') === 0 || queryVal.indexOf('*') === queryVal.length - 1) {
                                // wildcard
                                var queryValClean = queryVal.replace(/\*/g, '');

                                if (queryVal.split('')[0] === '*' && queryVal.split('')[queryVal.length - 1] === '*') {
                                    // contains
                                    if (itemVal.indexOf(queryValClean) === -1) { match = false; break; }
                                } else if (queryVal.indexOf('*') === 0) {
                                    // ends with
                                    if (itemVal.indexOf(queryValClean) !== itemVal.length - queryValClean.length) { match = false; break; }
                                } else {
                                    // starts with
                                    if (itemVal.indexOf(queryValClean) !== 0) { match = false; break; }
                                }
                            } else {
                                // exact match
                                if (itemVal !== req.query[key]) { match = false; break; }
                            }
                        }

                        if (match) {
                            if (data.length < limit) {
                                data.push(buildItem(item, fields));
                            }

                            totalCount++;
                        }
                    }
                }
            }

            if (output.status === 200) {
                output.data = data;
                output.fields = fields;
                output.totalCount = totalCount;
            }
        }
    } else {
        output.status = 404;
        output.message = 'Collection not found';
    }

    return res.json(output);
}