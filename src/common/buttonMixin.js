export default {
  data () {
    return {
      isShow: true, // 显示或者隐藏button,
      docmHeight: '0', // 默认屏幕高度
      showHeight: '0', // 实时屏幕高度
      isResize: false // 默认屏幕高度是否已获取
    }
  },
  watch: {
    showHeight (val) {
      if (this.docmHeight > val) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  mounted () {
    // window.onresize监听页面高度的变化
    this.docmHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    window.onresize = () => {
      return (() => {
        // 实时屏幕高度
        this.showHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight
      })()
    }
  }
}
