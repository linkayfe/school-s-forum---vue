<template>
<div id="title">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" @click="refreshTheHome" href="javascript:">
              <span class="glyphicon glyphicon-tree-deciduous">山中城理论坛</span>
            </a>
          </div>
          <div class="col-sm-6 col-sm-offset-2">
            <form class="nav navbar-form navbar-left col-sm-4 col-sm-offset-4">
              <div class="form-group">
                <input type="text" class="form-control input" placeholder="这是个假搜索，你信吗？">
              </div>
              <button type="button" class="btn btn-default">搜索</button>
            </form>
          </div>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#" ref="logina" v-if="showLogout" data-toggle="modal" data-target="#myModal" @click.stop="clickName">{{ user.nickname }}</a>
                <a href="#" ref="logina" v-else data-toggle="modal" data-target="#myModal" @click="clickName">{{ user.nickname }}</a>
                <Login ref="child-login" @setNickname="setNickname"></Login>
              </li>
              <li v-if="this.user.nickname!=='用户名'" class="btnGroup">
                <router-link tag="button" :to="{name:'publish',params:{id:this.user.id}}" class="btn btn-primary" >发帖</router-link>
              </li>
              <li class="dropdown">
                <div class="btnGroup">
                  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="glyphicon glyphicon-user"></span>
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a ref="personal" @click="clickPersonal">个人中心</a></li>
                    <li v-if="showLogout" role="separator" class="divider"></li>
<!--                    权限为2，大版主                已登录-->
                    <li v-if="this.isSuperSuper&&showLogout" @click="refreshController"><router-link tag="a" :to="{name:'superControl',params:{operation:this.plateControl,power:this.power}}">版块管理</router-link></li>
<!--                    权限为3，超级管理员-->
                    <li v-if="this.superController&&showLogout" @click="refreshController"><router-link tag="a" :to="{name:'superControl',params:{operation:this.consumerControl}}">用户管理</router-link></li>
<!--                    权限为1，小版主-->
                    <li v-if="this.isSuper&&showLogout" @click="refreshController"><router-link tag="a" :to="{name:'superControl',params:{operation:this.forumControl,power:this.power}}">帖子管理</router-link></li>
                    <li><a href="javascript:" v-if="showLogout" @click="loginOut">安全退出</a></li>
                  </ul>
                </div>
              </li>
            </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  name: "Title",
  components: {Login},
  data(){
    return{
      showLogout:false,
      user:{nickname:"用户名"},
      isSuper:false,
      plateControl:"plates",
      forumControl:"forum",
      consumerControl:"consumer",
      isSuperSuper:false,
      superController:false,
      power:0

    }
  },
  methods:{
    refreshController(){
      this.$router.go(0)
    },
    refreshTheHome(){
      this.$router.push('/home')
      if (this.$route.path.indexOf('/home')!==-1)
      this.$emit('refreshHome');
    },
    clickName(){
      if (this.$store.getters.getLogin[0].star!==-1) {
        let f = confirm("是否退出登录？")
        if (f === true) {
          this.loginOut();
        }
      }
    },
    setNickname(){
      const id = this.$store.getters.getLogin[0].star;
      if (id!==-1){
        this.showLogout = true;
        let _this = this;
        this.$http.get("http://localhost:8011/consumer/getOneById?id="+id).then((res)=>{
          _this.user = res.data;
          let power = res.data.power;
          _this.power = power;
          if (power>=1){
            _this.isSuper = true;
            _this.power = power;
          }
          if (power>=2){
            _this.isSuperSuper = true;
            _this.power = power;
          }
          if(power>=3){
            _this.superController = true;
            _this.power = power;
          }
          if (power === 0){
            _this.isSuper = false;
            _this.isSuperSuper = false;
            _this.superController = false;
            _this.power = power;
          }
          sessionStorage.setItem('power',power+'')
          this.$emit('setIsSuper',this.isSuper);
        })

      }else {
        this.user = {nickname: "用户名"}
      }
    },
    loginOut(){
      let url = this.$route.path;
      if (url.includes("/personal")||url.includes("/superControl")||url.includes("/publish")){
        this.$router.push("/")
      }
      this.$refs["child-login"].closeTheModal();
      this.showLogout = false;
      this.isSuper = false;
      this.isSuperSuper = false;
      this.superController = false;
      this.$store.commit('setLogin',-1);
      sessionStorage.setItem('power','0');
      console.log('powerSessionStorage'+sessionStorage.getItem('power'))
      this.user = {nickname: "用户名"};
    },
    clickPersonal(){
      const id = this.$store.getters.getLogin[0].star;
      if (id === -1){
        this.$refs.logina.click();
      }else {
        this.$refs.personal.href="#/personal"
      }
    }
  },
  create(){
    this.setNickname();
  },
  mounted() {
    this.setNickname();
  }
}
</script>

<style scoped>
.input{
  width: 250px;
}
.btnGroup{
  margin-top: 8px;
  margin-left: 5px;
}
a{
  cursor:pointer;
}

</style>