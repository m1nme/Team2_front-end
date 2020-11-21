//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    skeletonLoading:true,
    catList:null
  },

  //事件处理函数
  changeTabs:function(e){
    this.getCatListByAddress(e.detail.activeKey);
   
  },

  getCatListByAddress:function(address){

    var that = this;
    var token = wx.getStorageSync('token') //获取stroage的token
   wx.request({
     method:"POST",
     dataType:"json",
     url: 'https://iminx.cn/api/wxapp/showCatsList/', //仅为示例，并非真实的接口地址
     data: {
       token: token, //带上token
       address:address
     },
     header: {
       'content-type': 'application/json' // 默认值
     },
     success(res) {
      that.setData({skeletonLoading:false})
       console.log("getCatList"+res.data.msg)
       
       that.setData({catList:res.data.data})
      //  that.data.catList=res.data.data
       console.log(that.data.catList)
     },
     fail(){
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
  onReady:function(){
    this.changeTabs
}

})
