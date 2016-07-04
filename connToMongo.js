﻿module.exports = {
    insert: insertToDb,
    find: findAllFromDb   
}


function insertToDb(collection, element)
{
    collection.insert(element, function (err) { console.log('insertToDb error');console.log(err);});
}

function findAllFromDb(collection, constraints, fields)
{
    collection.find(constraints, fields).toArray(function (err, docs) {
        if (err) return null;
        else return docs;
    })
    /*collection.find({ _id: 112233 }, { fields: {title:0}}).toArray(function (err, docs) {
        if (err) console.log(err);
        else console.log('docs' + docs);
        collection.findOne({}, function (err, doc) { console.log(doc); callback(err);}
        );
    });*/
}