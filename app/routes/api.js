var User = require('../models/user');

module.exports = function(router) {
	router.post('/user', function(req, res){
	var newUser = new User();
	newUser.username = req.body.username;
	newUser.email = req.body.email;
	newUser.password = req.body.password;{}
	if(req.body.username == "" || req.body.username == null ||req.body.password == "" || req.body.password == null ||req.body.email == "" || req.body.email == null){
		res.send("Username or password field is empty");
	}
	else{
		newUser.save(function(err, userCreated){

			if(err) {
				res.send('Username or email already exists');
			}
			else{
				res.send('User created');
			}
		});
	}
});
	return router;
}