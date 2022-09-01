<template>
  <div class="modal fade" id="plateModal" tabindex="-1" aria-labelledby="myModalLabel" role="dialog" data-backdrop=”static”>
    <div class="modal-dialog" role="document">
      <div class="modal-content row">
        <div class="modal-header">
          <button type="button" ref="closePModalBtn" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">修改版块信息</h4>
        </div>
        <div class="modal-body col-sm-8 col-sm-offset-2">
          <form>
            <div class="form-group">
              <label for="plate_name">版名：</label>
              <select v-if="isLp" v-model="bigPlateId">
                <option selected :value="bigPlateId">{{ bigPlateName }}</option>
                <option v-for="plate in plateList" :key="plate.plateId">{{ plate.plateName }}</option>
              </select>
              <input v-else type="text" v-model="bigPlateName" v-text="bigPlateName">
            </div>
            <div class="form-group" v-if="isLp">
              <label>小版名：</label>
              <input type="text" v-model="lpName" v-text="lpName">
            </div>
            <div class="form-group">
              <label v-if="isLp">小版主ID：</label>
              <label v-else>版主ID：</label>
              <select v-model="theSuperId" @blur="inputTheId">
                <option selected :value="theSuperId">{{ theSuperId }}</option>
                <option v-for="consumer in consumerIdAndNickname" :key="consumer.id" :value="consumer.id">
                  {{ consumer.id }}
                </option>
              </select>
              <span v-if="showSpan" class="redSpan">无效ID</span>
            </div>
            <div class="form-group" >
              <label v-if="isLp">小版主昵称：</label>
              <label v-else>版主昵称：</label>
              <input type="text" v-model="powerNick" v-text="powerNick" readonly="readonly">
            </div>
            <button class="btn btn-primary" type="button" @click="submitUpdate">提交</button>
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
  name: "UpdatePlateModal",
  data(){
    return{
      isLp:false,
      theLpId:0,
      lpName:"this.littleName",
      bigPlateId:0,
      bigPlateName:"this.plateName",
      theSuperId:0,
      powerNick:"this.powerNickname",
      showSpan:false,
      consumerIdAndNickname:[],
      plateList:[],
      theOldId:0
    }
  },
  methods:{
    inputTheId(){
        for (let i=0;i<this.consumerIdAndNickname.length;i++){
          if (this.consumerIdAndNickname[i].id === this.theSuperId)
            this.powerNick = this.consumerIdAndNickname[i].nickname;
        }
    },
    selectThePlateId(){
      for (let i=0;i<this.plateList.length;i++){
        if (this.bigPlateId === this.plateList[i].plateId)
          this.bigPlateName = this.plateList[i].plateName;
      }
    },
    submitUpdate(){
      let _this = this;
      if (this.showSpan!==true) {
        let params = new URLSearchParams();
        params.append('theOldId',this.theOldId)
        params.append('plateId',this.bigPlateId)
        params.append('plateName',this.bigPlateName)
        params.append('lpId',this.theLpId)
        params.append('lpName',this.lpName)
        params.append('id',this.theSuperId)
        params.append('isLp',this.isLp)
        this.$http.put("http://localhost:8011/plates/updatePlateOrLp",
            params).then((result) => {
          if (result) {
            if (_this.isLp){
              _this.$emit('refreshController')
              _this.$emit("clickLpInfo",true)
            }else {
             _this.$emit('findAll');
            }
            _this.$refs.closePModalBtn.click();
          } else {
            alert("系统繁忙，请稍后重试")
          }
        })
      }
    }
  },
  watch:{
    theSuperId:{
      immediate:true,
      handler(){
        this.inputTheId()
      }
    },
    bigPlateName:{
      immediate:true,
      handler(){
        this.selectThePlateId()
      }
    }
  }
}
</script>

<style scoped>

</style>