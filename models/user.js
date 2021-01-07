const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    IB: {
        type: String,
        required: true,
        unique: true
    },
    type : {
        type: String,
        required: true
    },
    registDate:{
        type: Date,
        default: Date.now,
        required: true,
    }
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.statics.random = function(callback) {
    this.count(function(err, count) {
      if (err) {
        return callback(err);
      }
      var rand = Math.floor(Math.random() * count);
      this.findOne().skip(rand).exec(callback);
    }.bind(this));
  };

module.exports = mongoose.model('User', UserSchema);