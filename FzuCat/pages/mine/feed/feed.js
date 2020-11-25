// pages/feed/feed.js
Page({
  data: {
    cat_list:[]
  },
  onLoad:function(){
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getFeedLog/',
      method:'post',
      data:{
        token: "3a92bca2ee0899495da3b3ea8698b62d",
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