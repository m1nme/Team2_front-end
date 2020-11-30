// pages/post/post.js
var util = require('../../utils/util.js')
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({      
      url: 'https://iminx.cn/api/wxapp/getPostsLog/',
      data:{
        token: "3a92bca2ee0899495da3b3ea8698b62d",
      },
      method:'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res) => {
        console.log("网络请求成功",res.data.minePost_list)
        this.setData({
          minePost_list:res.data.minePost_list
        })
      },
      fail:function(err){
        console.log("网络请求失败",err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
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