<template>
<!--  使用了bootstrap 中的 模态框-->
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" role="dialog" data-backdrop=”static”>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" ref="closeBtn" @click="resetInput" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">登录</h4>
        </div>
        <div class="modal-body">
<!--          <back-to-top></back-to-top>-->
          <Form ref="form" @setNickname="setNickname"></Form>
        </div>
        <div class="modal-footer">
<!--          col-xx-9 占用9个格子  col-xx-offset-2 移动2个格子-->
          <span class="col-sm-8 col-sm-offset-2 spanColor">
            <small>欢迎您使用本论坛，如有问题请反馈，我们将竭尽全力为您解决</small>
          </span>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script>
import Form from "@/components/Form";

export default {
  name: "Login",
  data(){
    return{
      i:0
    }
  },
  components:{
    Form
  },
  methods:{
    setNickname(){
      this.closeTheModal();
      this.$emit("setNickname");
    },
    resetInput(){
      this.$refs.form.setMistake();
    },
    closeTheModal(){
      // 在标签上添加ref="xx"，可以通过this.$refs.xx获取这个标签
      this.$refs.closeBtn.click();
    }
  }
}
</script>

<style scoped>
.spanColor{
  color: #999;

}
</style>