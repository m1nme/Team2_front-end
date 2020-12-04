// pages/myAttention/myAttention.js
const app = getApp()

Page({
  data: {
    my_cat:[
      {
        catId:"1",
        catName: "大橘",
        catUrl:"https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg"
      }
    ]
  },
  getAttentionInfoByuserId:function(){
    var token = wx.getStorageSync('token')
    var that = this;

    wx.request({
      url: 'https://iminx.cn/api/wxapp/showLikesLog/',
      method:'post',
      dataType:"json",
      data:{
        token:token, 
        TYPE:"CAT",
        ID:"2"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log("AttentionInfo:"+res.data.msg)
        console.log(token)
        console.log(res.data.data)
        that.setData({
          my_cat:res.data.data
        })
      },
      fail(){
        console.log("网络请求失败")
      }
    })
  },

  onload:function(){
   // wx.getUserInfo()
    app.getAttentionInfo = res =>{
        this.getAttentionInfoByuserId();
    }
  }
})