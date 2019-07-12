// pages/beyond/beyond.js
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'liqiangsheng-7ec8de'
}) 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex :0,//tab的下标
    tabList: ['Beyond', '演唱会记录', '歌曲/专辑奖项', '乐队奖项'],
    dataObj:{},//数据

  },
  tabClick(i){//tab切换
    this.setData({
      tabIndex: i.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('beyond').get().then(res => {
     
      this.setData({
        dataObj:res.data[0].data
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