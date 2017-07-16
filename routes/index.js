/**
 * app路由配置
 * */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const {responseSuccess, responseError} = require('../utils');
const tokenUtil = require('../utils/tokenUtil');

const test = require('./test');//测试接口
const users = require('./users');//用户接口

module.exports = (app)=> {

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));//静态文件加载public文件夹

    // 跨域处理
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
    // 用路由过滤，处理token
    app.use('/api/*', function (req, res, next) {
        const path = req.originalUrl.split('/');
        const uri = path[path.length-1];
        //非注册、登录需要过滤token
        if(uri != "singUp" && uri != "singIn" && uri != "code"){
            //验证token
            tokenUtil.checkToken(req).then(tokenRes => {
                if (tokenRes.error) {
                    //token 错误
                    responseError(res, tokenRes.message);
                    return;
                }
                next();
            }).catch(err => {
                console.error(err.message)
                throw new Error('server error!');
            });
        }else{
            //不验证token
            next();
        }
    });


    //接口注册
    app.use('/api/test', test);
    app.use('/api/users', users);


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};
