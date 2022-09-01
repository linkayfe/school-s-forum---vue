<template>
<div class="container">
  <Title></Title>
  <div class="page-header">
    <h3>{{ operation }}</h3>
  </div>
  <table class="table table-hover" v-show="showTable">
    <thead>
      <tr>
<!--        <th v-if="operation==='consumer'">选择</th>-->
        <th>序号</th>
        <th v-for="(thData,index) in ths" :key="index">
        {{ thData }}
        </th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody v-if="(operation==='consumer')">
      <tr v-for="(perform,index) in performs" :key="index">
        <td>{{ index+1 }}</td>
<!--        <td><input type="radio" v-model="clockId" :value="perform.id"></td>-->
        <td>{{ perform.id }}</td>
        <td><router-link tag="a" :to="{path:'/u',params:{id:perform.id}}">{{ perform.nickname }}</router-link></td>
        <td>{{ perform.phone }}</td>
        <td v-if="perform.power === 0">普通用户</td>
        <td v-else-if="perform.power === 1">小版主</td>
        <td v-else-if="perform.power === 2">大版主</td>
        <td v-else-if="perform.power === 3">超级管理员</td>
        <td>{{ perform.state }}</td>
        <td>
          <button  v-if="perform.showState===1" type="button" class="btn btn-primary" @click="unlocking(perform.id)">解封</button>
          <button v-if="perform.showState===0" class="btn btn-danger" @click="clockConsumer(perform.id)">封号</button>
          <select v-if="perform.showState===0" @click="setFocus(perform.id)" v-model="clockTime">
            <option v-if="perform.id!==clockId" > </option>
            <option v-text="perform.id===clockId?'一天':'  '" :value="24*60*60*1000">一天</option>
            <option v-if="perform.id===clockId" :value="7*24*60*60*1000">七天</option>
            <option v-if="perform.id===clockId" :value="30*24*60*60*1000">一个月</option>
            <option v-if="perform.id===clockId" :value="365*24*60*60*1000">一年</option>
            <option v-if="perform.id===clockId" :value="3650*24*60*60*1000">十年</option>
          </select>
          <button @click="setPromotionModal(perform.id,perform.nickname,perform.power)" v-if="perform.power < 3 && perform.showState === 0" class="btn btn-primary">权限</button>

        </td>
      </tr>
    </tbody>
<!--    ===========================================consumer================================================-->

    <tbody v-else-if="(operation==='plates')">
      <tr v-for="(perform,index) in performs" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ perform.plateName }}</td>
        <td><router-link tag="a" :to="{path:'/u',params:{id:perform.id}}">{{ perform.nickname }}</router-link></td>
        <td v-text="perform.showState===0?'正常':'已删除'"></td>
        <td>
          <button class="btn btn-primary"
                  @click="iocDisplay(false,perform.lpName,perform.plateId,perform.lpId,perform.plateName,perform.id,perform.nickname)">修改</button>
          <span>|</span>
          <button class="btn btn-danger" v-if="perform.showState===0" @click="deletePlate(perform.plateId)">删除</button>
          <button class="btn btn-primary" v-if="perform.showState===1" @click="recoverPlate(perform.plateId,false)">恢复</button>
        </td>
      </tr>
      <tr>
      </tr>
    </tbody>

    <!--    ===========================================plates================================================-->

    <tbody v-else-if="(this.operation==='forum')">
    <tr v-for="(perform,index) in performs" :key="index">
      <td>{{ index+1 }}</td>
      <td>{{ perform.plateName }}</td>
      <td>{{ perform.lpName }}</td>
      <td><router-link tag="a" :to="{name:'u',params:{id:perform.id}}">{{ perform.nickname }}</router-link></td>
      <td>{{ perform.title }}</td>
      <td>{{ perform.publishTime }}</td>
      <td>{{ perform.floorNum }}</td>
      <td v-text="perform.showState===0?'正常':'被封'"></td>
      <td>
        <button class="btn btn-danger" v-if="perform.showState===0" @click="deleteForum(perform.fid)" >删除</button>
        <button class="btn btn-primary" v-if="perform.showState===1" @click="openClock(perform.fid)" >解封</button>
      </td>
    </tr>
    </tbody>

    <!--    ===========================================forum================================================-->
  </table>

  <button v-if="operation==='plates' && userPower==='3'" class="btn btn-primary" @click="iocPost(false)">添加版块</button>
  <span></span>
  <button v-if="operation==='plates' && userPower==='3'" @click="clickLpInfo(false)" class="btn btn-info">{{ showLpInfoBtn }}</button>
  <span></span>
  <button v-if="operation==='plates' && userPower==='3'" class="btn btn-primary"  @click="iocPost(true)">添加小版块</button>
