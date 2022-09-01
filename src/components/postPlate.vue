<template>
  <div class="modal fade" id="postPlateModal" tabindex="-1" aria-labelledby="myModalLabel" role="dialog" data-backdrop=”static”>
    <div class="modal-dialog" role="document">
      <div class="modal-content row">
        <div class="modal-header">
          <button type="button" ref="closePModalBtn" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">新增版块</h4>
        </div>
        <div class="modal-body col-sm-8 col-sm-offset-2">
          <form class="form-horizontal">
            <div class="form-group" v-if="isPostLP!==true">
              <label class="control-label">版块名：</label>
              <input type="text" v-model="theName" v-text="theName"/>
              <span v-if="tooLongName">{{ tooLongRemind }}</span>
            </div>
<!--            =============================================以上为添加板块================================================-->
            <div class="form-group" v-if="isPostLP">
              <label>版块：</label>
              <select v-model="beSelectedPId">
                <option v-for="(plate,index) in plates" :key="index" :value="plate.plateId">{{ plate.plateName }}</option>
              </select>
            </div>
            <div class="form-group" v-if="isPostLP">
              <label class="control-label">小版块名：</label>
              <input type="text" v-model="theName" v-text="theName"/>
              <span v-if="tooLongName">{{ tooLongRemind }}</span>
            </div>
 <!--            =============================================以上为添加小板块=============================================-->
            <div class="form-group">
              <label class="control-label" v-if="isPostLP">小版主ID：</label>
              <label class="control-label" v-else>版主ID：</label>
              <input type="text" v-model="theId" v-text="theId" @blur="inputTheId">
              <span v-if="showSpan" class="redSpan">无效ID</span>
            </div>
            <div class="form-group" >
              <label v-if="isPostLP">小版主昵称：</label>
              <label v-else>版主昵称：</label>
              <input type="text" v-model="theNickname" v-text="theNickname" readonly="readonly">
            </div>
            <button class="btn btn-primary" @click="submitUpdate">提交</button>
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
  name: "postPlate",
  data(){
    return{
      plates:[],
      lps:[],
      isPostLP:false,
      beSelectedPId: -1,
      theId:null,
      theName:"",
      theNickname:"",
      tooLongName:false,
      tooLongRemind:"",
      showSpan:false
    }
  },
  methods:{
    checkName(){
      if (this.theName.length>20){
        this.tooLong = true
        this.tooLongRemind = "字数过多，字数不能超过20"
      }else {
        let _this = this;
        this.$http("http://localhost:8011/plates/checkPlateOrLpName",{params:{name: this.theName,isLp:this.isPostLP}}).then((result)=>{
          if (result.data===false){
            console.log("checkName")
            _this.tooLongName = true;
            _this.tooLongRemind = "该版名已存在";
          }else {
            _this.tooLongName = false;
          }
        })
      }
    },
    inputTheId() {
      if(this.id!==-1) {
        let _this = this;
        this.$http("http://localhost:8011/consumer/getNicknameById", {params: {id: _this.theId}}).then((result) => {
          if (result.data !== "nobody") {
            _this.theNickname = result.data;
            _this.showSpan = false;
          }
          else {
            _this.showSpan = true;
          }
        })
      }
    },
    submitUpdate() {
      let _this = this;
      if (this.tooLongName || this.showSpan) {
        alert("请正确填写")
      } else {
        this.$http("http://localhost:8011/plates/postPlateOrLp",
            {
              params: {
                isPostLp: _this.isPostLP,
                plateId: _this.beSelectedPId,
                id: _this.theId,
                plateName: _this.theName
              }
            }
        ).then((result) => {
          if (result.data === false) {
            alert("系统繁忙，请稍后重试")
          }else {
            this.$router.go(0);
          }
        })
      }
    }
  },
  created() {
    let _this = this;
    this.$http("http://localhost:8011/plates/findAll").then((result)=>{
      _this.plates = result.data;
    })

  },
  watch:{
    theName:{
      immediate:true,
      handler(newValue){
        if (newValue!==""){
          console.log("watch")
          this.checkName();
        }
      }
    }
  }
}
</script>

<style scoped>

</style>