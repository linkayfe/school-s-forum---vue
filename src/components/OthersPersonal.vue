<template>
  <div class="container">
    <Title></Title>
    <div class="page-header">
      <h3>个人信息</h3>
    </div>
    <div class="media">
      <div class="media-left media-top">
        <img src="../assets/logo.png" alt="头像">
      </div>
      <div class="media-body">
        <ul class="list-group">
          <li class="list-group-item">编号：{{ user.id }}</li>
          <li class="list-group-item">昵称：{{ user.nickname }}</li>
          <li class="list-group-item">手机号码：{{ user.phone }}</li>
          <li class="list-group-item">{{ power }}{{ powerLocation }}</li>
        </ul>
      </div>
    </div>
    <div class="page-header">
      <h3>kayfe的帖子</h3>
    </div>
    <simple-post ref="simplePost" :user="this.user" :showAuthor="showAuthor"></simple-post>
    <back-to-top></back-to-top>
  </div>
</template>

<script>
import Title from "@/components/Title";
import SimplePost from "@/components/SimplePost";
import BackToTop from "@/components/BackToTop";
export default {
  name: "OtherPersonal",
  data(){
    return{
      showAuthor:false,
      otherId:this.$route.params.id,
      power:"",
      powerLocation:"",
      user:{}
    }
  },
  methods:{
  },
  components: {BackToTop, SimplePost, Title},
  created() {
    console.log("id="+this.$route.params)
    let _this = this;
    this.$http.get("http://localhost:8011/consumer/getOneById?id="+_this.otherId).then((res)=>{
      _this.user = res.data;
      if (_this.user.power===3){
        _this.power = "超级管理员";
      }else if (_this.user.power===2){
        this.power = "版主：";
        let that = this;
        this.$http.get("http://localhost:8011/plates/getPlateById",{params:{id: that.otherId}}).then((res)=>{
          that.powerLocation = res.data+"版块";
        })
      }else if (_this.user.power===1){
        this.power = "小版主：";
        let that = this;
        this.$http.get("http://localhost:8011/plates/getLpById",{params:{id: that.otherId}}).then((res)=>{
          that.powerLocation = res.data+"版块";
        })
      }

    })
  },
  // watch:{
  //   power:{
  //     immediate:true,
  //     handler(newValue){
  //       console.log("newValue=="+newValue)
  //       if (newValue===2){
  //         this.power = "版主";
  //         let that = this;
  //         this.$http.get("http://localhost:8011/plates/getPlateById",{params:{id: that.otherId}}).then((res)=>{
  //           that.powerLocation = res.data;
  //         })
  //       }else if (newValue===1){
  //         this.power = "小版主";
  //         let that = this;
  //         this.$http.get("http://localhost:8011/plates/getLpById",{params:{id: that.otherId}}).then((res)=>{
  //           that.powerLocation = res.data;
  //         })
  //       }
  //     }
  //   }
  // }
}
</script>

<style scoped>
h3{
  margin-bottom: 0px;
}
</style>