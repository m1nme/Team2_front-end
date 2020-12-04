// pages/index/scope_cat/scope_cat.js

const app = getApp()
Page({
  data: {
    scope: null,
    catList: [],
    eleCatList:[]
  },
  getCatListByAddress: function (address) {
    var that = this;
    var token = wx.getStorageSync('token') //获取stroage的token
    wx.request({
      method: "POST",
      dataType: "json",
      url: 'https://iminx.cn/api/wxapp/showCatsList/', //仅为示例，并非真实的接口地址
      data: {
        token: token, //带上token
        address: address
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({ catList: res.data.data })
      },
      fail() {
        console.log("失败")
      }
    })
  },
  getEleCats: function () {
    var that = this;
    var token = wx.getStorageSync('token') //获取stroage的token
    wx.request({
      method: "POST",
      dataType: "json",
      url: 'https://iminx.cn/api/wxapp/eleMiao/', //仅为示例，并非真实的接口地址
      data: {
        token: token, //带上token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({ eleCatList: res.data.data })
      },
      fail() {
        console.log("失败")
      }
    })
  },
  onLoad: function () {


    //获取常驻猫猫
    console.log("scope")
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });
    // eventChannel.emit('someEvent', { data: 'test' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.data.scope = data.data
      console.log(that.data.scope)
    })
    that.getCatListByAddress(that.data.scope);
    console.log(that.data.catList)

    //获取饿了猫
    that.getEleCats();
    console.log(that.data.eleCatList)
    //获取最新猫帖


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