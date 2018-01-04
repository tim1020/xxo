//围观页面
<template>
<div>
  <group><popup-radio title="类型" :options="types" v-model="type"></popup-radio></group>
  <group>
      <scroller lock-x scrollbar-y use-pulldown :pulldown-config="pulldwCfg" @on-pulldown-loading="query" v-model="status">
      <div class="box">
        <grid :cols="3" v-show="this.items.length >0">
          <grid-item v-for="item in this.items" :key="item._id">
            <div class="games-card" @click="navi(item._id)">
            <div class="card-h">{{item.nick}}</div>
            <div class="card-m">{{item.result|trans}}</div>
            <div class="card-b">{{item.ctime|dateFormat}}</div>
            </div>
          </grid-item>
        </grid>
        <div v-show="this.items.length == 0" class="tips-title">没有匹配的棋局,下拉刷新</div>
      </div>
      </scroller>
  </group> 
</div>
</template>
    
  
<script>
import {Group,PopupRadio,Scroller,Grid, GridItem,} from 'vux'
import gameDao from '../dao/game'

export default {
    components:{
      Group,PopupRadio,Scroller,Grid, GridItem
    },
    data() {
        return {
          type:"",
          uid:'',
          types:[
            {key:'in_play',value:'进行中'},
            {key:'finished',value:'已结束'},
            {key:'',value:'全部'},
          ],
          pulldwCfg:{
            downContent:    '下拉刷新',
            upContent:      '释放刷新',
            loadingContent: '加载中...'
          },
          items:[],
          status:{
            pulldownStatus: 'default'
          },
      }
    },
    watch:{
      'type': 'query'
    },
    created() {
      this.query()
    },
    filters:{
        trans(result){
          let re = ''
          if(result == 1) re =  'Winner'
          else if(result == 2) re = 'Loser'
          else if(result ===0) re = 'Draw'
          else re= '进行中'
          return re
        },
        dateFormat(tm){
          let d = new Date(tm); 
          return d.getFullYear()+ "-"+ (d.getMonth()+1)+"-"+d.getDate()
        }
    },
    methods:{
        query(){
            let params = {type:this.type}
            gameDao.list(params).then((res) => {
              this.items = res.data
              this.status.pulldownStatus = 'default'
            })
        },
        navi(id){
          this.$router.push("/game?gid="+id)
        }
    }
}
</script>

<style scoped>
.box{
  overflow: hidden;
}
.tips-title {
    font-size:1em;
    text-align:center;
    margin: 30px 5px;
}
.games-card{
  text-align:center;
  font-size:1rem;
  margin:2px 0px;
  border:1px solid #ccc;
}
.card-h{
  background-color:#c9c9c9;
  color:#333;
  padding:3px;
  font-weigth:bold;
}
.card-m{
  color:#cc0033;
  padding:2px;
}
.card-b{
  color:#888888;
  padding:2px;
}
</style>