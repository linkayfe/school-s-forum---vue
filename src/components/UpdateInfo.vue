<template>
<div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="myModalLabel" role="dialog" data-backdrop=”static”>
  <div class="modal-dialog row" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" ref="closeUpdateInfoModal" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">修改个人信息</h4>
      </div>
      <div class="modal-body" >
        <form class="form-horizontal">
          <div class="form-group">
            <label for="id" class="col-sm-3 control-label">用户名</label>
            <div class="col-sm-8">
              <input type="text" id="user_name" v-model="this.user.id" class="form-control" readonly="readonly" ref="id"/>
            </div>
          </div>
          <div class="form-group">
            <label for="nickname" class="col-sm-3 control-label">昵称</label>
            <div class="col-sm-8">
              <input type="text" id="nick_name" v-model="updateNickname" class="form-control" name="nickname" ref="nickname"/>
            </div>
          </div>
          <div class="form-group">
            <label for="phone" class="col-sm-3 control-label">手机号</label>
            <div class="col-sm-8">
              <input type="text" id="phone" v-model="this.user.phone" class="form-control" name="phone" ref="phone" readonly="readonly"/>
            </div>
          </div>
          <div class="form-group">
            <button type="button" @click="updateConsumerInfo" class="btn btn-primary col-lg-3 col-sm-offset-4">提交</button>
          </div>
        </form>
      </div>
      <div class="modal-footer">
          <span class="col-sm-8 col-sm-offset-2 spanColor">
            <small>欢迎您使用本论坛，如有问题请反馈，我们将竭尽全力为您解决</small>
          </span>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "UpdateInfo",
  data(){
    return{
      user:{},
      updateNickname: ""
    }
  },
  methods:{
    updateConsumerInfo(){
      let params = new URLSearchParams();
      params.append("id",this.$store.getters.getLogin[0].star);
      params.append("nickname",this.updateNickname);
      this.$http.put("http://localhost:8011/consumer/updateConsumerInfo",params).then((res)=>{
        if (res.data){
          this.$refs.closeUpdateInfoModal.click();
          this.$emit('refreshInfo');
        }else {
          alert("系统繁忙，请稍后重试");
        }
      })
    }
  },
  created() {
    const id = this.$store.getters.getLogin[0].star;
    let _this = this;
    this.$http.get("http://localhost:8011/consumer/getOneById?id="+id).then((res)=>{
      _this.user = res.data;
      _this.updateNickname=res.data.nickname;
    })

  }

}
</script>

<style scoped>
.spanColor{
  color: #999;
}
</style>