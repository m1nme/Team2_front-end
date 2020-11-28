// pages/post/post.js
Page({
  data: {
    back_bj: "<",
    minePost_list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getPostsLog/',
      data:{
        token: "3a92bca2ee0899495da3b3ea8698b62d"
      },
      method:'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log("网络请求成功",res)
        this.setData({
          minePost_list:res.data. minePost_list
        })
      },
      fail:function(err){
        console.log("网络请求失败",err)
      }
    })
  },


})