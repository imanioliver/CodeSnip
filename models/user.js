const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
// const User = require("../models/user");

// mongoose.connect("mongodb://localhost:27017/codesnipDirectory");

const userSchema = new Schema({
    username: {type: String, required: true, unique: true || null},
    passwordHash: {type: String || null || null},
    firstName: {type: String, required: true || null},
    lastName: {type: String, required: true || null},
    email: {type: String, required: true, unique: true || null},
    avatar:{type: String || null},
    //mongo id is assigned for each user
});


userSchema.virtual('password')
    .get(function() {
        return null
    })
    .set(function(value) {
        const hash = bcrypt.hashSync(value, 8);
        this.passwordHash = hash;
    })

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};

const User = mongoose.model("User", userSchema);

module.exports = User;
