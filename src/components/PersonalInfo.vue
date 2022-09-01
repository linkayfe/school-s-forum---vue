<template>
  <div id="info" class="jumbotron div-jumbo">
      <h2>
        <img src="../assets/logo.png"/>
        <button class="btn btn-default">更换头像</button>
        <button class="btn btn-info" data-toggle="modal" data-target="#infoModal">修改信息</button>
      </h2>
    <UpdateInfo @refreshInfo="refreshInfo"></UpdateInfo>
    <ul class="list-group">
        <li class="list-group-item">用户名：{{ user.id }}</li>
        <li class="list-group-item">昵称：{{ user.nickname }}</li>
        <li class="list-group-item">手机：{{ user.phone }}</li>
      </ul>
  </div>
</template>

<script>
import UpdateInfo from "@/components/UpdateInfo";
export default {
  name: "PersonalInfo",
  components: {UpdateInfo},
  props:['user'],
  data(){
    return{
      theUser:this.user,
      id: this.user.id,
      nickname:this.user.nickname,
      phone:this.user.phone
    }
  },
  methods:{
    refreshInfo(){
      this.$router.go(0);
    }
  },
  created() {
   // this.theUser = this.user
  }

}
</script>

<style scoped>
#info{
  margin-left: 30px;
  width: 100%;
  height: auto;
}
img{
  width: 100px;
  height: 100px;
}
</style>