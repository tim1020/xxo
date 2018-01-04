<template>
<div id="main">
    <div class="title">{{turns|transTurn}}</div>

    <ChessBoard :chess="track|transTrack" :turns="turns" @mv="mvchess"></ChessBoard>

    <div class="btn-bar">
        <button v-show="btnShow" @click="start">开始</button>
    </div>

    <div class="dia" v-transfer-dom>
      <x-dialog v-model="finished">
        <div class="dia-title">比赛结束</div>
        <div class="dia-content">
            <div v-if="this.result == 1">
                <div>恭喜你，获得胜利。</div>
                <img src="/static/happy.jpg" width="120">
            </div>
            <div v-if="this.result == 2">
                <div>你输了...下次加油</div>
                <img src="/static/more.jpg" width="120">
            </div>
            <div v-if="this.result === 0">
                <div>战成平局...继续努力</div>
            </div>
        </div>
        <div>
          <button  @click="finish">好</button>
          <button @click="replay">回放</button>
        </div>
      </x-dialog>
  </div>

</div>
</template>

<script>
import ChessBoard from '../components/chess-board'
import {Group,XDialog,TransferDomDirective as TransferDom} from  'vux'
import gameDao from '../dao/game'
import utils from '../utils'
let gid = ''

export default {
    directives: {
        TransferDom
    },
    components:{Group,ChessBoard,XDialog},
    data(){
        return {
            btnShow: true,
            track:2860663125,
            finished:false,
            result:'',
            turns: 0,
        }
    },
    methods:{
        init(){
            gameDao.query().then((res)=>{
                if(res.data && res.data._id){
                    let idx = res.data.track.length -1
                    gid = res.data._id
                    this.track = res.data.track[idx]
                    this.turns = 1
                    this.btnShow = false
                }
            })
        },
        //start a new game
        start(){
            gameDao.create().then((res) => {
                this.track = res.data.track[0]
                gid = res.data._id
                this.btnShow = false
                this.turns = 1
                this.result = ''
            })
        },
        mvchess(from,to){ //走棋处理
            if(this.finished) return
            this.turns = 2
            gameDao.next(gid,from,to).then((res)=>{
                if(!res) {
                    this.turns = 1
                    return
                }
                this.track  = res.data.track[res.data.track.length-1]
                this.result = res.data.result
                if(this.result !==''){ //结束 
                    this.finished = true
                    return
                }
                this.turns = 1
            })
        },
        replay(){
            this.$router.push('/game?gid='+ gid)
        },
        finish(){
            this.btnShow    = true
            this.track      = 2860663125
            this.finished   =  false
            this.result     = ''
            this.turns      = 0
        }
    },
    filters:{
      transTrack(val){
        return utils.listChess(val)
      },
      transTurn(turn){
        if(turn == 1) return 'Your turns'
        if(turn == 2) return 'Waitting...'
        return '请点击开始'
      }
    },
    created(){
        this.init()
    }
}
</script>

<style scoped>
.btn-bar{
    margin:5px;
    padding:5px;
    text-align:center;
}
.btn-bar button{
    margin:5px;
    padding:5px;
    font-size:1.3rem;
    width:120px;
}
.title{
    text-align:center;
    font-size:1.2rem;
}
.dia{
    padding:10px;
}
.dia-title{
    font-size:1.5rem;
    margin:5px;
    padding:5px;
    border-bottom:1px solid #ccc;
}
.dia-content{
    padding:10px;
    margin:10px;
}
button{
    font-size:1.2rem;
    padding:5px;
    margin:5px;
    background-color:#ccc;
    width:40%;
}

</style>