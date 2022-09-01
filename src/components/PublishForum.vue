<template>
<div class="container">
  <Title></Title>
  <h2>发帖</h2>
  <form class="form-horizontal">
    <div class="form-group">
      <label for="plateSelect" class="control-label">版块：</label>
      <select id="plateSelect" class="form-control" v-model="beSelectedPlateId">
        <option v-for="(plate,index) in plates" :key="index" :value="plate.plateId">{{ plate.plateName }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="lpSelect" class="control-label">小版块：</label>
      <select id="lpSelect" class="form-control" v-model="beSelectedLpId">
        <option v-for="(lp,index) in lps" :key="index" :value="lp.lpId">{{ lp.lpName }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="publish_title" class="control-label">标题：</label>
      <input id="publish_title" type="text" v-model="title" @blur="checkTitle" ref="publish_title" value=""/>
      <span v-if="tooLong">字数过多，字数不能超过30</span>
    </div>
    <div class="form-group">
      <label for="expression" class="control-label">内容：</label>
      <Expression id="expression" @CheckData="checkData" :publish="publish" :title="title" :lpId="beSelectedLpId">
      </Expression>
    </div>
  </form>
</div>
</template>

<script>
import Title from "@/components/Title";
import Expression from "@/components/Expression";

export default {
  name: "PublishForum",
  components:{Expression, Title},
  data(){
    return{
      beSelectedPlateId:-1,
      toGetLp:"",
      beSelectedLpId:-1,
      plates:[],
      lps:[],
      title:"",
      publish:true,
      tooLong:false
    }
  },
  methods:{
    checkTitle(){
      if (this.title.length>30){
        this.tooLong = true
      }
    },
    checkData(){
      return this.beSelectedPlateId!==-1 && this.beSelectedLpId !== -1 && this.title !== "";
    }
  },
  created() {
    let _this = this;
    this.$http("http://localhost:8011/plates/findAll").then((result)=>{
      _this.plates = result.data;
    })

  },
  watch:{
    beSelectedPlateId:{
      immediate:true,
      handler(newValue){
        this.lps = [];
        console.log(newValue);
        this.$http("http://localhost:8011/plates/getLittle",
            {params:{
                plateId:this.beSelectedPlateId
              }}).then((result)=>{
          this.lps = result.data.little;
          console.log(this.lps)
        })

      }
    }
  }
}
</script>

<style scoped>
span{
  color: red;
}
</style>