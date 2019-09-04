var mongoose = require('mongoose');
var otherSchema=new mongoose.Schema({
        itemName: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: String
        }
})
var UserSchema = new mongoose.Schema({
    name: {
        type: String, trim: true,
        required: true
    },
    email: {
        type: String, trim: true,
        required: true
    },
    phn: {
        type: String, trim: true,
        required: true
    },
    address: {
        type: String, trim: true,
        required: true,
    },
    flag: {
        type: Number, default: 1,
        required: true
    },
    other: [otherSchema]
});

var user = mongoose.model('users', UserSchema);
module.exports = { user }