const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
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
    }
});

UserSchema.statics.generateIB = function () {
    var free = false
    var ib
    do {
    ib = Math.floor(Math.random() * 10 + 1);  
      } while (!free);
}

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);