<template>
  <div id="backToTop">
    <button v-if="btnFlag" ref="toTopBtn" class="btn btn-default btn-lg" id="back_top" @click="backToTop">
      <span class="glyphicon glyphicon-chevron-up"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  data(){
    return{
      btnFlag:false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },


methods: {
  // 点击图片回到顶部方法，加计时器是为了过渡顺滑
  backToTop() {
    console.log("backToTop");
    const that = this
    let timer = setInterval(() => {
      let ispeed = Math.floor(-that.scrollTop / 5)
      document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
      if (that.scrollTop === 0) {
        clearInterval(timer)
      }
    }, 16)
  },

  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
  scrollToTop() {
    const that = this
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    that.scrollTop = scrollTop
    if (that.scrollTop > 60) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
  }

}
}
</script>

<style scoped>
#backToTop{
  width: 20px;
  position: fixed;
  left: 90%;
  bottom: 20px;
}
</style>