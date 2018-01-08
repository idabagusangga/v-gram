const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

let Schema = mongoose.Schema

let pictureSchema = new Schema ({
    ownersId    : [{
        type    : Schema.Types.ObjectId,
        ref     : 'UserGram'
    }],
    link        : String,
    caption     : String,
    comment     : [{
        type    : Schema.Types.ObjectId,
        ref     : 'Comment'
    }]
})

const Picture = mongoose.model('Pictures',pictureSchema);

module.exports = Picture; 
