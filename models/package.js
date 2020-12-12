const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const packageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    origen: {
        type: String, 
    },
    IB: {
        type: String,
        required: true,
    },
    trackingN:{
        type : String,
        required: true,
        unique: true
    },
    status: {
        type : String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Package', packageSchema);