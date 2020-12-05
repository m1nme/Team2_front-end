// pages/mine/mine.js
const app = getApp()

Page({
  data:{
      nickName: "M1N",
      avatarUrl: "https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg"
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

  onload:function(){
    wx.getUserInfo()
    app.getUserInfoB = res =>{
        this.getUserInfoByuserId();
    }
  },

})
