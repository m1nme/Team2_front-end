//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    catList:[{"id":"123","picUrl":"1234","records":["11月6日14：30 主食x1","11月6日19：30 鸡肉x1"]}],
    skeletonLoding:true,
  },

  //事件处理函数

  onLoad: function () {

    //授权登录
    wx.getUserInfo()
    
  },
  tap:function(){
    this.data.catList.push({"id":"123","picUrl":"1234","records":["11月6日14：30 主食x1","11月6日19：30 鸡肉x1"]})
    this.data.catList.push({"id":"124","picUrl":"1244","records":["11月6日14：30 主食x1","11月6日19：30 鸡肉x1"]})
    console.log(this.data.catList.length)
  },

  
  getCatListByAddress:function(){
     var token = wx.getStorageSync('token') //获取stroage的token
    console.log(token);
    wx.request({
      method:"POST",
      dataType:"json",
      url: 'https://iminx.cn/api/wxapp/showCatsList/', //仅为示例，并非真实的接口地址
      data: {
        token: token, //带上token
        address:"ALL"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.msg)
      },
      fail(){
        console.log("失败")
      }
    })
  }

})
