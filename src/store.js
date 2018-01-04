import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
  view:{
  	title: "xxo",
    xheader_back:false,
    xheader_icon:true,
    xheader_more:true,
    tabbar:true,
    selectedTabbarItem:1
  },
  game:{},
  to_path: "/",
}

const mutations = {
  set_path:(state,path)=>{
  	state.to_path = path;
  },
  set_game_gid:(state,gid)=>{
    state.game.gid = gid
  },
  set_game_mode:(state,mode)=>{
    state.game.mode = mode
  },
  set_game_idx:(state,idx)=>{
    state.game.idx = idx
  },
}

export default new Vuex.Store({
    state,
    mutations
})