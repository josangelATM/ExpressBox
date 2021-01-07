const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  quotationSchema = new Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emailTo:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    links:{
        type: [String],
        required: true
    },
    registDate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    status:{
        type: String,
        enum: ['pendiente','respondida'],
        required: true,
        default: 'pendiente'
    }

})

module.exports = mongoose.model('Quotation', quotationSchema);