import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
        login:[
            {name:'id',star: -1},
        ],
    },
    mutations:{
        setLogin:function(state,id){
            state.login.map(function(login){
                login.star = id;
            })
        },

    },
    actions:{
        setLogin:(context,id)=>{
            context.commit('setLogin',id);
        }
    },
    getters:{
        getLogin:function (state){
            return state.login.map(login=>{
                return{
                    name: login.name,
                    star: login.star
                }
            })

        },
    }
})
