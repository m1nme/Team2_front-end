// pages/mine/mine.js
Page({
  data:{
    userinfo:
    {  
      nickName: "M1N",
      avatarUrl: "https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg"
    } 
  },
  onShow(){
    const userinfo=wx-wx.getStorageSync('userinfo');
    this.setData(userinfo)
  },
   //网络请求
  onLoad:function(){
    wx.request({
      url: 'https://iminx.cn/api/wxapp/getUserInfo/',
      date:{
        token: "3a92bca2ee0899495da3b3ea8698b62d"
      },
      method:'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res) => {
        console.log("网络请求成功",res.data.userinfo)
        this.setData({
          userinfo:res.data.userinfo
        })
      },
      fail:function(err){
        console.log("网络请求失败",err)
      }
    })
  }
})