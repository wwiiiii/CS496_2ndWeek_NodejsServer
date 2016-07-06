//query : https형식, GET, 
//https://graph.facebook.com/me?fields=id,name,email&access_token=token_string
https = require('https');
async = require('async');
function loadFriendByToken(token) {
    var opt = {
        host: 'graph.facebook.com',
        port: 443,
        //path: '/me?fields=id,name,email&access_token=' + token,
        path: '/me/invitable_friends?pretty=0&limit=1&access_token=' + token,
        method: 'GET'
    };

    https.request(opt, function (response) {
        response.on('data', function (d) {
            console.log('waterfall prev');
            console.log(d);
        });
    }).end();

    async.waterfall([
        function (callback) {
            https.request(opt, function(response){
                response.on('data', function (d) {
                    console.log('data');
                    callback(null, d);
                });
            }).end();
        },
        function (info, callback) {
            var info = JSON.parse(info);
            console.log(info);
            callback(null, info);
        }
    ], function (err , res) {
        if (err) console.log(err);
        else { console.log(res); return res;}
    });
}
var token = 'EAACEdEose0cBAJWwOTloOxdSGk8xIfUvuppX8AHPts5xQQrPWhb0G4rgNJ8VGJ8wjIhrO3dzF4YQbk7xv2YnqDwt4spJy5ZCmatCB2cIluKifYJJVtWRYbiZAZCbj1ZA1T7jxp7lAdgpi0WL1al64FIuNGjn8YjqYZC01rEBZBfgZDZD';
loadFriendByToken(token);