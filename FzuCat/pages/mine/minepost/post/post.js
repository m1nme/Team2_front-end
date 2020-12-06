// pages/post/post.js
var util = require('../../../../utils/util')
const app = getApp()

Page({
  data: {
    postInfo:null,
    title: "有谁知道它最近在哪吗？",
    content: "之前都在35栋楼下车库看到它，不知道现在在哪了,有谁知道它最近在哪吗？",
    urlList: ['https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg', 'https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg', 'https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg'],
    userName: "故渊",
    userUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/0dAfHYgu3XIj2ACwX9IyR4S2rs6hTjPJzeGuNLZQQuRR7wILElvxv8et6VCeE9fpl7GbwdKWSyZic2bEfoRlvow/132",
    catId: 1,
    time: "2020-11-22T14:48:56.316Z",
    postId: 2
  },

  getPostInfoByuserId: function (postId) {
    var token = wx.getStorageSync('token')
    var that = this;
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getPostInfo/',
      method:'post',
      dataType:"json",
      data:{
        token: token,
        postId: postId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log("postInfo "+res.data.msg)
        console.log(token)
        console.log(res.data.data)
        that.setData({postInfo:res.data.data})
      },
      fail(){
        console.log("网络请求失败")
      }
    })
  },
  
  onload:function(){
    //wx.getfeedInfo()
    app.getfeedInfo = res =>{
        this.getfeedInfoByuserId("USER");
    }
  },

  onShow: function () {
    this.data.time.forEach((item) => {
      item = until.formatTime(item)
      item.flag = false
    })
    this.setData({
      time: this.data.time
    })
  },
  onShow: function () {
    this.data.minePost_list.forEach((item) => {
      item.time = util.formatTime(item.time)
      item.flag = false
    })
    this.setData({
      minePost_list: this.data.minePost_list
    })
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