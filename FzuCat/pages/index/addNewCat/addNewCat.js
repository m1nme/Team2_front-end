// pages/index/addNewCat/addNewCat.js
const app = getApp()
import { promisifyAll, promisify } from 'miniprogram-api-promise';
import util from '../../../utils/util';
const wxp = {}
    // promisify all wx's api
    promisifyAll(wx, wxp)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content:false,
    catAvatar:null,
    catUrl:[],
    student: {
      name: '',
      age: '',
      address: ''
    },
  },
  confirm:function(){
    console.log(1);
    wx.lin.submitForm('info');
    console.log(2);
  },
  catHead:function(event){
      this.setData({catAvatar:event.detail.current[0].url})
  },
  catPic:function(event){
      var urlList = [];

      for(var i=0;i<event.detail.all.length;i++){
         urlList.push(event.detail.current[i].url)
      }
      this.setData({catUrl:urlList})
  },
  showSuccsessMessage(){
    wx.lin.showMessage({
      type:'success',
      content:'创建成功'
  })
},
showFailMessage(){
  wx.lin.showMessage({
    type:'error',
    content:'创建失败'
})
},
async submit(event){
    var that = this;
    const {detail} = event;
    console.log(detail)

    //验证

    var token = wx.getStorageSync('token')  //获取stroage的token
    var headurl = await util.uploadOneImage(that.data.catAvatar)
    

    var token = wx.getStorageSync('token');
  
    var list = that.data.catUrl
    var requestList = []
    for (var i = 0; i < list.length; i++) {
     const p = await util.uploadOneImage(list[i])
    requestList.push(p)
    }
    var final_list = []
    await Promise.all(requestList).then((res)=>{final_list=res})


    console.log(headurl)
      wx.request({
        method: "POST",
        dataType: "json",
        url: 'https://iminx.cn/api/wxapp/addCat/', //仅为示例，并非真实的接口地址
        data: {
          token: token, //带上token
          catName:detail.values.catName,
          catColor:detail.values.catColor,
          catCharacter:detail.values.catCharacter,
          catSex:detail.values.catSex,
          catStatus:detail.values.catStatus,
          catAddress:detail.values.catAddress,
          catUrl: headurl,
          urlList:final_list
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          console.log("成功")
          that.showSuccsessMessage();
        },
        fail() {
          that.showFailMessage();
          console.log("失败")
        }
      })


    
    /*
      detail 返回三个参数
      1、values: 各表单项的value值
      2、errors: 各表单项验证后的返回的错误信息数组
      3、isValidate: 表单是否验证通过的boolean值
      具体格式示例：
      detail = {
         values: {
             studentName: "",
             studentAge: "",
             studentAddress: ""
         },
         errors: {
             studentName: [],
             studentAge: [],
             studentAddress: []
         },
         isValidate: true
      }
    */
  },
  onLoad: function (options) {
    wx.lin.initValidateForm(this)
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