'use strict'
var jwt = require('jsonwebtoken');//token机制

const tokenUtil = {
    //token签名
    sign: "wds",

    //token时效:1小时
    expiresIn: '1h',

    //生产token
    createToken: function () {
        return jwt.sign(user, this.sign, { expiresIn: this.expiresIn });
    },

    //解码token
    decodeToken: function () {

    },

    //校验token
    checkToken: function (req) {
        const sign = this.sign;
        return new Promise(function (resolve, reject) {
            //检查头信息token
            const token =  req.headers['token'];
            // 解析 token
            if (token) {
                // 校验token
                jwt.verify(token, sign, function(err, decoded) {
                    if (err) {
                        resolve({ error: true, message: 'token信息错误' });
                    } else {
                        resolve({ error: false,});
                    }
                });
            } else {
                // 没有token
                resolve({ error: true, message: '没有提供token' });
            }
        })
    }
};

module.exports = tokenUtil;