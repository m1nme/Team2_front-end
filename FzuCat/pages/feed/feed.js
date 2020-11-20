// pages/feed/feed.js
Page({
  data: {

  },
  onLoad:function(){
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getFeedLog/',
      data:{
        "token": "3a92bca2ee0899495da3b3ea8698b62d",
        "op": "USER" 
      },
      
        method:'post',
      
      header: {
        'content-type': 'application/json' // 默认值
     },

      success:function(res){
        console.log("网络请求成功",res)
      },
      fail:function(err){
        console.log("网络请求失败",err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})