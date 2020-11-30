//index.js

const util = require("../../utils/util");

//获取应用实例
const app = getApp()

Page({
  data: {
    skeletonLoading: true,
    catList: {}
  },

  //事件处理函数
  changeTabs: function (e) {
    this.getCatListByAddress(e.detail.activeKey);
  },

  gotoScope: function (e) {
    console.log(e);
    wx.navigateTo({
      url: 'scope_cat/scope_cat',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        let scope = e.target.dataset.scope;
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: scope })
      }
    })
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
        that.setData({ skeletonLoading: false })
        console.log(res.data.data);
        var temp = that.data.catList;
        temp[address] = res.data.data;
        that.setData({ catList: temp })
      },
      fail() {
        console.log("失败")
      }
    })
  },


  onLoad: function () {
    //授权登录
    wx.getUserInfo()
    app.checkLoginReadyCallback = res => {
      this.getCatListByAddress("一区")
    }
  },
  onReady: function () {
    this.changeTabs
  }

})