module.exports = {
    insert: insertToDb,
    find: findAllFromDb   
}


function insertToDb(collection, element, callback)
{
    collection.insert(element, function (err, res) {
        if (err) {
            console.log('insertToDb error');
            if(callback!=null)callback(err, res);
        } else {
            console.log('********insert To db succeed*********');
            console.log(res);
            if(callback!=null)callback(null, null);
        }   
    })
}

function findAllFromDb(collection, constraints, fields, callback)
{
    collection.find(constraints, fields).toArray(function (err, docs) {
        if (err) {
            console.log('findAllFromDb error');
            console.log(err);
            if (callback != null) callback(err);
        }
        else {
            if (callback != null) callback(null, docs);
        }
    });
    /*collection.find({ _id: 112233 }, { fields: {title:0}}).toArray(function (err, docs) {
        if (err) console.log(err);
        else console.log('docs' + docs);
        collection.findOne({}, function (err, doc) { console.log(doc); callback(err);}
        );
    });*/
}