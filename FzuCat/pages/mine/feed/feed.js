// pages/feed/feed.js
Page({
  data: {
    cat_list:[
      {
        catId:"1",
        food: "猫罐头x200g",
        time: "202011111329",
        op: 1,
        userName: "故渊",
        userUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/0dAfHYgu3XIj2ACwX9IyR4S2rs6hTjPJzeGuNLZQQuRR7wILElvxv8et6VCeE9fpl7GbwdKWSyZic2bEfoRlvow/132"
    }
    ]
  },
  onLoad:function(){
    var token = wx.getStorageSync('token')
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getFeedLog/',
      method:'post',
      dataType:"json",
      data:{
        token: token,
        op: "USER",
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res) => {
        console.log("网络请求成功",res.data.cat_list)
        this.setData({
          cat_list:res.data.cat_list
        })
      },
      fail:function(err){
        console.log("网络请求失败",err)
      }
    })
  },


})