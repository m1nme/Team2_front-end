
import { promisifyAll, promisify } from 'miniprogram-api-promise';

var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    catId: null,
    postList: [],
    catUrl: [],
    title: null,
    content: null,
    addPostDialog: false
  },
  addNewPost: function () {
    var token = wx.getStorageSync('token')
    var that = this;

  },

  showSuccsessMessage() {
    wx.lin.showMessage({
      type: 'success',
      content: '创建成功'
    })
  },
  showFailMessage() {
    wx.lin.showMessage({
      type: 'error',
      content: '创建失败'
    })
  },
  catPic: function (event) {
    var urlList = [];
    console.log(event)
    for (var i = 0; i < event.detail.all.length; i++) {
      urlList.push(event.detail.all[i].url)
    }
    this.setData({ catUrl: urlList })
  },
  getPostInfoByCatId: function () {
    var token = wx.getStorageSync('token')
    var that = this;
    wx.request({
      url: 'https://iminx.cn/api/wxapp/showPostsByCat/',
      data: {
        token: token,
        catId: that.data.catId
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("postList:" + res.data.msg)
        console.log(res.data.data)
        that.setData({
          postList: res.data.data
        })
      },
      fail() {
        console.log("网络请求失败")
      }
    })
  },
  title: function (e) {
    this.setData({title:e.detail.value})
  },
  content:function(e){
    this.setData({content:e.detail.value})
  },
  addNewPost: function () {
    this.setData({ addPostDialog: true })
  },
  showSuccsessMessage(){
    wx.lin.showMessage({
      type:'success',
      content:'创建成功，等待管理员审核'
  })
},
  showFailMessage(){
    wx.lin.showMessage({
      type:'error',
      content:'创建失败'
  })
  },
 addPostDialog: async function(){
    var token = wx.getStorageSync('token')
    var that = this 
    console.log(that.data)

    //同步批量上传图片
    var list = that.data.catUrl
    var requestList = []
    for (var i = 0; i < list.length; i++) {
     const p = await util.uploadOneImage(list[i])
    requestList.push(p)
    }
    var final_list = []
    await Promise.all(requestList).then((res)=>{final_list=res})

    wx.request({
      url: 'https://iminx.cn/api/wxapp/publishPost/',
      data: {
        token: token,
        catId: that.data.catId,
        title:that.data.title,
        content:that.data.content,
        urlList:final_list
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("postList:" + res.data.msg)
        console.log(res.data.data)
        that.showSuccsessMessage();
      },
      fail() {
        that.showFailMessage();
        console.log("网络请求失败")
      }
    })
  },
  gotoPostInfo:function(e){
    console.log("gotoPostInfo")
    var that = this
    wx.navigateTo({
      url: '../postInfo/postInfo',
      success: function (res) {
       
        // 通过eventChannel向被打开页面传送数据
        console.log("sent to document"+e.currentTarget.dataset.postid)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.currentTarget.dataset.postid })
      }
    })
  },
  onLoad: function () {

    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
      that.setData({catId:data.data})
      console.log("postList")
      console.log(that.data.catId)
    })
    //wx.getUserInfo()
    that.getPostInfoByCatId();
  },
  onPullDownRefresh:function()
  {
    this.onLoad()
    //模拟加载
      wx.stopPullDownRefresh() //停止下拉刷新 
  },

})