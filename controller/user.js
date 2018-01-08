const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



class UserController{
    static createUser(req,res){
        let newUser = new UserModel ({
            email       : req.body.email,
            password    : req.body.password
        })
        
        newUser.save()
        .then(user=>{
            res.status(200).json({
                msg: 'User Created',
                user: user
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                msg: 'Failed to create user',
                err : err
            })
        })
    }
    
    static getUser(req,res){
        UserModel.find()
        .then(users=>{
            res.status(200).json({
                msg: 'list of Users',
                users : users
            })
        })
        .catch(err=>{
            res.status(500).json({
                msg : 'error',
                err : err
            })
        })
    }
    
    static login(req,res){
        UserModel.find({
            email : req.body.email
        })
        .then(user=>{
            bcrypt.compare(req.body.password,user[0].password)
            .then(result=>{
                let payload = {
                    id : user[0]._id,
                    email : user[0].email
                }
                let token = jwt.sign(payload,process.env.SECRET);
                res.status(200).json({
                    msg: 'nih token nya',
                    token : token
                })
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>{
            res.status(500).json({
                msg : 'error',
                err : err
            })
        })
    }
    static addFollowers(req,res){
        jwt.verify(req.body.token,process.env.SECRET,(err,decoded)=>{
            if(err){
                console.log(err);
                return
            }
            UserModel.findById(decoded.id)
            .then(user=>{
                console.log(req.body.userId);
                user.followers.push(req.body.userId)
                console.log(user);
                user.save()
                .then(response=>{
                    res.status(200).json({
                        msg:'follower added',
                        data:response
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
    
    static getUserById(req,res){
        jwt.verify(req.body.token,process.env.SECRET,(err,decoded)=>{
            UserModel.findById(decoded.id).populate(['album','followers'])
            .then(users=>{
                console.log(users);
                res.status(200).json({
                    msg: 'Found User',
                    users : users
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    msg : 'error',
                    err : err
                })
            })
        })

    }
}

module.exports = UserController;