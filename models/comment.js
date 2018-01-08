const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    ownersId    : [{
        type    : Schema.Types.ObjectId,
        ref     : 'UserGram'
    }],
    pictureId   : [{
        type    : Schema.Types.ObjectId,
        ref     : 'Pictures'
    }],
    comment     : String     
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;