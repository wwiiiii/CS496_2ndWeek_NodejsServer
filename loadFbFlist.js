//query : https형식, GET, 
//https://graph.facebook.com/me?fields=id,name,email&access_token=token_string
https = require('https');

function myCallBack(response)
{
    response.on('data',(d) => {
        process.stdout.write(d);
    });
}

function loadFriendByToken(token, callBack)
{
    var opt = {
        host: 'graph.facebook.com',
        port: 443,
        //path: '/me?fields=id,name,email&access_token=' + token,
        path: '/me/friends?access_token='+token,
        method: 'GET'
    };
    https.request(opt,callBack).end();
}
var token = 'EAACEdEose0cBAAvui4uqI4H0V4HFhuRgbyupPDLZAg7RFiD2MviTume6flExZCzAhIU5xRqfU4cvpbca374hkwrhTjY99SfqsmcFF1hmZBQATHtIRzqlUYLL8L697ubLhw2QD2vWu0kFvmKPZBFWn876locJfc3HFuhU9UZAZC3QZDZD';
loadFriendByToken(token);