<template>
<div>
  <div class="alert alert-success" role="alert">
    <span class="glyphicon glyphicon-headphones"></span>当前绑定手机号：{{ user.phone }}
    <button class="btn btn-info" data-toggle="modal" data-target="#phoneModal" >更换绑定手机</button>
    <UpdatePassByPhone :showPass="this.showPass" :showh4="this.showh4"></UpdatePassByPhone>
  </div>
</div>
</template>

<script>
import UpdatePassByPhone from "@/components/UpdatePassByPhone";
export default {
  name: "PersonalPhone",
  props:['user'],
  components:{
    UpdatePassByPhone
  },
  data(){
    return{
      showPass:false,
      showh4:"更换绑定手机"
    }
  },
  methods:{
    setShowPass() {

    }
  }
}
</script>

<style scoped>

</style>