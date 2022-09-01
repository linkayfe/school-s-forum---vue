<template>
  <div class="modal fade" id="promotionModal" tabindex="-1" aria-labelledby="myModalLabel" role="dialog" data-backdrop=”static”>
    <div class="modal-dialog" role="document">
      <div class="modal-content row">
        <div class="modal-header">
          <button type="button" ref="closePromotionModalBtn" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">调整权限</h4>
        </div>
        <div class="modal-body col-sm-8 col-sm-offset-2">
          <form>
            <div class="form-group" >
              <label>用户账号：</label>
              <input type="text" v-model="promotionId" readonly="readonly">
            </div>
            <div class="form-group">
              <label>昵称：</label>
              <input type="text" v-model="promotionNickname" readonly="readonly">
            </div>
            <div class="form-group">
              <label>已有权限：</label>
              <input type="text" :value="powerText[0]" v-if="oldPower===0" readonly="readonly">
              <input type="text" :value="powerText[1]" v-if="oldPower===1" readonly="readonly">
              <input type="text" :value="powerText[2]" v-if="oldPower===2" readonly="readonly">
            </div>
            <div class="form-group" >
              <label>权限选择：</label>
              <select v-model="selectPower">
                <option v-if="oldPower!==0" :value="0">普通用户</option>
                <option v-if="oldPower!==1" :value="1">小版主</option>
                <option v-if="oldPower!==2" :value="2">大版主</option>
              </select>
            </div>
            <div class="form-group" v-if="selectPower!==0">
              <label>大版块：</label>
              <select v-model="selectPlate">
                <option v-for="(plate) in plateList" :key="plate.plateId" :value="plate.plateId">{{ plate.plateName }}</option>
              </select>
            </div>
            <div class="form-group" v-if="selectPower === 1">
              <label>小版块：</label>
              <select v-model="selectLp">
                <option v-for="(little) in littleList" :key="little.lpId" :value="little.lpId">{{ little.lpName }}</option>
              </select>
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
  name: "PromotionModal",
  data(){
    return{
      promotionId:0,
      promotionNickname:"",
      oldPower:0,
      selectPower:0,
      plateList:[''],
      littleList:['请选择大版块'],
      selectPlate:0,
      selectLp:0,
      powerText:['普通用户','小版主','大版主'],
    }
  },
  methods:{
    submitUpdate(){
      let _this = this;
      if (this.selectPower === 1){
        this.$http('http://localhost:8011/plates/updateLpControl',
            {
              params:{
                id:this.promotionId,
                power:this.selectPower,
                lpId:this.selectLp
              }
            }).then((result)=>{
              if (result.data){
                _this.$emit("findAll")
              }else {
                alert("系统繁忙，请稍后重试")
              }
            })
      }else if (this.selectPower === 2){
        this.$http('http://localhost:8011/plates/updatePlateControl',
            {
              params:{
                id:this.promotionId,
                power:this.selectPower,
                plateId:this.selectLp
              }
            }).then((result)=>{
              if (result.data){
                _this.$emit("findAll")
              }else {
                alert("系统繁忙，请稍后重试")
              }
        })
      }else {
        this.$http("http://localhost:8011/plates/updatePower",{
          params:{
            id:this.promotionId,
            power:this.selectPower
          }
        }).then((result)=>{
          if (result.data){
            _this.$emit("findAll")
          }else {
            alert("系统繁忙，请稍后重试")
          }
        })
      }
      _this.$refs.closePromotionModalBtn.click();
    },
  },
  watch:{
    selectPower:{
      immediate:true,
      handler(newValue){
        if (newValue !== 0){
          let _this = this;
          this.$http('http://localhost:8011/plates/findAll',{params:{flag:true}}).then((result)=>{
            _this.plateList = result.data;
          })
        }
      }
    },
    selectPlate:{
      immediate:true,
      handler(newValue){
        if (this.selectPower === 1){
          let _this = this;
          this.$http('http://localhost:8011/plates/getLittle',{params:{plateId:newValue}}).then((result)=>{
            _this.littleList = result.data.little;
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>