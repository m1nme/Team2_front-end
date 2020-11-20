// pages/kepu/kepu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nav:[
        {
          title:"喂养",
          id:0
        },
        {
          title: "疾病",
          id: 1
        },
        {
          title: "撸猫",
          id: 2
        },
        {
          title: "领养",
          id: 3
        }
      ],
      list:[
        {
          id:1,
          text:'大黑勇者愤怒，抽刃向更强者；怯者愤怒，却抽刃向更弱者。不可救药的民族中，一定有许多英雄，专向孩子们瞪眼。这些孱头们',
          type:0
        },
        {
          id: 2,
          text: '大黄',
          type: 1
        },
        {
          id: 3,
          text: '小白',
          type: 2
        },
        {
          id: 4,
          text: '小紫',
          type: 3
        },
      ],
      curNav:0,
      curIndex:0
    },
    navTap(e){
      let id = e.currentTarget.dataset.id;
      console.log(id);
      this.setData({
        curNav: id,
        curIndex:id
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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