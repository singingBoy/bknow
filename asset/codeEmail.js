'use strict'

/**
 * 验证码内容
 * */
module.exports = (code)=>
        `
        <div style="font-size:14px;font-family:Verdana,宋体,Helvetica,sans-serif;line-height:1.66;padding:8px 10px;margin:0;">

            <div style="background-color:#d0d0d0;background-image:url(http://weixin.qq.com/zh_CN/htmledition/images/weixin/letter/mmsgletter_2_bg.png);text-align:center;padding:40px;">
                <div style="width:580px;margin:0 auto;padding:10px;color:#333;background-color:#fff;border:0px solid #aaa;border-radius:5px;-webkit-box-shadow:3px 3px 10px #999;-moz-box-shadow:3px 3px 10px #999;box-shadow:3px 3px 10px #999;font-family:Verdana, sans-serif; ">
                    <div style="height:23px;background:url(http://weixin.qq.com/zh_CN/htmledition/images/weixin/letter/mmsgletter_2_bg_topline.png) repeat-x 0 0;"></div>
                    <div style="text-align:left;padding:30px;font-size:14px;line-height:1.5;">
                        <div>
                            <p>您好!</p>
                            <p>感谢你注册知识共享平台。</p>
                            <p>您的验证码为：<b style="color: crimson">${code}</b></p>
                        </div>
    
                        <div class="" style="padding:40px 0 0;text-align: center;">
                            <img src="http://s9.sinaimg.cn/mw690/002e45ezzy6IZ0vLCyc98&690"
                                 style="width:200px"/>
                            <p>(祝您使用愉快~~~)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `