import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import PersonalPrivacy from "@/components/PersonalPrivacy";
import FullPost from "@/components/FullPost";
import OthersPersonal from "@/components/OthersPersonal";
import SuperController from "@/components/SuperController";
import PublishForum from "@/components/PublishForum";



Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    // {path: '/personal',redirect:'/personal/info'},
    {path: '/personal',name: 'personal',component:PersonalPrivacy},
    {path: '/personal/my-info',component:PersonalPrivacy},
    {path: '/personal/my-post',component:PersonalPrivacy},
    {path: '/personal/my-phone',component:PersonalPrivacy},
    {path: '/personal/my-pass',component:PersonalPrivacy},
    {path: '/personal/my-comment',component:PersonalPrivacy},
    {path: '/p/:fid',name:'p',component:FullPost},
    {path: '/u/:id',name:'u',component:OthersPersonal},
    {path: '/superControl/:operation',name:'superControl',component:SuperController},
    {path: '/publish/:id',name:'publish',component:PublishForum}

  ],
  scrollBehavior(){
    return {x:0,y:0}
  }
})
