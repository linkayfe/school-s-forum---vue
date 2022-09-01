<template>
  <form ref="loginForm" class="form-horizontal">
    <div class="form-group">
      <label for="id" class="col-sm-2 control-label">账号</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="username" id="id" placeholder="学号\手机号">
      </div>
    </div>
    <div class="form-group">
      <label for="password" class="col-sm-2 control-label">密码</label>
      <div class="col-sm-8">
        <input type="password" class="form-control" v-model="password" id="password" placeholder="密码">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="checkbox">
          <label>
            <span v-if="mistake" class="mistake-span">账号或密码有误</span>
          </label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10 row">
        <button type="button" class="col-sm-2 col-sm-offset-1 btn btn-primary"
                @click="submit()">登录</button>
        <button id="resetInput" type="reset" ref="resetInput">重置</button>
        <button type="button" class="col-sm-2 col-sm-offset-2 btn btn-default" data-dismiss="modal" @click="setMistake">关闭</button>
      </div>
    </div>
  </form>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: "Form",
  methods:{
    setMistake(){
      this.mistake = false;
      this.$refs.resetInput.click();
    },
    submit(){
      const _this = this;
      const md5_password = md5(this.username+_this.password);
      this.$http("http://localhost:8011/consumer/login",
          {params:{id:_this.username,password:md5_password}}).then((res)=>{
        if (res.data.success==="true"){
          let id = res.data.user.id;
          _this.$store.commit('setLogin',id);
          _this.$listeners.setNickname();
          _this.mistake = false;
        }else {
          _this.mistake = true;
        }
      })
    },

  },
  data(){
    return{
      username:"",
      password:"",
      mistake:false
    }
  }
}
</script>

<style scoped>
#resetInput{
  display: none;
}
.mistake-span{
  color: red;
}
</style>