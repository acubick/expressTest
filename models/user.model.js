var mongoose = require('mongoose');
var bcrypt  = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
                                      username: {
                                        type: String,
                                        unique: true,
                                        required: true
                                      },
                                      password: {
                                        type: String,
                                        required: true
                                      }
                                    });

UserSchema.pre('save', next => {
  
  var user = this;
  if(this.isModified || this.isNew){
    bcrypt.genSalt(10, function (err, salt) {
      if (err){
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err){
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  }
  else{
    next();
  }
});
UserSchema.methods.comparePassword = function (passw, cb) {
if(passw == this.password){{
  cb(null, true);
}}
  // bcrypt.compare(passw, this.password, function (err, isMatch) {
  //   console.log(err);
  //   if (err){
  //     return cb(err);
  //   }
  //   cb(null, isMatch);
  //
  // });
};

module.exports = mongoose.model('User', UserSchema);
