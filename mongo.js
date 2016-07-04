var server_ip = 'localhost';
var mongodb = require('mongodb');
var async = require('async');
var server = new mongodb.Server(server_ip, 27017, { auto_reconnect: true });

var db = new mongodb.Db('mydb', server);
db.open(function (err, db) {
    if (!err) {
        db.collection('widget', function (err, collection) {
            if (err) console.log(err);
            collection.remove(null, { safe: true }, function (err, result) {
                if (!err) {
                    console.log('result of remove ' + result);
                    var widget1 = {
                        title: 'first widget',
                        desc: 'this is desc',
                        prices: 14.99
                    };
                    var widget2 = {
                        title: 'second widget',
                        desc: 'this is desc2',
                        prices: 25.99
                    };
                    try {
                        async.waterfall([
                            function (callback) {
                                consoloe.log('start first');
                                collection.insert(widget1, function (err) { callback(err);});
                            },
                            function (callback) {
                                consoloe.log('start 2');
                                collection.insert(widget2, { safe: true }, function (err, result) {
                                    //if (err) console.log(err);
                                    //else console.log(result);
                                    callback(err);
                                });
                            },
                            function (callback) {
                                consoloe.log('3');
                                collection.find({ title: 'second widget' }, { fields: {title:0}}).toArray(function (err, docs) {
                                    if (err) console.log(err);
                                    else console.log('docs' + docs);
                                    callback(err);
                                });
                            }
                        ], function (err, result) {
                            consoloe.log('fin');
                            if (err) throw err;
                            console.log(result);
                            db.close();
                        })

                    } catch (err) {
                        console.log('waterfall err' + err);
                    }   
            
                    
                }
                else console.log(err);
            });
        });
    }
    else console.log(err);
});