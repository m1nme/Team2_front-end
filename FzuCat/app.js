//app.js

import { promisifyAll, promisify } from 'miniprogram-api-promise';
const wxp = {}
    // promisify all wx's api
    promisifyAll(wx, wxp)
App({
  globalData: {
    userInfo: 1,
    checkLogin: false
  },
  onLaunch: function () {
    
//     console.log(wxp.getSystemInfoSync())
//     wxp.getSystemInfo().then(console.log)
//     wxp.showModal().then(wxp.openSetting())
    
//     // compatible usage
//     wxp.getSystemInfo({success(res) {console.log(res)}})
    
//     // promisify single api
//     promisify(wx.getSystemInfo)().then(console.log)

// // compatible usage
// wxp.getSystemInfo({success(res) {console.log(res)}})

// // promisify single api
// promisify(wx.getSystemInfo)().then(console.log)
//     (async () => {
//     const p = await new Promise(resolve => {
//         setTimeout(() => resolve("hello async/await"), 1000);
//     });
//     console.log(p);
// })();

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
      // 登录
      wx.login({
        success: res => {
          let that = this
          
          if (res.code) {
            wx.request({
              method: "POST",
              dataType: "json",
              url: 'https://iminx.cn/api/wxapp/login/', //仅为示例，并非真实的接口地址
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log("login"+res.data.data.token)
                that.globalData.checkLogin = true;
                wx.setStorageSync('token', res.data.data.token)
                if (that.checkLoginReadyCallback) {
                  that.checkLoginReadyCallback(res);
                }
              },
              fail() {
                console.log("登录失败")
              }
            })
          }
          else console.log('登录失败' + res.errMsg)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }

              }
            })
          }
        }
      })
    }


  })