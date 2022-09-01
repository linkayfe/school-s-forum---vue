<template>
  <!--        model-->
  <div class="modal fade" id="phoneModal" tabindex="-1" aria-labelledby="myModalLabel" role="dialog" data-backdrop=”static”>
    <div class="modal-dialog" role="document">
      <div class="modal-content row">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">{{ showh4 }}</h4>
        </div>
        <div class="modal-body col-sm-8 col-sm-offset-2">
          <form>
            <div class="form-group">
              <label for="phone">手机号：</label>
              <input type="text" id="phone" name="phone" placeholder="手机号码">
            </div>
            <div class="form-group">
              <label for="code">验证码：</label>
              <input type="text" id="code" name="code" placeholder="手机验证码">
              <button class="btn btn-default">获取验证码</button>
            </div>
            <div class="form-group" v-if="showPass">
              <label for="new_pass">新密码：</label>
              <input type="password" id="new_pass" v-model="newPass" @blur="leave" name="new_pass" value="">
            </div>
            <div class="form-group" v-if="showPass">
              <label for="confirm">确认密码：</label>
              <input type="password" id="confirm" v-model="confirm" @blur="leave" name="confirm" value="">
              <span class="span_color" v-if="thePass">两次密码不一致</span>
            </div>
            <button class="btn btn-primary">提交</button>
          </form>
        </div>
        <div class="modal-footer">
          <span class="col-sm-8 col-sm-offset-2 spanColor">
            <small>欢迎您使用本论坛，如有问题请反馈，我们将竭尽全力为您解决</small>
          </span>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script>
export default {
  name: "UpdatePassByPhone",
  props:["showPass","showh4"],
  data(){
    return{
      isShow:true,
      newPass:"",
      confirm:"",
      thePass:false,
      theOldPass:false
    }
  },
  methods:{
    leave(){
      if (this.newPass!==this.confirm && this.confirm!==""){
        this.thePass = true
      }else {
        this.thePass = false
      }
    },
  },

}
</script>

<style scoped>
.spanColor{
  color: #999;
}
</style>