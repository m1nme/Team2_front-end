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
  gotoDocument:function(e){
    wx.navigateTo({
      url: '../document/document',
      success: function (res) {
        console.log(e)
        // 通过eventChannel向被打开页面传送数据
        let catId = e.target.dataset.catid;
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: catId })
      }
    })
  },
  addNewCat:function(){
    var that = this;
    wx.navigateTo({
      url: 'addNewCat/addNewCat',
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
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        //此处为获取微信信息后的业务方法
      
      },
      fail: function () {
       //获取用户信息失败后。请跳转授权页面
       wx.showModal({
        title: '警告',
        content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
        success: function (res) {
         if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
           url: '../tologin/tologin',
          })
         }
        }
       })
      }
     })
    app.checkLoginReadyCallback = res => {
      this.getCatListByAddress("一区")
    }
  }

})