'use strict'
const nodeMailer = require('nodemailer');

const sender = '737708900@qq.com',
    name = '"知识共享平台✔" <737708900@qq.com>',
    pass = 'nbczstidckoubaie';

const transporter = nodeMailer.createTransport({
    service: 'QQ',
    auth: {
        user: sender,
        pass: pass,
    }
});

/**
 * 邮件内容：
 * to(string),
 * subject(string),
 * text(string),
 * html(string:html)
 * */
const createMail = ({to, subject, text, html})=> ({
    from: name, // sender address
    to, // 收件人（，分隔）
    subject, // 标题
    text, // plain text body
    html,// 内容
});

/**
 * errFun发送失败调用
 * callback发送成功调用
 * */
const sendMail = (mail, errFun, callback)=> transporter.sendMail(mail, function (err, info) {
    if (err) {
        errFun();
        return;
    }
    callback();
});

module.exports = {
    sender,
    pass,
    transporter,
    createMail,
    sendMail,
};