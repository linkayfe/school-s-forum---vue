<template>
  <div id="update-pass">
    <form>
      <div class="form-group">
        <label for="old_pass">旧密码：</label>
        <input type="password" v-model="oldPass" id="old_pass" name="old_pass" value="">
        <span class="span_color" v-if="theOldPass">旧密码错误</span>
      </div>
      <div class="form-group">
        <label for="new_pass">新密码：</label>
        <input type="password" v-model="newPass" ref="new_input" @blur="leave" id="new_pass" name="new_pass" value="">
      </div>
      <div class="form-group">
        <label for="confirm">确认密码：</label>
        <input type="password" v-model="confirm" ref="confirm_input" @blur="leave" id="confirm" value="">
        <span class="span_color" v-if="thePass">两次密码不一致</span>
      </div>
      <div id="btnGroup" class="btn-group" role="group">
        <button type="button" @click="submitUpdatePass" class="btn btn-primary">提交</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#phoneModal">忘记旧密码？</button>
        <UpdatePassByPhone :showPass="this.showPass" :showh4="this.showh4"></UpdatePassByPhone>
      </div>
    </form>
  </div>

</template>

<script>
import md5 from 'js-md5'
import UpdatePassByPhone from "@/components/UpdatePassByPhone";
export default {
  name: "UpdatePass",
  components: {UpdatePassByPhone},
  props:["user"],
  data(){
    return{
      showPass:true,
      showh4:"修改密码",
      oldPass:"",
      newPass:"",
      confirm:"",
      thePass:false,
      theOldPass:false,
      checkOldPass:false
    }
  },
  methods: {
    leave() {
      if (this.newPass !== this.confirm && this.confirm !== "") {
        this.thePass = true
      } else {
        this.thePass = false
      }
    },
    submitUpdatePass() {
      let _this = this;
      const oldPass = md5(this.user.id+this.oldPass);
      if (this.thePass === false) {
        this.$http('http://localhost:8011/consumer/checkPassword', {
          params: {
            id: _this.user.id,
            password: oldPass
          }
        }).then((result) => {
          const newPass = md5(_this.user.id+_this.newPass);
          if (result.data) {
            _this.$http('http://localhost:8011/consumer/updatePasswordByOld', {
              params: {
                id: _this.user.id,
                password: newPass
              }
            }).then((result) => {
              if (result.data)
                alert("修改成功")
              else
                alert("系统繁忙，请稍后重试")
            })
          }
        })
      } else {
        this.theOldPass = true;
      }
    }
  } }

</script>

<style scoped>
#btnGroup{
  margin-left: 50px;
}
.span_color{
  color: red;
}
</style>