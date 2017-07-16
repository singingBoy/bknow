'use strict';
const mongoose  = require('mongoose');

//mongodb连接地址
const host = 'mongodb://@localhost:27017/kb';

//连接mongodb
const connectDb = ()=> {
    //连接mongodb数据库
    mongoose.connect(host);
    // 实例化连接对象
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:数据库连接失败!'));
    db.once('open', function() {
        console.log('mongodb连接成功！')
    });
}

module.exports = connectDb;