<!--  小板块信息-->
  <table class="table table-hover" v-if="displayLpInfo">
    <thead>
      <tr>
        <td>序号</td>
        <th v-for="(th,index) in lpList" :key="index">
          {{ th }}
        </th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(perform,index) in littlePlates" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ perform.lpName }}</td>
        <td><router-link tag="a" :to="{path:'/u',params:{id:perform.id}}">{{ perform.plateName }}</router-link></td>
        <td>{{ perform.nickname }}</td>
        <td v-text="perform.showState===0?'正常':'已删除'"></td>
        <td>
          <button type="button" class="btn btn-primary"
                  @click="iocDisplay(true,perform.lpName,-1,perform.lpId,perform.plateName,perform.id,perform.nickname)">修改</button>
          <span>|</span>
          <button class="btn btn-danger" v-if="perform.showState===0" @click="deleteLp(perform.lpId)">删除</button>
          <button class="btn btn-primary" v-if="perform.showState===1" @click="recoverPlate(perform.lpId,true)">恢复</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button ref="updateBtn" type="button" class="btn btn-primary true-update" data-toggle="modal" data-target="#plateModal">修改</button>
  <button ref="postBtn" type="button" class="true-update" data-toggle="modal" data-target="#postPlateModal"></button>

  <update-plate-modal ref="pModal" @clickLpInfo="clickLpInfo" @getForumByPower="getForumByPower" @refreshController="refreshController" @findAll="findAll"></update-plate-modal>

  <post-plate ref="postPlateModal"></post-plate>

  <button type="button" class="true-update" ref="theTruePromotionBtn" data-toggle="modal" data-target="#promotionModal"></button>
  <promotion-modal ref="promotion" @findAll="findAll"></promotion-modal>

</div>
</template>

