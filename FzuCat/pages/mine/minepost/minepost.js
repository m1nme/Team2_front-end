// pages/post/post.js
Page({
  data: {
    back_bj: "<",
    minePost_list:[
      { 
        postId: 2,
        title: "这里是帖子测试标题",
        time: "2020-11-22T14:48:56.316Z",
        status: 1
      }
    ]
  },
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getPostsLog/',
      method:'post',
      dataType:"json",

      data:{
        token: token
      },

      header: {
        'content-type': 'application/json' // 默认值
      },

      success: (res) => {
        console.log("网络请求成功",res.data.minePost_list)
        this.setData({
          minePost_list:res.data.minePost_list
        })
      },
      fail:function(err){
        console.log("网络请求失败",err)
      }
    })
  },


})