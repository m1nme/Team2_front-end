// pages/mine/mine.js
Page({
  data:{
      nickName:'呼啦呼啦',
      avatarUrl:'https://i.loli.net/2020/11/16/Xs7cAktNJKhHemu.jpg',
      readme:'0',  
  },
  onShow(){
    const userinfo=wx-wx.getStorageSync('userinfo');
    this.setData(userinfo)
  },
   //网络请求
  onLoad:function(){
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'https://iminx.cn/api/wxapp/changeUserInfo/',
      data:{
        
        token:token,
        nickName:"故渊",
        avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/0dAfHYgu3XIj2ACwX9IyR4S2rs6hTjPJzeGuNLZQQuRR7wILElvxv8et6VCeE9fpl7GbwdKWSyZic2bEfoRlvow/132"
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