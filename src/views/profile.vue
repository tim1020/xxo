//profile页面
<template>
  <div class="box">
  
      <div class="p-name">{{data.nick}}</div>

      <div class="dashboard">
        <grid :cols="3">
          <grid-item>积分：{{data.score}}</grid-item>
          <grid-item>等级：{{data.lv}}</grid-item>
          <grid-item>局数：{{data.games}}</grid-item>
          <grid-item>获胜：{{data.win}}</grid-item>
          <grid-item>胜率：{{data.win_rate }}%</grid-item>
          <grid-item>当前连胜：{{data.win_streaks }}</grid-item>
        </grid>
      </div>

    <divider>成就</divider>

    <group-title class="honor-title">志在参与<sub>已参与{{data.games}} 次游戏</sub></group-title>
    <grid>
      <grid-item  v-for="i in 5" :key="i">
        <img slot="icon" :src="honor.games.icon" v-bind:class="{grey: data.games < honor.games.levels[i-1].count}">
        <span slot="label">{{honor.games.levels[i-1].desc}}</span> 
      </grid-item>
    </grid>

    <group-title class="honor-title">常胜将军<sub>已获得 {{data.win}} 次胜利</sub></group-title>
    <grid>
      <grid-item  v-for="i in 5" :key="i">
        <img slot="icon" :src="honor.win.icon" v-bind:class="{grey: data.win < honor.win.levels[i-1].count}">
        <span slot="label">{{honor.win.levels[i-1].desc}}</span> 
      </grid-item>
    </grid>

    <group-title class="honor-title">所向无敌 <sub>最长连胜 {{data.max_win_streaks}} 次</sub></group-title>
    <grid>
      <grid-item  v-for="i in 5" :key="i">
       <img slot="icon" :src="honor.max_win_streaks.icon" v-bind:class="{grey: data.max_win_streaks < honor.max_win_streaks.levels[i-1].count}">
       <span slot="label">{{honor.max_win_streaks.levels[i-1].desc}}</span> 
      </grid-item>
    </grid>

    <group-title class="honor-title">一箭双雕<sub>制造双杀 {{data.db_kill}} 次</sub></group-title>
    <grid>
      <grid-item  v-for="i in 5" :key="i">
       <img slot="icon" :src="honor.db_kill.icon" v-bind:class="{grey: data.db_kill < honor.db_kill.levels[i-1].count}">
       <span slot="label">{{honor.db_kill.levels[i-1].desc}}</span> 
      </grid-item>
    </grid>

    <group-title class="honor-title">毫发无损<sub>KO对方 {{data.ko}} 次</sub></group-title>
    <grid>
      <grid-item  v-for="i in 5" :key="i">
      <img slot="icon" :src="honor.ko.icon" v-bind:class="{grey: data.ko < honor.ko.levels[i-1].count}">
      <span slot="label">{{honor.ko.levels[i-1].desc}}</span> 
      </grid-item>
    </grid>

  </div>
</template>



<script>
import {Group,Divider,Grid, GroupTitle ,GridItem,CellBox,Cell} from 'vux'
import user from '../dao/user'
import honor from '../dao/honor'
export default {
    components:{
      Group,Divider,Grid, GridItem,CellBox,Cell,GroupTitle 
    },
    data() {
        return {
          data:{
          },
          honor:honor.list(),
        }
    },

    methods: {
      query(){
        var uid = this.$route.query.uid
        user.profile(uid).then((res)=>{
          let r= res.data
          this.data = r
        })
      }
    },
    created() {
        this.query()
    }
}
</script>

<style scoped>
.box{
  padding:5px;
}
.p-name{
  font-size:1.3rem;font-weight:bold;text-align:center;
}
.honor-title>sub{
  margin-left:15px;
  font-size: 0.8rem;
  color:#6a94d4;
}
span{
  font-size: .8rem;
}
.grey{
    filter:Gray; -webkit-filter: grayscale(100%);
}
.dashboard{
  text-align:center;
  font-color:#ccc;
  margin:1px;
  padding:1px;
  font-size:1.1rem;
}
</style>