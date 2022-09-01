<template>
<div class="container">
  <Title ref="child-title" @setIsSuper="setIsSuper"></Title>
  <div class="page-header">
    <div><h2>{{ forum.title }}</h2></div>
    <button class="btn btn-danger" id="deleteForum" v-if="isSuper && forum.showForum===0" @click="clickDeleteFloor(-1)">删除</button>
  </div>
  <div class="media" v-show="forum.showForum===0" v-for="floor in floors" :key="floor.floor_id">
    <div >
      <div class="media-left media-top personal-info">
        <a><img src="../assets/logo.png" alt="头像"></a>
        <router-link class="nickname" :to="{name:'u',params:{id:floor.id}}">{{ floor.nickname }}</router-link>
      </div>
      <div class="media-body" v-if="floor.isShow===0">
        <p v-html="floor.content">
          {{ floor.content }}
        </p>
      </div>
      <div class="media-body" v-else><span class="beDelete">此楼已作违规处理</span></div>
      <div class="footer">
        <span>{{ floor.floorNum }}楼</span>|
        <span class="glyphicon glyphicon-time">{{ floor.createTime }}</span>
        <a class="deleteFloor" v-if="isSuper && floor.isShow===0" @click="clickDeleteFloor(floor.floorId)">|删除</a>
      </div>
      <hr>
    </div>

  </div>
  <div v-show="forum.showForum===1" ><span class="beDelete">此贴已作违规处理</span></div>
  <BackToTop class="container-fluid"></BackToTop>
  <Expression v-if="forum.showForum===0" :floor="this.floor" :fid="this.forum.fid" :publish="this.publish"></Expression>
</div>
</template>

<script>
import Title from "@/components/Title";
import BackToTop from "@/components/BackToTop";
import Expression from "@/components/Expression";
export default {
  name: "FullPost",
  data(){
    return{
      forum:{},
      plate:{},
      lp: {},
      floors:[],
      floor:{},
      deleteFloorNum:-1,
      publish:false,
      isSuper:false
    }
  },
  components: {
    Expression,
    Title,
    BackToTop
  },
  methods:{
    clickDeleteFloor(floorId) {
      let reConfirm = confirm('确认删除？')
      if (reConfirm) {
        let _this = this;
        this.deleteFloorNum = floorId;
        let params = new URLSearchParams();
        if (floorId !== -1) {
          params.append('floorId', this.deleteFloorNum);
          this.$http.put("http://localhost:8011/floor/deleteFloor",
              params
          ).then((result) => {
            if (result) {
              _this.$router.go(0);
            } else {
              alert("系统繁忙，请稍后重试")
            }
          })
        } else {
          params.append('fid',this.forum.fid);
          this.$http.put("http://localhost:8011/forum/deleteForum",
              params).then((result) => {
            if (result) {
              _this.$router.go(0);
            } else {
              alert("系统繁忙，请稍后重试")
            }
          })
        }
      }
    },
    setIsSuper(flag){
      this.isSuper = flag;
    }
  },
  created(){
    console.log('created')
    let fid = this.$route.params.fid;
    let _this = this;
    this.$http.get("http://localhost:8011/forum/getForumByFid?fid="+fid).then((res)=>{
      let allData = res.data;
      _this.forum = allData.forum;
      _this.plate = allData.plate;
      _this.lp = allData.lp;
      _this.floors = allData.floors;
      _this.floor = allData.floors[allData.floors.length-1]
    })
  },
}
</script>

<style scoped>
h2{
  margin-bottom: 0;
  display: flex;
}
.personal-info{
  background: #f3f3f3;
  text-align: center;
}
.footer{
  float: right;
}
.nickname{
  cursor: pointer;
}
a{
  cursor:pointer;
}
.deleteFloor{
  color: #ef5050;
}
#deleteForum{
  float: right;
}
.beDelete{
  font-size: larger;
}
</style>