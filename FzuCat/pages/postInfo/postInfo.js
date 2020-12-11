var util = require('../../utils/util')
const app = getApp()

Page({
  data: {
    urls:[],
    // urls:["https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/2020121102270064.jpg", "https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/2020121102270121.jpg", "https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/202012110227024.jpg"],
    postInfo:null,
    postId: null,
    comment:[]
  },
  getCommentByPostId:function(){
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: 'https://iminx.cn/api/wxapp/showComments/',
      method:'post',
      dataType:"json",
      data:{
        token:token,
        postId:that.data.postId
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success(res){
        that.setData({comment:res.data.data})
      }
    })
  },

  getPostInfoByPostId: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getPostInfo/',
      method:'post',
      dataType:"json",
      data:{
        token: token,
        postId: that.data.postId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log("postInfo "+res.data.msg)
        console.log(token)
        console.log(res.data.data)
        that.setData({postInfo:res.data.data})

        var _temp = JSON.stringify(res.data.data.urlList).substring(1,res.data.data.urlList.length+1).replace(/\'/g,'"');

        console.log(_temp)

        var data = JSON.parse(_temp)
        console.log(data)
        
        var urlList = []

        for(var i =0;i<data.length;i++){
          urlList.push(data[i])
        }
        // urlList = res.data.data.urlList
        console.log(urlList)
        var obj = [];
        for(var i=0;i<urlList.length;i++){
          // var json = {};
          // json["newUrl"]=urlList[i]
          // json["key"] = i
          // obj.push(json)
          obj.push(urlList[i])
        }
        that.setData({urls:obj})
        console.log(that.data.urls)
        that.onShow();
      
      },
      fail(){
        console.log("网络请求失败")
      }
    })
    console.log(that.data.urls)
  },
  test:function(){
    console.log(this.data.urls)
  },

  onLoad:function(){
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
      that.setData({postId:data.data})
      console.log("postList")
      console.log(that.data.postId)
    })
    //wx.getUserInfo()
    that.getPostInfoByPostId();
    that.getCommentByPostId();
  },
  PreviewImg: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    //console.log(that.data.tempFilePaths[index]);
    //console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.urlList[index],
      urls: that.data.urlList,
    })
  }
})