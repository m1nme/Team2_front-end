Page({
  data: {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
  },
  onLoad: function() {

      var that = this;
      wx.getSystemInfo({
        success: function (res) {
         let clientHeight = res.windowHeight,
         clientWidth = res.windowWidth,
         rpxR = 750 / clientWidth;
         var calc = clientHeight * rpxR;
         console.log(calc)
         that.setData({    
             windowHeight: calc
         });
        }
     });
      /**
       * 获取当前设备的宽高
       */
      wx.getSystemInfo( {

          success: function( res ) {
              that.setData( {
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }

      });
  },
    
//  tab切换逻辑
  swichNav: function( e ) {

      var that = this;

      if( this.data.currentTab === e.target.dataset.current ) {
          return false;
      } else {
          that.setData( {
              currentTab: e.target.dataset.current
          })
      }
  },

  bindChange: function( e ) {

      var that = this;
      that.setData( { currentTab: e.detail.current });

  },
})