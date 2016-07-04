module.exports = {
    insert: insertToDb,
    find: findAllFromDb   
}


function insertToDb(collection, element, callback)
{
    collection.insert(element, function (err, res) {
        if (err) {
            console.log('insertToDb error');
            callback(err, res);
        } else {
            console.log(res);
            callback(null, null);
        }   
    })
}

function findAllFromDb(collection, constraints, fields, callback)
{
    collection.find(constraints, fields).toArray(function (err, docs) {
        if (err) {
            console.log('findAllFromDb error');
            console.log(err);
            callback(err);
        }
        else {
            callback(null, docs);
        }
    });
    /*collection.find({ _id: 112233 }, { fields: {title:0}}).toArray(function (err, docs) {
        if (err) console.log(err);
        else console.log('docs' + docs);
        collection.findOne({}, function (err, doc) { console.log(doc); callback(err);}
        );
    });*/
}