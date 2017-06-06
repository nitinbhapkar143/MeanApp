var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'mynameisanthony';

module.exports = function(router) {
	router.post('/user', function(req, res){
		var newUser = new User();
		newUser.username = req.body.username;
		newUser.email = req.body.email;
		newUser.password = req.body.password;{}
		if(req.body.username == '' || req.body.username == null ||req.body.password == '' || req.body.password == null ||req.body.email == '' || req.body.email == null){
			res.json({sucess : false, message : 'Username or password field is empty'});
		}
		else{
			newUser.save(function(err, userCreated){

				if(err) {
					res.json({success : false, message : 'Username or email already exists'});
				}
				else{
					res.json({success: true, message: 'User created'});
				}
			});
		 }
	});

	router.post('/authenticate',function(req, res){
		if(req.body.username == '' || req.body.username == null ||req.body.password == '' || req.body.password == null){
			res.json({sucess : false, message : 'Username or password field is empty'});
		}
		else{
			User.findOne({username : req.body.username}).select("username email password").exec(function(err, user){
				if(err) throw err;
				if(!user){
					res.json({success : false, message : 'Failed to authenticate user'});
				}
				else{
					var validUser = user.comparePassword(req.body.password);
					if(!validUser){
						res.json({success : false, message : 'Failed to authenticate password'});
					}
					else{
						var token = jwt.sign({username : user.username, email : user.email}, secret, {expiresIn : '24h'});
						res.json({success: true, token: token, message: 'User Authenticated'});
					}
				}
			})
		}
	});

	router.use(function(req, res, next){
		var token = req.body.token || req.headers['x-access-token'] || req.body.query;
		if(token){
			jwt.verify(token, secret, function(err, decoded){
				if(err){
					res.json({success : false, message : 'Invalid token'});
				}
				else{
					req.decoded = decoded;
					next();
				}
			});
		}
		else{
			res.json({success : false, message : 'No token provided'});
		}
	});

	router.post('/me', function(req, res) {
		res.send(req.decoded);
	});

	return router;
}