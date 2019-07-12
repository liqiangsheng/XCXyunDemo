// pages/index/index.js
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'liqiangsheng-7ec8de'
}) 
// 获取BackgroundAudioManager 实例
 const back = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioList:[],//歌曲列表
    audioIndex:0, // 现在播放的下标
    stopPlay:true,//true播放 false暂停
  },
  goBack(){//上一曲
    let num = this.data.audioIndex-1;
    let that = this;
    if(num<0){
      that.setData({
        audioIndex: that.data.audioList.length-1
      })
    }else{
      that.setData({
        audioIndex: num
      })
    }
    that.audioPlay();
  },
  play() {//播放
    this.setData({
      stopPlay: true
    }) 
    back.play()
  },
  stop() {//暂停
    this.setData({
      stopPlay: false
    }) 
    back.pause();
  },
  goNext() {//下一曲
    let num = this.data.audioIndex+1;
    if (num == this.data.audioList.length) {
      this.setData({
        audioIndex: 0
      })
    } else {
      this.setData({
        audioIndex: num
      })
    }
     this.audioPlay();
  },
  goToBeyond(){ //去乐队资料
    wx.navigateTo({
      url: '../beyond/beyond',
    })
  },
  audioPlay(){
    // 对实例进行设置
    back.src = this.data.audioList[this.data.audioIndex].audioUrl;
    back.title = this.data.audioList[this.data.audioIndex].name;   // 标题为必选项
    back.play();
    back.onEnded(()=>{
      let num = this.data.audioIndex + 1;
      if (num == this.data.audioList.length) {
        this.setData({
          audioIndex: 0
        })
      } else {
        this.setData({
          audioIndex: num
        })
      }
      back.src = this.data.audioList[this.data.audioIndex].audioUrl;
      back.title = this.data.audioList[this.data.audioIndex].name;   // 标题为必选项
      back.play();
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('musicList').get().then(res=>{
      this.setData({
        audioList:res.data[0].lists
      })
 
      this.audioPlay();
    }).catch(err=>{
       wx.showToast({
         title: '网络异常！',
         duration: 2000
       })
    })

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