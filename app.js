const express = require('express');
const path = require('path');
const routerConfig = require('./routes/index');//路由配置
const connectDb = require('./dataBase/dbConfig');//连接mongodb

const app = express();
connectDb();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

routerConfig(app);

module.exports = app;
