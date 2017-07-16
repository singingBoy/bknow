'use strict';

/**
 * resFul 错误返回统一处理规则
 * {状态(成功0、失败1)、数据/错误消息}
 * */
function responseError(res, message) {
    res.json({
        status: 1,
        message
    });
}

function responseSuccess(res, data ) {
    res.json({
        status: 0,
        data
    });
}

module.exports = {
    responseError,
    responseSuccess,
};