// pages/mine/mine.js
const app = getApp()
Page({
  data:{
    userInfo:
    {  
      nickName: "M1N",
      avatarUrl: "https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg"
    } 
  },
   //网络请求
   getUserInfoByuserId:function(){
    var token = wx.getStorageSync('token')
    var that = this;
    wx.request({
      url: 'https://iminx.cn/api/wxapp/getUserInfo/',
      dataType:"json",
      date:{
        token: token,
      },
      method:'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log("userInfo:"+res.data.msg)
        console.log(token)
        console.log(res.data.data)
        that.setData({
          userInfo:res.data.data
        })
      },
      fail(){
        console.log("网络请求失败")
      }
    })
  },
  onload:function(){
    //wx.getUserInfo()
    app.getUserInfo = res =>{
        this.getUserInfoByuserId();
    }
  }

})