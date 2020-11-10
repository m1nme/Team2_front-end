//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    catList:[{"id":"123","picUrl":"1234","records":["11月6日14：30 主食x1","11月6日19：30 鸡肉x1"]}],
    skeletonLoding:true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tap:function(){
    this.data.catList.push({"id":"123","picUrl":"1234","records":["11月6日14：30 主食x1","11月6日19：30 鸡肉x1"]})
    this.data.catList.push({"id":"124","picUrl":"1244","records":["11月6日14：30 主食x1","11月6日19：30 鸡肉x1"]})
    console.log(this.data.catList.length)
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
