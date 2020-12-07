// pages/document/document.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //初始化隐藏模态输入框
  catInfo:null,
  catId:1,
  like:false,
  hiddenmodalinput: true,
  catFeedLog:[],//临时数据示例，应该从getCatFeedLogBycatId获取
  scope:null,
  food:"",
  time:"",
  foodName:"",
  foodAmount:""
},



test:function(){
  console.log("test");
  this.getFeedLogBycatId("1","BRIEF")
},
/**
 * modal框取消函数
 */
modalinput: function () {
this.setData({
  //注意到模态框的取消按钮也是绑定的这个函数，
  //所以这里直接取反hiddenmodalput，也是没有毛病
  hiddenmodalinput: !this.data.hiddenmodalinput
})
},
/**
 * modal框提交函数--用request把喂食信息传到后端
 */
confirm:function(){//提交信息
  var that = this
  var token = wx.getStorageSync('token')
  wx.request({
    url:'https://iminx.cn/api/wxapp/feedCat/', 
    header: { 'Content-Type': 'application/json' },
    data: {
        token:token,
        catId:that.data.catId,
        food:that.data.food,
        time:that.data.time,
        op:1  //int
     },
     method: 'POST',
     success: function (res) {
          console.log(res.data.msg);
          that.setData({
            hiddenmodalinput:!that.data.hiddenmodalinput,
            foodName:"",
            foodAmount:"",
          })
          console.log(that.data.hiddenmodalinput)
     },
     fail(){
        console.log("Fail!")
     },
})
},
/**
 * 
 * 根据catId获取猫猫信息 
 */
getCatInfoBycatId:function(catId){
  var that=this;
  var token=wx.getStorageSync('token')//获取storge的token

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
    console.log("catInfo "+res.data.msg)
    that.setData({catInfo:res.data.data})
    console.log(res.data.data)
  },
  fail(){
    console.log("fail")
  }
})
},
/**
 * 根据猫猫Id获得喂食列表
 */
getFeedLogBycatId:function(catId, op){
  var that=this;
  var token=wx.getStorageSync('token')//获取storge的token

  wx.request({
    method:"POST",
    dataType:"json",
    url: 'https://iminx.cn/api/wxapp/getFeedLog/',
    data:{
      token:token,
      catId:catId,
      op:op //有CAT、BRIEF、USER三种获取方式
    },
    header:{
      'content-type': 'application/json' // 默认值
    },
    success(res){
      console.log("catFeedLog "+ res.data.msg)
      that.setData({catFeedLog:res.data.data})
      console.log(that.data.catFeedLog)
    },
    fail(){
      console.log("获取失败")
    }

  })
},
/**
 * 关注按钮函数--检查是否有关注某一只猫猫，并初始渲染
 */
checkIfLike:function(catId){
  var that=this;
  var token=wx.getStorageSync('token')//获取storge的token

  wx.request({
    method:"POST",
    dataType:"json",
    url: 'https://iminx.cn/api/wxapp/getLikesNum/',
    data:{
      token:token,
      TYPE:"CAT",
      ID: catId
    },
    header:{
      'content-type': 'application/json' // 默认值
    },
    success(res){
      console.log("Like this cat "+ res.data.liked)
      if(res.data.liked == 1)
      {
         that.setData({like:true})
      }
      else if(res.data.msg == 0)
      {
        that.setData({like:false})
      }
      console.log(that.data.like)
    },
    fail(){
      console.log("获取失败")
    }
  })
},

/**
 * 关注按钮函数--点击关注
 */
onCollectionTap:function(){//关注按钮对应的事件函数
  this.setData({
    like:!this.data.like
  })
  if(this.data.like){
    this.confirmLike(this.data.catId)
  }else{
    this.cancelLike(this.data.catId)
  }
  
}, 
confirmLike:function(catId){
  var that = this
  var token = wx.getStorageSync('token')
  wx.request({
    url:'https://iminx.cn/api/wxapp/like/', 
    header: { 'Content-Type': 'application/json' },
    data: {
        token:token,
        TYPE:"CAT",
        ID:catId
     },
     method: 'POST',
     success: function (res) {
          console.log(res.data.msg);
          that.setData({
          })
          console.log("you already liked it")
     },
     fail(){
        console.log("Fail!")
     },
  })
},
cancelLike:function(catId){
  var that = this
  var token = wx.getStorageSync('token')
  wx.request({
    url:'https://iminx.cn/api/wxapp/dislike/', 
    header: { 'Content-Type': 'application/json' },
    data: {
        token:token,
        TYPE:"CAT",
        ID:catId,
     },
     method: 'POST',
     success: function (res) {
          console.log(res.data.msg);
          console.log("you already disliked it")
          that.setData({
          })

     },
     fail(){
        console.log("Fail!")
     },
  })
},
/**
 *  bindIput函数--收集喂食信息，储存在属性中 
 */
getFoodName:function(e){
  var val = e.detail.value;
  this.setData({
    foodName:val
  });
  console.log(this.data.foodName)
},
getFoodAmount:function(e){
  var val = e.detail.value;
  this.setData({
    foodAmount:val
  });
  console.log(this.data.foodAmount)
},
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
     that.data.catId = data.data
     console.log("document")
     console.log(that.data.catId)
    })
  
    that.getCatInfoBycatId(this.data.catId)
    that.getFeedLogBycatId(this.data.catId,"CAT")
    
    this.checkIfLike(1)
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
