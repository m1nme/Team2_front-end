import { promisifyAll, promisify } from 'miniprogram-api-promise';
const wxp = {}
    // promisify all wx's api
    promisifyAll(wx, wxp)

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

function uploadImage() {
  var token = wx.getStorageSync('token');
  var _this = this
  wx.chooseImage({
    count: 1,
    sizeType: ['ortginal', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
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
        success(res) {
          console.log(res)
          const data = res.data
          console.log(data)
        }
      })
    }
  })
}
function uploadOneImage(url) {
  return new Promise(function (resolve, reject) {
    var that = this;
    var result = null;
    var token = wx.getStorageSync('token');
    wxp.uploadFile({
      filePath: url,
      name: 'image',
      url: 'https://iminx.cn/api/wxapp/uploadImg/',
      method: 'POST',
      formData: {
        'token': token
      }
    }).then(res=>{
      var a = JSON.parse(res.data)
      result = a.data.url;
      console.log(result)
      resolve(result)
    }).catch(err=>{
      console.log(err)
      reject(err)
    })
  })
}

 async function uploadImageList(urlList) {
  
  var that = this;
  var list = [];
  list = urlList;
  console.log(list.length+"++++")
  var token = wx.getStorageSync('token');

  var requestList = []
  for (var i = 0; i < list.length; i++) {
   const p = await that.uploadOneImage(list[i])
  requestList.push(p)
  }
  var final_list = []
  await Promise.all(requestList).then((res)=>{final_list=res


})

}


module.exports = {
  formatTime: formatTime,
  uploadImage: uploadImage,
  uploadImageList: uploadImageList,
  uploadOneImage: uploadOneImage
}  
