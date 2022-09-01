<template>
  <div id="list" class="list-group">
    <span class="text-center list-group-item">缘分板</span>
<!--    路由跳转
      to 跳转的目标
          name 对应 route/index.js
          params 参数
-->
<!--    v-for 普通循环
            forum
            for(Object obj:objs)
  -->
<!--    {{ forum.floorNum }}
          引用data 数据
  -->
    <router-link :to="{name:'p',params:{fid:forum.fid}}" tag="a" class="list-group-item" v-for="forum in forums" :key="forum.fid">
      <span class="badge">
        {{ forum.floorNum }}
      </span>
      {{ forum.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ListGroup",
  data(){
    return{
      forums:[]
    }
  },
  methods:{

  },
  // 组件创建完毕时执行的方法
  created(){
    let _this = this;
    // 发送请求到后端，随机获取五篇帖子
    this.$http.get("http://localhost:8011/forum/getForumRandom").then((res)=>{
      _this.forums = res.data;
    })
  }
}
</script>

<style scoped>
#list{
  display: inline;
}
a{
  cursor:pointer;
}
</style>