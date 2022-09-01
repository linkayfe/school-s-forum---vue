<template>
  <!--    bootstrap 中的多媒体版块-->
  <div class="media" v-if="simplePost.length!==0">
<!--    v-if 条件为true才有创建这标签-->
<!--    v-show 条件为true才展示这个标签-->
    <div class="page-header" v-if="plAndLp">
<!--      <h4 v-if="plAndLp">{{ simplePost[0].plateName }}/{{ simplePost[0].lpName }}</h4>-->
      <h4>{{ plateDetail }}</h4>
    </div>
    <div v-if="nobody"><h3>还没有人发帖欸，要不你来</h3></div>
    <div class="media-body block" v-for="(post,index) in simplePost" :key="index">
      <h4 class="media-heading">
        <router-link :to="{name:'p',params:{fid:post.fid}}" tag="a">{{ post.title }}</router-link>
      </h4>
<!--      v-html 内容含有html标签，会编译展示-->
      <p v-html="post.content" class="p-size"></p>
<!--      <div><img src="../assets/logo.png" alt=""></div>-->
      <div>
        <span class="glyphicon glyphicon-pencil spans" v-if="showAuthor"></span>
        <span class="spans" v-if="showAuthor">
          <router-link class="author" :to="{name:'u',params:{id:post.id}}">{{ post.nickname }}</router-link>|
        </span>
        <span class="glyphicon glyphicon-time spans"></span>
        <span class="spans"><small>{{ post.publishTime }}</small></span>
        <a v-if="showAuthor!==true" @click="clickDeleteForum(post.fid)">删除</a>
      </div>
      <hr>
    </div>
  </div>
  <div v-else>
    <span> 您还没有发过帖子 </span>
  </div>
</template>

<script>
export default {
  name: "SimplePost",
  props:["showAuthor","user","plId"],
  data(){
    return{
      simplePost:[],
      nobody:false,
      plAndLp:true,
      plateDetail:"热议板",
      theOtherId:-1
    }
  },
  methods:{
    clickDeleteForum(deleteFid){
      let _this = this;
      this.$http("http://localhost:8011/forum/deleteForum",
          {params:{
            fid:deleteFid
            }}).then((result)=>{
              if (result){
                _this.$router.go(0)
              }else {
                alert("系统繁忙，请稍后重试")
              }
      })
    },
    setSimplePost(){
      let _this = this;
      if (this.showAuthor) {
        this.$http.get("http://localhost:8011/forum/getTopForum").then((res) => {
          _this.simplePost = res.data;
        })
      }else {
        this.$http.get("http://localhost:8011/forum/getForumsById",
            {
              params:{
                id:this.$route.params.id
              }
            }).then((res)=>{
          let allData = res.data;
          _this.plAndLp = false;
          _this.simplePost = allData;
        })
      }
    },
    getSimplePost(showAuthor){
      this.showAuthor = showAuthor;

    }
  },
  created(){
    let _this = this;
    if (this.showAuthor) {
      this.$http.get("http://localhost:8011/forum/getTopForum").then((res) => {
        _this.simplePost = res.data;
      })
    }else {
      this.$http.get("http://localhost:8011/forum/getForumsById",
          {
            params:{
              id:this.$store.getters.getLogin[0].star
            }
          }).then((res)=>{
        let allData = res.data;
        _this.plAndLp = false;
        _this.simplePost = allData;
      })
    }
  },
  watch:{
    plId:{
      immediate:true,
      handler(newValue) {
        console.log("newValue"+newValue)
        if (newValue !== -1 && this.$route.path.indexOf("personal")===-1 && this.$route.path.indexOf("u") === -1) {
          let _this = this;
          console.log("if->newValue"+newValue)
          this.$http.get("http://localhost:8011/forum/getForumsByLpId?lpId=" + newValue).then((res) => {
            let allData = res.data;
            _this.plateDetail = allData[0].plateName+"/"+allData[0].lpName;
            if (allData[0].fid === -1) {
              _this.nobody = true;
              _this.simplePost = [];
            } else {
              _this.nobody = false;
              _this.simplePost = allData;
            }
          })
        }
      }
    }

 }

}
</script>

<style scoped>
.spans{
  margin-right: 5px;
  font-size: 12px;
  color: #999;
}
.block{
  display: block;
}
.author{
  color: #999;
}
hr{
  color: #999;
}
.p-size{
  font-size: small;
}
h4{
  margin: 0;
  padding: 0;
}
h3{
  text-align: center;
}

</style>