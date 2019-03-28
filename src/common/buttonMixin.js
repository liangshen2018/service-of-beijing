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
    showHeight() {
      if (this.docmHeight > this.showHeight) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  mounted () {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        if (!this.isResize) {
          // 默认屏幕高度
          this.docmHeight = document.documentElement.clientHeight
          this.isResize = true
        }
        // 实时屏幕高度
        this.showHeight = document.body.clientHeight
      })()
    }
  }
}
