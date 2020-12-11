// pages/mine/mine.js

Page({
  data:{
      userInfo:{}
  },
  onLoad:function(){
    var that = this
    wx.getUserInfo({
      success(res){
        console.log(res)
        that.setData({userInfo:res.userInfo})
      }
    })
  },
  onReady:function(){
    var that = this
    var token = wx.getStorageSync('token')
    wx.request({
      method: "POST",
      dataType: "json",
      url: 'https://iminx.cn/api/wxapp/changeUserInfo/',
      data: {
        token: token, //带上token
        nickName:that.data.userInfo.nickName,
        avatarUrl:that.data.userInfo.avatarUrl
      },
      header: {
        'content-type': 'application/json' // 默认值
      },success(res){
        console.log(res)
      }
    })
  },
   //网络请求
   getUserInfoByuserId:function(){
    var that = this;
    var token = wx.getStorageSync('token') //获取stroage的token

   wx.request({
     method:"POST",
     dataType:"json",
     url: 'https://iminx.cn/api/wxapp/getUserInfo/', 
     data: {
       token: token, //带上token
     },
     header: {
       'content-type': 'application/json' // 默认值
     },
      success (res) {
        console.log("userInfo:"+res.data.msg)
        console.log(token)
        that.setData({
          data:res.data.data
        })
        console.log(res.data.data)
      },
      fail(){
        console.log("网络请求失败")
      }
    })
  },

})
