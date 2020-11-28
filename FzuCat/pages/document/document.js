// pages/document/document.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //初始化隐藏模态输入框
  catInfo:null,
  collected:true,
  hiddenmodalput: true,
  catImageUrl:"/resource/image/2.jpg",
  color:"",
  sex:"",
  status:"",
  char:""

},
modalinput: function () {
this.setData({
  //注意到模态框的取消按钮也是绑定的这个函数，
  //所以这里直接取反hiddenmodalput，也是没有毛病
  hiddenmodalput: !this.data.hiddenmodalput
})
},
test:function(){
  console.log("test");
},
confirm:function(){//提交信息

this.setData({
  hiddenmodalput: !this.data.hiddenmodalput
})
},

getCatInfoBycatId:function(catId){
  var that=this;
  var token=wx.getStorageInfoSync('token')//获取storge的token

wx.request({
  method:"POST",
  dataType:"json",
  url: 'https://iminx.cn/api/wxapp/getCatInfo/',
  data:{
    token:token,
    catId:catId
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res){
    
    console.log("catInfo"+res.data.msg)
    that.setData({catInfo:res.data.data})
    console.log(that.data.catInfo)
  },
  fail(){
    console.log("fail")
  }
})
},
  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function () {
  wx.getUserInfo() 
  res => this.getCatInfoBycatId("1")
  this.test()
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
