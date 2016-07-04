var mycon = require('./connToMongo');

var server_ip = 'localhost';
var mongodb = require('mongodb');
var async = require('async');
var server = new mongodb.Server(server_ip, 27017, { auto_reconnect: true });
var log = console.log;
var db = new mongodb.Db('mydb', server);

try{
    async.waterfall([
        function(callback){
            db.open(function(err,db){
                callback(db);
            });        
        },
        function (callback){
            db.collection('myElement', function(err, collection){
                callback(collection);
            });
        },
        function(collection ,callback){
            var elem1 = {_id:1, name:"정태영", phone:"01044257107",email:"wwiiiii@kaist.ac.kr"};
            var elem2 = {_id:2, name:"이현",phone:"01087963194",email:"haneone15@kaist.ac.kr"};
            mycon.insert(collection , elem1);
            mycon.insert(collection , elem2);
            callback(collection);
        },
        function(collection, callback){
            var cons = {_id:1};
            var opt  = {};
            var res = mycon.find(collection , cons, opt);
            log(res);
            callback();
        }
    ],
    function (err, result){
        if(err) throw err;
        else log(result);
        db.close();
    });    
} catch(err){
    log(err);
}