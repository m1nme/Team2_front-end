// pages/myAttention/myAttention.js
Page({
  data: {
    catName: "大橘",
    catUrl:"https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg"
  },
  onLoad:function(){
    wx.request({
      url: 'https://iminx.cn/api/wxapp/addCat/',
      data:{
        token:"token", 
        catName: "大橘",
        catUrl:"https://iminx-1258939911.cos.ap-chengdu.myqcloud.com/fzucats/20201113230601.jpg"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'post',
      success:function(res){
        console.log("网络请求成功",res)
      },
      fail:function(err){
        console.log("网络请求失败",err)
      }
    })
  }
})