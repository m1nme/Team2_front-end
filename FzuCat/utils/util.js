const formatTime = (time, option) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function uploadImage(){
  var token = wx.getStorageSync('token');
  var _this=this
  wx.chooseImage({
    count: 1,
    sizeType:['ortginal','compressed'],
    sourceType:['album','camera'],
    success:function(res){
      const tempFilePaths = res.tempFilePaths
      console.log(tempFilePaths)
      wx.uploadFile({
        filePath: tempFilePaths[0],
        name: 'image',
        url: 'https://iminx.cn/api/wxapp/uploadImg/',
        method: 'POST',
        formData: {
          'token': token
        },
        success (res){
          console.log(res)
          const data = res.data
          console.log(data)
        }
      })
    }
  })
}

function uploadOneImage(url){
  var that = this;
  var result = null;
  var token = wx.getStorageSync('token');
  wx.uploadFile({
    filePath: url,
    name: 'image',
    url: 'https://iminx.cn/api/wxapp/uploadImg/',
    method: 'POST',
    formData: {
      'token': token
    },
    success (res){
      console.log(res)
      const data = res.data
      console.log(data)
      result = res.data.data;
    }
  })
  return result;
}

function uploadImageList(urlList){
  var that = this;
  var list = [];
  var resultList = [];
  list = urlList;
  var token = wx.getStorageSync('token');
  for(var i=0;i<list.length;i++){
    wx.uploadFile({
      filePath: list[i],
      name: 'image',
      url: 'https://iminx.cn/api/wxapp/uploadImg/',
      method: 'POST',
      formData: {
        'token': token
      },
      success (res){
        console.log(res)
        const data = res.data
        console.log(data)
        resultList.push(res.data.data);
      }
    })
  }
  return  resultList;
}


module.exports = {
  formatTime: formatTime,
  uploadImage: uploadImage,
  uploadImageList:uploadImageList,
  uploadOneImage:uploadOneImage
}  
