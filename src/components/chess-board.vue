<template>
<div id="board-box">
	<div id="board" class="chess-board">
		<table>
			<tr v-for="row in 4">
				<td :id="id(row,col)" @click="pick" v-for="col in 4" v-bind:class="{'hl':id(row,col) == from}">
					<div class="chess chess-black" v-if="chessPlace('p1',row,col)"></div>
					<div class="chess chess-white" v-if="chessPlace('p2',row,col)"></div>
				</td>
			</tr>
		</table>
	</div>
</div>
</template>

<script>
import utils from '../utils'
export default {
    name: 'check-board',
    data(){
    	return {
    		from:''
    	}
    },
	props:['chess','turns'],
	methods:{
		chessPlace(player,row,col){
			let result = false
			let idx = (row-1) * 4 + col
			let chesses = []
			if (this.chess){
				if(player == 'p1' && this.chess.p1 !=undefined){
					chesses = this.chess.p1
				} else if(player == 'p2' && this.chess.p2 !=undefined){
					chesses = this.chess.p2
				}
				if(-1 !== chesses.indexOf(idx)){
					result = true
				}
			}
			return result
		},
		id(row,col){
			let idx = (row-1) * 4 + col
			return idx
		},
		pick(e){
			if(!this.turns) return
			if(this.turns == 2 ){
				utils.dlog('npc turn,do nothing')
				return
			}
			let pos = parseInt(e.currentTarget.id);
			if(-1 !== this.chess.p1.indexOf(pos)){ //如果该位置是自己的棋，则选中
				utils.dlog('pick pos='+pos)
				this.from = pos
				
			}else if(this.from){
				if(this.isNear(this.from,pos) && -1 == this.chess.p2.indexOf(pos)){ //该位置相邻且没有棋在
					this.$emit('mv' ,this.from, pos);
					this.from = '';
				}else{
					utils.dlog('can not mv here')
				}
			}
		},
		isNear(from,to){ //从数字判断是否相邻
			if(from > 16 || to > 16 || from < 1 || to < 1) return false
			if(from - to != 1 && to - from != 1 && from - to != 4 && to - from != 4){
				return false
			}
			if (from % 4 == 1 && from - to == 1){ //左则，不可以往左
				return false
			}
			if (from % 4 == 0 && to - from == 1){ //右则，不可以往右
				return false
			}
			return true
		}
	}
}
</script>

<style scoped>
#board-box {
  width: 100%; 
  margin:10px 0;
}
#board{
	background:url('/static/grid.svg') no-repeat;
	background-size:100% 100%;
	border:0.5rem double #888;
    margin: auto;
}
.chess-board{
	width:360px;
	height:360px;
}
@media (min-width: 701px){
	.chess-board{
		width:400px;
		height:400px;
	}
}

table{
	width:100%;height:100%;
}
td{
	width:25%;height:25%;
}
.hl{
	 border:5px dashed #000;
}
.chess{
	margin:auto;
	border:1px solid #ccc;
	width:75%;height:75%;
	border-radius:50%;
	box-shadow:10px 10px 15px rgba(0,0,0,0.6);
}
.chess-black{
	background:radial-gradient(16px 16px at 25px 25px,#fff,#000);
}
.chess-white{
	background:radial-gradient(16px 16px at 25px 25px,#fff,#eee);
}
</style>