const PictureModel = require('../models/picture');
const UserModel = require('../models/users')
const jwt = require('jsonwebtoken');

class PictureController{
    static createPicture(req,res){
        console.log(req.file.cloudStorageObject);
        if(req.body.token){
            jwt.verify(req.body.token,process.env.SECRET,(err,decoded)=>{
                if(err){
                    res.status(500).json({
                        msg:'must provide a valid token'
                    })
                    return;
                }
                let newPicture = new PictureModel ({
                    ownersId    : decoded.id,
                    link        : req.file.cloudStoragePublicUrl,
                    caption     : req.body.caption
                })
                newPicture.save()
                .then(response=>{
                    console.log(response);
                    UserModel.findById(decoded.id)
                    .then(user=>{
                        
                        user.album.push(response._id)
                        user.save()
                        .then(responses=>{
                            console.log(user);
                            res.status(200).json({
                                msg:'picture uploaded',
                                data:responses
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
                    res.status(500).json({
                        msg:'upload failed',
                        err : err
                    })
                })
            })
        }
        else{
            res.status(500).json({
                msg:'please log in'
            })
        }
    }
    static getPictures(req,res){
        console.log(req.body.token);
        jwt.verify(req.body.token,process.env.SECRET,(err,decoded)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    msg:'invalid token'
                })
                return;
            }
            PictureModel.find({
                ownersId : decoded.id
            })
            .then(pictures=>{
                res.status(200).json({
                    msg:'list of pictures',
                    pictures : pictures
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    msg:'error @ find pictures',
                    err:err
                })
            })
            
        })
    }
    static getAllPicturesExclUser(req,res){
        jwt.verify(req.body.token,process.env.SECRET,(err,decoded)=>{
            if(err){
                console.log(err);
                return
            }
            PictureModel.find().populate(['ownersId'])
            .then(pictures=>{
                console.log(pictures);
                let browsePictures = []
                pictures.forEach(picture=>{
                    if(picture.ownersId[0]._id != decoded.id){
                        browsePictures.push(picture)
                    }
                })
                console.log(browsePictures);
                res.status(200).json({
                    pictures:browsePictures
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    err:err
                })
            })
            
        })

    }
    
    static addComment(req,res){
        jwt.verify(req.body.token,process.env.SECRET,(err,decoded)=>{
            
        })
    }
    
    static removePicture(req,res){
        PictureModel.findByIdAndRemove(req.params.id)
        .then(result=>{
            res.status(200).json({
                msg:'picture deleted'
            })
        })
        .catch(err=>{
            res.status(500).json({
                err:err
            })
        })
    }
    static addProfilePic(req,res){
        console.log('..............................',req.file.cloudStoragePublicUrl);
        if(req.body.token){
            jwt.verify(req.body.token,process.env.SECRET,(err,decoded)=>{
                if(err){
                    console.log('masuk err');
                    res.status(500).json({
                        msg: 'please provide a valid token'
                    })
                    return;
                }
                
                let newPicture = new PictureModel ({
                    ownersId    : decoded.id,
                    link        : req.file.cloudStoragePublicUrl,
                    caption     : req.body.caption
                })
                console.log(newPicture);
                newPicture.save()
                .then(response=>{
                    console.log(response);
                    UserModel.findById(decoded.id)
                    .then(user=>{
                        console.log("ini user after find by id",user);
                        user.profilePic = response.link
                        user.save()
                        .then(resp=>{
                            console.log(user);
                            res.status(200).json({
                                msg:'profile pic updated',
                                data:resp
                            })
                        })
                        .catch(err=>{
                            console.log('masuk err bawah');
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
}

module.exports = PictureController;