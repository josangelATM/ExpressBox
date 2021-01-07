const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


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
    },
    weight: {
        type: Number,
        required: true,
        min: 1
    },
    fleetPrice: {
        type: Currency,
        required: true,
        min: 2.50
    },
    registDate:{
        type: Date,
        default: Date.now,
        required: true,
    }
});

module.exports = mongoose.model('Package', packageSchema);