<script>
    import Title from "@/components/Title";
    import UpdatePlateModal from "@/components/UpdatePlateModal";
    import PostPlate from "@/components/postPlate";
    import PromotionModal from "@/components/PromotionModal";
    export default {
      components: {PromotionModal, PostPlate, UpdatePlateModal, Title},
      data(){
        return {
          performs: [],
          ths: [],
          littlePlates:[],
          consumerList: ["账号", "昵称", "手机号码","权限","状态"],
          plateList: ["版块", "版主","状态"],
          lpList: ["小版块","大版块","小版主","状态"],
          forumList: ["版块", "小版块", "作者", "标题", "发表时间", "楼数","状态"],
          operation:this.$route.params.operation,
          showLpInfoBtn:"查看小版块信息",
          displayLpInfo: false,
          clockNum:0,
          clockId:0,
          clockTime:0,
          userPower:sessionStorage.getItem('power'),
          showTable:true
        }
      },
      methods:{
        deleteLp(lp){
          let flag = confirm("确认删除？")
          if (flag){
            let _this = this;
            let params = new URLSearchParams();
            params.append('lpId',lp);
            this.$http.put("http://localhost:8011/plates/deleteLp",
                params).then((result)=>{
                  if (result){
                    _this.clickLpInfo(true);
                    _this.$router.go(0);
                  }else {
                    alert("系统繁忙，请稍后重试")
                  }
            })
          }
        },
        deletePlate(plate){
          let flag = confirm("确认删除？")
          if (flag){
            let _this = this;
            // let params = new URLSearchParams();
            // params.append('plateId',plate)
            this.$http("http://localhost:8011/plates/deletePlate",
               {params:{
                 plateId:plate
                 }}).then((result)=>{
              if (result){
                _this.findAll();
              }
            })
          }
        },
        clickLpInfo(back) {
          if (this.userPower !== '3'){
            return;
          }
          if (this.displayLpInfo === false || back ) {
            this.displayLpInfo = true;
            this.showLpInfoBtn = "关闭小版块信息"
            let _this = this;
            this.$http("http://localhost:8011/plates/getAllLp").then((result) => {
              _this.littlePlates = result.data;
            })
          }else {
            this.displayLpInfo = false;
            this.showLpInfoBtn = "查看小版块信息"
          }
        },
        iocDisplay(isLp,littleName,plateId,lpId,plateName,powerId,powerNickname){
          this.$refs.pModal.isLp=isLp;
          this.$refs.pModal.lpName=littleName;
          this.$refs.pModal.bigPlateId=plateId;
          this.$refs.pModal.theLpId=lpId;
          this.$refs.pModal.bigPlateName=plateName;
          this.$refs.pModal.theSuperId=powerId;
          this.$refs.pModal.theOldId=powerId;
          this.$refs.pModal.powerNick=powerNickname;
          let _this = this;
          this.$http("http://localhost:8011/consumer/allIdAndNickname").then((result)=>{
            _this.$refs.pModal.consumerIdAndNickname = result.data;
          })
          console.log("iocDisplay---",powerId)
          this.$refs.pModal.plateList = this.performs;
          this.$refs.updateBtn.click();
        },
        iocPost(isLp){
          this.$refs.postPlateModal.isPostLP = isLp;
          this.$refs.postBtn.click();
        },
        findAll(){
          let _this = this;
          this.operation = this.$route.params.operation
          if (this.operation !== 'plates') {
            this.displayLpInfo = false
            this.showLpInfoBtn = "查看小版块信息"
          }
          this.$http("http://localhost:8011/"+this.operation+"/findAll",{params:{flag:false}}).then((result)=>{
            _this.performs = result.data;
          })
        },
        clockConsumer(clockId){
          let _this = this;
          let clockNum = this.clockTime;
          this.$http('http://localhost:8011/consumer/clockOne',
              {
                params:{
                  id:clockId,
                  state:clockNum
                }
              }).then((result)=>{
                if (result.data){
                  _this.findAll();
                }else {
                  alert("系统繁忙，请稍后重试")
                }
          })
        },
        // 删除帖子
        deleteForum(fid){
          let params = new URLSearchParams();
          params.append("fid",fid);
          this.$http.put("http://localhost:8011/forum/deleteForum",params).then((result)=>{
            if (result.data){
              if (this.userPower === '3') {
                this.findAll();
              }else {
                this.getForumByPower()
              }
            }else {
              alert("系统繁忙，请稍后重试")
            }
          })
        },
        // 恢复帖子
        openClock(fid){
          let _this = this;
          let params = new URLSearchParams();
          params.append("fid",fid);
          this.$http.put('http://localhost:8011/forum/openClock',params).then((result)=>{
            if (result.data){
              if (this.userPower === '3') {
                _this.findAll();
              }else {
                _this.getForumByPower()
              }
            }else {
              alert("系统繁忙，请稍后重试")
            }
          })
        },
        recoverPlate(pOrLpId,flag){
          let _this = this;
          let params = new URLSearchParams();
          params.append('theId',pOrLpId);
          params.append('flag',flag);
          this.$http.put('http://localhost:8011/plates/recoverPOrLp',
              params).then((result)=>{
                if (result.data){
                 _this.$router.go(0);
                }else{
                  alert("系统繁忙，请稍后重试");
                }
          })
        },
        unlocking(id){
          let _this = this;
          this.$http('http://localhost:8011/consumer/unlocking',{params:{
            id:id
            }}).then((result)=>{
              if (result.data){
                _this.findAll();
              }else {
                alert("系统繁忙，请稍后重试")
              }
          })
        },
        setFocus(id){
         this.clockId = id
        },
        setPromotionModal(id,nickname,power){
          this.$refs.promotion.promotionId = id;
          this.$refs.promotion.promotionNickname = nickname;
          this.$refs.promotion.oldPower = power;
          this.$refs.theTruePromotionBtn.click();
        },
        platePowerInto(){
          let _this = this;
          let userId = this.$store.getters.getLogin[0].star;
          this.$http("http://localhost:8011/plates/getLpsById",{params:{
            id:userId
            }}).then((result) => {
            _this.littlePlates = result.data;
          })
        },
        setThs(){
          switch (this.operation){
            case "consumer":
              this.ths = this.consumerList;
              break;
            case "plates":
              this.ths = this.plateList;
              break;
            case "forum":
              this.ths = this.forumList;
              break;
            case "carousel":break;
          }
        },
        refreshController(){
          this.$router.go(0);
        },
        getForumByPower(){
          console.log("getForumsByPower===",this.userPower)
          this.$http("http://localhost:8011/forum/getForums",
              {
                params:{
                  id: this.$store.getters.getLogin[0].star,
                  power: this.userPower
                }
              }).then((result)=>{
            this.performs = result.data;
          })
        }
      },
      created(){
        this.setThs();
        if (this.userPower === '3'){
          this.showTable = true;
          this.findAll();
        }else if (this.operation === 'plates'){
          this.showTable = false;
          this.displayLpInfo = true;
          this.platePowerInto();
        }else if (this.operation === 'forum'){
          this.getForumByPower();
        }
      },
      mounted() {
        if (this.userPower !== '3' && this.operation === 'plates'){
          this.showTable = false;
          this.displayLpInfo = true;
          this.platePowerInto();
        }else {
          this.showTable = true;
        }
      },
      // watch:{
      //   $route:{
      //     immediate: true,
      //     handler(){
      //       this.findAll()
      //       this.setThs()
      //     },
      //     deep:true
      //   },
      // },
    }
</script>

<style scoped>
span{
  margin:0 5px 0;
}
.true-update{
  display: none;
}
</style>
