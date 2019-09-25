var mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
var userLoginSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
});
userLoginSchema.plugin(beautifyUnique);

var otherSchema = new mongoose.Schema({
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
var signup = mongoose.model('signin', userLoginSchema);
module.exports = { user ,signup}
                                                                                                                                                        
// signin.schema.path('username').validate(function (value, respond) {                                                                                           
//     signin.findOne({ username: value }, function (err, user) {                                                                                                
//         if(user) respond(false);                                                                                                                         
//     });                                                                                                                                                  
// }, 'This username address is already registered');