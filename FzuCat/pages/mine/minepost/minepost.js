
//ar util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    minePost_list:[
      {
        "postId": 2,
        "title": "这里是帖子测试标题",
        "time": "2020-11-22T14:48:56.316Z",
        "status": 1
    },
    {
        "postId": 3,
        "title": "这里是帖子测试标题",
        "time": "2020-11-22T14:48:57.386Z",
        "status": 0
    },
    {
        "postId": 4,
        "title": "这里是帖子测试标题",
        "time": "2020-11-22T14:48:58.132Z",
        "status": 0
    },
    {
        "postId": 5,
        "title": "这里是帖子测试标题",
        "time": "2020-11-22T14:48:58.784Z",
        "status": 0
    }
    ]
  },

  getPostInfoByuserId: function () {
    var token = wx.getStorageSync('token')
    var that = this;
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/showPostsLog/',
      data:{
        token: token,
      },
      method:'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log("postInfo:"+res.data.msg)
        console.log(token)
        console.log(res.data.data)
        that.setData({
          minePost_list:res.data.data
        })
      },
      fail(){
        console.log("网络请求失败")
      }
    })
  },
  onload:function(){
    //wx.getUserInfo()
    app.getPostInfo = res =>{
        this.getPostInfoByuserId();
    }
  },

  onShow: function () {
    this.data.minePost_list.forEach((item) => {
      item.time = util.formatTime(item.time)
      item.flag = false
    })
    this.setData({
      minePost_list: this.data.minePost_list
    })
  }
})