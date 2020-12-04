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
          'token': 'your_token'
        },
        success (res){
          const data = res.data
          console.log(data)
        }
      })
    }
  })
}


module.exports = {
  formatTime: formatTime,
  uploadImage: uploadImage
}  
