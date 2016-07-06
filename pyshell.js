var PythonShell = require('python-shell');
var sh = new PythonShell('req.py');
var token = 'EAACEdEose0cBAPuWbT19LLOksHZCsda5m2O5lf4WySZBXQPSeounVZCadMDNgSdqfWKDV8vZB2nmtZCu01ZBajdAnDO5U6bgKsdxcZAV3sdrhBIJZAepuR2xuoCk4oy8ZAQBoqJTMKCtNVlcIyYZBvkL0oZCxQDValuESqyF44l4YsfDAZDZD'

sh.send(token);

sh.on('message', function(msg){
	console.log(msg);
});

sh.end(function (err){
	if(err) console.log(err);
	console.log('finished');
});
