const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const {responseSuccess, responseError} = require('../utils');
const jwt = require('jsonwebtoken');//token机制
const User = require('../models/users');// 引入模型
const tokenUtil = require('../utils/tokenUtil');
const Mailer = require('../utils/emailUtil');
const codeMail = require('../asset/codeEmail');

/**
 *  GET users
 *  获取用户列表
 *  */
router.get('/', function (req, res, next) {
    const query = {};
    if (req.query.password) {
        query['password'] = new RegExp(req.query.password);//模糊查询参数
    }
    if (req.query.name) {
        query['name'] = new RegExp(req.query.name);
    }
    if (req.query.phoneNum) {
        query['phoneNum'] = new RegExp(req.query.phoneNum);
    }
    User.find(query, (err, user)=> {
        if (err) {
            responseError(res, "服务器出错")
        } else {
            responseSuccess(res, user);
        }
    })
});

/**
 *  GET code
 *  获取验证码
 *  */
router.post('/code', function (req, res, next) {
    const {to, code} = req.body;
    const mail = {
        to,
        subject: "知识共享库验证码", // 标题
        text: "验证码", // plain text body
        html: codeMail(code),// 内容
    };
    Mailer.sendMail(
        Mailer.createMail(mail),
        ()=> responseError(res, "验证码发送失败"),
        ()=> responseSuccess(res, {message:"验证码发送成功", code})
    );
});

/*
 * 用户注册
 * 注册方式：电话+密码
 * */
router.post('/singUp', function (req, res, next) {
    const {phoneNum, password} = req.body;

    User.findOne({phoneNum}, (err, user) => {
        if (err) {
            responseError(res, err.message);
        } else {
            if (user) {
                responseError(res, '用户已经存在！');
            } else {
                //注册成功：创建token、保存用户基本信息
                let user = new User();
                user = Object.assign(user, req.body);
                user.save((err, user) => {
                    if (err) {
                        responseError(res, err.message);
                    } else {
                        // user.token = jwt.sign(user, user.get('_id').toString(), { expiresIn: tokenConfig.expiresIn });
                        user.save(function (err, user) {
                            responseSuccess(res, user);
                        });
                    }
                });

            }
        }
    })
});

/*
 * 用户登录
 * */
router.post('/singIn', function (req, res, next) {
    const {phoneNum, password} = req.body;

    User.findOne({phoneNum}, (err, user) => {
        if (err) {
            responseError(res, err.message);
        } else {
            if (user.password === password) {
                user.token = jwt.sign(user, tokenUtil.sign, {expiresIn: tokenUtil.expiresIn});
                user.save(function (err, user) {
                    responseSuccess(res, user);
                });
            } else {
                responseError(res, "帐号或密码错误")
            }
        }
    })
});

/**
 * 用户删除
 * */
router.delete('/', function (req, res, next) {
    const query = {};
    if (req.query._id) {
        query['_id'] = ObjectId(req.query._id);
    }
    if (req.query.phoneNum) {
        query['phoneNum'] = new RegExp(req.query.phoneNum);
    }
    User.findOneAndRemove(query, (err)=>{
        if(err){
            responseError(res, err.message);
            return
        }
        responseSuccess(res, {message:"删除成功"});
    })

});

/**
 * 用户修改
 * */
router.post('/update', function (req, res, next) {
    const query = {_id: ObjectId(req.body._id)}
    User.findOne(query, (err, user) => {
        if(err){
            responseError(res, err.message);
            return
        }else{
            if(user){
                user = Object.assign(user, req.body);
                User.update(query, user, function (err, data) {
                    if(err){
                        responseError(res, err.message);
                        return
                    }
                    responseSuccess(res, user)
                })
            }else{
                responseError(res, "用户不存在");
            }
        }
    });

});

module.exports = router;
