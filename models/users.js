'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;//基本数据类型

//用户结构
const UserSchema = mongoose.Schema({
    //姓名
    name: String,
    //密码
    password: {type : String, require : true},
    //状态
    state: {type : Number, default: 0},
    //创建时间
    createTime: {type : Date, default: new Date()},
    //电话
    phoneNum: {type : String, require : true},
    //邮件
    email: String,
    //个性签名
    description: String,
    //头像、关联文件表
    img: {type: Types.ObjectId, ref: 'files'},
    //登陆令牌
    token: String,
})

//创建用户模型
module.exports = mongoose.model('users', UserSchema);
