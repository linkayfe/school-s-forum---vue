<template>
  <div id="home" class="container">
    <Title @refreshHome="refreshHome"></Title>
    <div class="row">
      <Carousel class="col-sm-8"></Carousel>
      <ListGroup class="col-sm-4"></ListGroup>
    </div>
    <Navbar @clickTheLp="clickTheLp"></Navbar>
    <simple-post :plId="this.plId" :showAuthor="this.showAuthor"></simple-post>
    <back-to-top></back-to-top>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import ListGroup from "@/components/ListGroup";
import SimplePost from "@/components/SimplePost";
import BackToTop from "@/components/BackToTop";
export default {
  name: 'Home',
  data(){
    return{
      showAuthor:true,
      plId:-1,
    }
  },
  components: {
    BackToTop,
    SimplePost,
    Title,
    Navbar,
    Carousel,
    ListGroup
  },
  methods:{
    clickTheLp(plId){
      this.plId = plId;
    },
    refreshHome(){
      this.$router.go(0)
    }
  },
}
</script>

<style scoped>
</style>