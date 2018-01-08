const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let userGramSchema = new Schema ({
    email       : String,
    password    : String,
    profilePic  : String,
    album       : [{
        type    : Schema.Types.ObjectId,
        ref     : 'Pictures'
    }],
    followers   : [{
        type    : Schema.Types.ObjectId,
        ref     : 'UserGram'
    }]
})

userGramSchema.pre('save',function(callback){
    bcrypt.hash(this.password,10)
    .then(hash=>{
        this.password = hash
        callback()
    })
    .catch(callback)
})


const UserGram = mongoose.model('UserGram', userGramSchema);

module.exports = UserGram;
