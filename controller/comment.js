const CommentModel = require('../models/comment');
const PictureModel = require('../models/picture')
const jwt = require('jsonwebtoken');


class CommentController{
    static addComment(req,res){
        jwt.verify(req.body.token,process.env.SECRET,(err,decoded)=>{
            if(err){
                res.status(500).json({
                    err:err,
                    msg:'invalid token'
                })
                return;
            }
            let newComment = new CommentModel({
                ownersId : req.body.ownersId,
                pictureId: req.body.pictureId,
                comment  : req.body.comment
            })
            // console.log(newComment);
            newComment.save()
            .then(comment=>{
                PictureModel.findById(req.body.pictureId).populate(['comment'])
                .then(picture=>{
                    picture.comment.push(comment._id)
                    picture.save()
                    .then(r=>{
                        console.log(r);
                        res.status(200).json({
                            msg:'comment added to picture',
                            data:r
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(err=>{
                console.log(err);
            })
            
        })

    }
    
}

module.exports = CommentController;