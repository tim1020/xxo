//游戏现场
<template>
<div id="main">
  <div class="title">{{result|transResult}}棋手: {{nick}}</div>
  <ChessBoard :chess="track[idx]|transTrack" :turns="''""></ChessBoard>


  <div class="btn-bar">
      <button v-show="btnPlay" @click="next">下一步</button>
      <button v-show="btnPlay" @click="setMode(true)">自动</button>
      <button v-show="btnAuto" @click="setMode(false)">切回手动</button>
      <button v-show="btnReplay" @click="reload">重看</button>
      <button @click="back2list">返回列表</button>
  </div>

  <div class="dia" v-transfer-dom>
      <x-dialog v-model="finished">
        <div class="dia-title">比赛结束</div>
        <div class="dia-content">
            <div v-if="this.result == 1">棋手 {{nick}} 赢得了比赛</div>
            <div v-if="this.result == 2">棋手 {{nick}} 输掉了比赛</div>
            <div v-if="this.result == 0">战成平局</div>
        </div>
        <div @click="finished=false">
          <button>好</button>
        </div>
      </x-dialog>
  </div>

</div>
</template>

<script>
import ChessBoard from '../components/chess-board'
import {XDialog,Group,TransferDomDirective as TransferDom} from  'vux'
import gameDao from '../dao/game'
import utils from '../utils'

const intval_auto     = 2000 //自动走棋间隔
const intval_live     = 8000 //更新实况间隔
let autoTimer = null
let liveTimer = null
let gid       = null
let lastIdx   = 0
let nums      = 0;

export default {
    directives: {
        TransferDom
    },
    components:{Group,ChessBoard, XDialog},
    data(){
        return {
            nick:"",
            result:'',
            track:2860663125,
            mode: 0,
            idx : 0,
            finished:false,
            replay:false,
            btnPlay:true,
            btnAuto:false,
            btnReplay:false
        }
    },
    created() {
      if(this.$store.state.game.gid){
        gid = this.$store.state.game.gid
      }else if(this.$route.query.gid){
        gid = this.$route.query.gid
        this.$store.commit('set_game_gid',gid);
      }
      this.idx = this.$store.state.game.idx || 0
      this.init()
    },
    filters:{
      transTrack(val){
        return utils.listChess(val)
      },
      transResult(re){
        let result = ''
        if(re === '') result = '[进行中] '
        return result;
      }
    },
    destroyed () {
      clearInterval(liveTimer)
      clearInterval(autoTimer)
    },
    methods:{
        init(){
          gameDao.query(gid).then((res) =>{
            this.track  = res.data.track
            this.nick   = res.data.nick
            this.result = res.data.result
            lastIdx = this.track.length -1

            if(this.result===''){ //未结束
              //todo: 超过n小时的不再直播，提示
              this.$store.commit('set_game_mode',1)
              this.btnPlay = false
              this.idx = lastIdx
              liveTimer = setTimeout(this.query,intval_live)
            }
          })
        },
        query(){
          gameDao.query(gid).then((res) =>{
            this.track  = res.data.track
            this.result = res.data.result
            lastIdx     = this.track.length -1
            if(this.idx < lastIdx){ //
              this.live_next()
            }else{
              if(this.$store.state.game.mode) {
               liveTimer = setTimeout(this.query,intval_live)
              }
            }
          })
        },
        live_next(){
          this.idx ++
          this.$store.commit('set_game_idx',this.idx);
          if(this.idx == lastIdx){ //走完
            if(this.result){ //比赛完成
              this.setFinish()
            }else{ //比赛未完成，继续查
              liveTimer = setTimeout(this.query,intval_auto)
            }
          }else{ //未走完，继续
            liveTimer = setTimeout(this.live_next,intval_auto)
          }
        },
        next(clear){
          this.idx ++
          this.$store.commit('set_game_idx',this.idx);
          if(this.idx >= lastIdx){
            return this.setFinish()
          }
        },
        setMode(auto=true){
          if(auto){
            this.mode = 1
            autoTimer = setInterval(this.next, intval_auto)
            this.btnAuto = true
            this.btnPlay = false
          }else{
            this.mode = 0
            if(autoTimer!=null) clearInterval(autoTimer)
            this.btnAuto = false
            this.btnPlay = true
          }
        },
        reload(){
          this.btnReplay = false
          this.btnPlay = true
          this.idx = 0
          this.$store.commit('set_game_idx',0);
          this.mode = 0 //重置为手动
          this.btnAuto = false
        },
        setFinish(){
          this.finished = true
          this.btnReplay = true
          this.btnPlay = false
          this.btnAuto = false
          if(autoTimer != null){
              clearInterval(autoTimer)
          }
        },
        back2list(){
          this.$store.commit('set_game_gid','')
          this.$store.commit('set_game_mode','')
          this.$store.commit('set_game_idx',0);
          this.$router.push("/game_list")
        }
    }
}

</script>

<style scoped>
  .btn-bar{
      margin:3px;
      padding:3px;
      text-align:center;
  }
  .btn-bar button{
      margin:2px;
      padding:6px;
      width:100px;
      font-size:1rem;
  }
  .dia{
    padding:10px;
  }
  .dia-title{
    font-size:1rem;
    margin:5px;
    padding:5px;
    border-bottom:1px solid #ccc;
  }
  .dia-content{
    padding:10px;
    font-size:1.3rem;
  }
  .dia button{
    font-size:1rem;
    padding:5px;
    margin:5px;
    background-color:#ccc;
    width:100%;
  }
  .title{text-align:center;font-size:1.2rem;}
</style>