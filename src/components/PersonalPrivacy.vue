<template>
<div id="personal" class="container">
  <Title></Title>
  <div class="div-inline">
    <ul class="nav nav-pills nav-stacked nav-ul">
      <li role="presentation" class="nav-li" :class="show==='my-info'?'active':''">
        <a ref="my-info" @click="setShow('my-info')">个人信息</a></li>
      <li role="presentation" class="nav-li" :class="show==='my-post'?'active':''">
        <a ref="my-post" @click="setShow('my-post')">我的帖子</a></li>
<!--      <li role="presentation" class="nav-li" :class="show==='my-comment'?'active':''"><a ref="my-comment" @click="setShow('my-comment')">我的评论</a></li>-->
      <li role="presentation" class="nav-li" :class="show==='my-pass'?'active':''">
        <a ref="my-pass" @click="setShow('my-pass')">修改密码</a></li>
      <li role="presentation" class="nav-li" :class="show==='my-phone'?'active':''">
        <a ref="my-phone" @click="setShow('my-phone')">手机绑定</a></li>
<!--      <li role="presentation" ><a href="javascript:" class="danger" @click="clickOut">安全退出</a></li>-->
    </ul>
  </div>
  <div class="div-inline row">
      <div class="" v-if="show==='my-info'"><personal-info :user="this.user"></personal-info></div>
      <div class="jumbotron div-jumbo div-post" v-else-if="show==='my-post'"><simple-post :showAuthor="showAuthor" :user="this.user"></simple-post></div>
<!--      <div class="jumbotron div-jumbo div-post" v-else-if="show==='my-comment'"><personal-comment :user="this.user"></personal-comment></div>-->
      <div class="jumbotron div-jumbo" v-else-if="show==='my-pass'"><update-pass :user="this.user"></update-pass></div>
      <div class="jumbotron div-jumbo" v-if="show==='my-phone'"><personal-phone :user="this.user"></personal-phone></div>
  </div>
  <back-to-top></back-to-top>
</div>
</template>

<script>
import Title from "@/components/Title";
import PersonalInfo from "@/components/PersonalInfo";
import UpdatePass from "@/components/UpdatePass";
// import PersonalComment from "@/components/PersonalComment";
import PersonalPhone from "@/components/PersonalPhone";
import SimplePost from "@/components/SimplePost";
import BackToTop from "@/components/BackToTop";
export default {
  name: "PersonalPrivacy",
  data(){
    return{
      show:'my-info',
      showAuthor:false,
      user:{}
    }
  },
  components:{
    BackToTop,
    SimplePost,
    PersonalPhone,
    // PersonalComment,
    Title,
    PersonalInfo,
    UpdatePass
  },
  methods:{
    setShow(show) {
      this.show = show;
      const currenturl = window.location.href;
      let newUrl = (currenturl.split("/"))[0];
      newUrl += "#/personal";
      history.pushState('','',newUrl+"/"+show);
    },
    // clickOut(){
    //   this.$emit("loginOut")
    // }
  },
  created() {
    const id = this.$store.getters.getLogin[0].star;
    if(id===-1){
      this.$router.push("/")
    }
    let _this = this;
    this.$http.get("http://localhost:8011/consumer/getOneById?id="+id).then((res)=>{
      _this.user = res.data;
    })

  },
  watch:{
    $route(url){
      if (url.path.indexOf("my")!==-1) {
        this.setShow(url.path.split('/')[2])
      }else {
        this.setShow("my-info")
      }
    }
  }
}
</script>

<style scoped>
.danger{
  background: #f86059;
}
.nav-ul{
  width: 150px;
  text-align: center;
  height: auto;
  float: left;
}
.nav-li{
  background: #eee;
  cursor:pointer;
}
.nav-li:hover{
  background: #c5c3c3;
}
.danger:hover{
  background: #d9534f
}
.div-inline{
  display: inline;
  float: left;
}
.div-jumbo{
  margin-left: 30px;
  width: 100%;
}
a{
  color: #0f0f0f;
}
.div-post{
  position: absolute;
  width: 60%;
}


</style>