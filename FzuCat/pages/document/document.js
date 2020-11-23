// pages/document/document.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //初始化隐藏模态输入框
  collected:true,
  hiddenmodalput: true,
  color:"",
  sex:"",
  status:"",
  char:"",
  catImageUrl:"/resource/image/2.jpg",
  "followImage":"https://i.loli.net/2020/11/20/NZioqyA3jWU2Ca9.png",
  "followedImage":"https://i.loli.net/2020/11/20/3Y9OGhH8LNxjJpn.png",
  "nofollowImage":"https://i.loli.net/2020/11/20/NZioqyA3jWU2Ca9.png"
},
modalinput: function () {
this.setData({
  //注意到模态框的取消按钮也是绑定的这个函数，
  //所以这里直接取反hiddenmodalput，也是没有毛病
  hiddenmodalput: !this.data.hiddenmodalput
})
},

confirm:function(){//提交信息

this.setData({
  hiddenmodalput: !this.data.hiddenmodalput
})
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

},

onCollectionTap:function(){//收藏按钮对应的事件函数
  this.setData({
    collected:!this.data.collected
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
