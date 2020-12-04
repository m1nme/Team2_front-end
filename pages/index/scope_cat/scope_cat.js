// pages/index/scope_cat/scope_cat.js

const app = getApp()
Page({
  data: {
    scope: null,
    catList: [],
    eleCatList:[],
    latestPosts:[]
  },
  getCatListByAddress: function (address) {
    console.log("this   "+this.address)
    console.log("test")
    var that = this;
    var token = wx.getStorageSync('token') //获取stroage的token
    wx.request({
      method: "POST",
      dataType: "json",
      url: 'https://iminx.cn/api/wxapp/showCatsList/',
      data: {
        token: token, //带上token
        address: address
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({ catList: res.data.data })
        console.log(res)
        console.log(res.data.data+"12313221") 
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
      url: 'https://iminx.cn/api/wxapp/eleMiao/', 
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
  getLatestPosts:function(){
    var that = this;
    var token = wx.getStorageSync('token') //获取stroage的token
    wx.request({
      method: "POST",
      dataType: "json",
      url: 'https://iminx.cn/api/wxapp/latestPosts/',
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
  gotoDocument:function(e){
    wx.navigateTo({
      url: '../../document/document',
      success: function (res) {
        console.log(e)
        // 通过eventChannel向被打开页面传送数据
        let catId = e.target.dataset.catid;

        res.eventChannel.emit('acceptDataFromOpenerPage', { data: catId })
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
      that.setData({scope:data.data})
      console.log(that.data.scope)
      that.getCatListByAddress(that.data.scope);
    })
  

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