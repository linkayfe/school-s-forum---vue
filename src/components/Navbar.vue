<template>
<div id="navbar">
  <nav class="navbar navbar-default" id="mainNav">
<!--    bootstrap官网模板-->
    <div class="container-fluid row">
      <ul class="nav navbar-nav navbar-left">
        <li class="dropdown" :key="plate.plateId" v-for="plate in plates">
          <a href="#" class="dropdown-toggle" style="color: white"
             data-toggle="dropdown" role="button" aria-haspopup="true"
             aria-expanded="false" @click="createLp(plate.plateId)">
            {{ plate.plateName }}
            <span class="caret"></span></a>
          <ul class="dropdown-menu">
<!--            @click="setLpId(l.lpId) 调用该组件下的setLpId方法-->
            <li><a href="#" :key="l.lpId" @click="setLpId(l.lpId)" v-for="l in little">{{l.lpName}}</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: "Navbar",
  data(){
    return{
      plates:[],
      little:"",
    }
  },
  methods:{
    createLp(id){
      const _this = this;
      this.$http.get("http://localhost:8011/plates/getLittle",{params:{plateId:id}}).then((res)=>{
        _this.little = res.data.little;
      })
    },
    setLpId(lpId){
      // $emit 调用父组件中的方法
      // 父组件引用子组件时需要 @绑定方法提供给子组件使用
      this.$emit("clickTheLp",lpId)
    }
  },
  created() {
    const _this = this;
    this.$http.get("http://localhost:8011/plates/findAll",{params:{flag:true}}).then((res)=>{
      _this.plates = res.data;
    })
  }
}
</script>

<style scoped>
#navbar{
  margin-top: 10px;
}
#mainNav{
  background: #005BAC;
}
.dropdown-menu a{
  color: #2b2b2c;
}
</style>