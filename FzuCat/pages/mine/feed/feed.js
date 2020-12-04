// pages/feed/feed.js
const app = getApp()
Page({
  data:{
    cat_list:[
      {
        catId:"1",
        food: "猫罐头x200g",
        time: "202011111329",
        op: 1,
        userName: "故渊",
        userUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/0dAfHYgu3XIj2ACwX9IyR4S2rs6hTjPJzeGuNLZQQuRR7wILElvxv8et6VCeE9fpl7GbwdKWSyZic2bEfoRlvow/132"
    },
    ]
  },
  getfeedInfoByuserId:function(op){
    var token = wx.getStorageSync('token')
    var that = this;
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getFeedLog/',
      method:'post',
      dataType:"json",
      data:{
        token: token,
        op: op,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log("feedInfo:"+res.data.msg)
        console.log(token)
        console.log(res.data.data)
        that.setData({
          cat_list:res.data.data
        })
      },
      fail(){
        console.log("网络请求失败")
      }
    })
  },
  onload:function(){
    //wx.getUserInfo()
    app.getfeedInfo = res =>{
        this.getfeedInfoByuserId("USER");
    }
  }
})