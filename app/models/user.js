var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = mongoose.Schema;

var userSchema = new schema({
	username : { type : String, required : true, unique : true },
	email : { type : String, required : true, unique : true},
	password : { type : String, required : true}
});

userSchema.pre('save',function(next){
	var user = this;
	var salt = 1;
	bcrypt.hash(user.password, salt, function(err, hash) {
		if(err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
}); 

userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);