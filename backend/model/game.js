// 棋盘用一个unsig int32表示，每两个bit表示一个位置,0(00)表示空，1(01)表示p1，2(10)表示p2棋)
// 从高位-低位对应棋盘位置 1-16,
// 10 10 00 00 00 00 00 00 00 00 00 00 00 00 00  01
//  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15  16
// 棋盘位置， 
// ( 1)--( 2)--( 3)--( 4)
// ( 5)--( 6)--( 7)--( 8)
// ( 9)--(10)--(11)--(12)
// (13)--(14)--(15)--(16)
class Game {
    constructor(chessVal = 1430356650){
        this.chessVal = chessVal
        this.chess = []
        let p1 = 0,p2 = 0;
        for(let i=1;i<=16;i++){
            let r = this.query(i)
            this.chess[i] = r
            if(r==0){
                //do nothing
            }else if(r == 1){
               p1++ 
            }else if(r == 2){
               p2 ++ 
            }else{
                return false
            }
        }
        if(p1 > 6 || p2 > 6 || p1 < 1 || p2 < 1) {
            return false
        }
    }
    query(placeId){  
        let idx = 2 * (16 - placeId);
        return (this.chessVal & (3 << idx)) >>> idx
    }
    //返回杀棋的数量
    move(from,to){
        if(from < 1 || from > 16 || to < 1 || to > 16) return false;
        let player = this.query(from)
        if(player == 0 ) return false;
        let dst = this.query(to);
        if(dst != 0 || this.getEmptyNeighbors(from).indexOf(to) == -1) return false;
        //ok,move now
        this._set(from,0)
        this._set(to,player)
        let killed = this._getKilled(to)
        if(killed.length>0){
            for(let placeId of killed){
                this._set(placeId,0)
            }
        }
        return killed.length
    }
    isOver(player){
        let p = this.getChess(player)
        if(p.length < 2) return true;
        for(let v of p){
            let nb = this.getEmptyNeighbors(v)
            if(nb.length > 0) return false
        }
        return true
    }
    //是否平局(双方只剩2子判断为平局)
    isDraw(){
        return this.getChess(1).length == 2 && this.getChess(2).length == 2
    }
    getChess(player){
        let result = []
        for(let k in this.chess){
            if(this.chess[k] == player) result.push(k)
        }
        return result
    }
    //获取指定位置的相邻的位置
    getEmptyNeighbors(placeId){
        let result = [];
        placeId = parseInt(placeId)
        if(placeId > 4){
            let p = placeId - 4
            if(this.query(p) == 0) result.push(p);// ^
        }
        if(placeId < 13) {
            let p = placeId + 4
            if(this.query(p) == 0) result.push(p);// V
        }
        if(placeId % 4 != 1){
            let p = placeId - 1
            if(this.query(p) == 0) result.push(p);// <
        }
        if(placeId % 4 != 0){
            let p = placeId + 1
            if(this.query(p) == 0) result.push(p);// >
        }
        return result;
    }
    //设置某个位置的值
    _set(placeId,val){
        if(placeId > 16 || placeId < 1 || [0,1,2].indexOf(val) == -1) return false
        let idx = 2 * (16 - placeId)
        this.chessVal &= ~(3 << idx)
        if(val == 1)       this.chessVal |= (1 << idx)
        else if(val == 2)  this.chessVal |= (1 << idx+1)
        this.chessVal = this.chessVal >>> 0
        this.chess[placeId] = val
    }
    //获取killed的位置(最多两个)
    _getKilled(placeId){
        let killed = []
        let player = this.query(placeId)
        if(player != 1 && player != 2) return false
        let match = (player == 1) ? ['2110','0211','1120','0112'] : ['1220','0122','2210','0221'] //符合被杀的排列，killed位置刚好在index
        //place所在的行和列
        let row = Math.ceil(placeId / 4)
        let col = placeId % 4
        if(col == 0) col = 4
        let rs = (row-1)*4+1  //行的第一个
        let rowStr = [this.query(rs),this.query(rs+1),this.query(rs+2),this.query(rs+3)].join('')
        let colStr = [this.query(col),this.query(col+4),this.query(col+8),this.query(col+12)].join('')
        let pos = match.indexOf(rowStr)
        if(pos != -1){
            killed.push(rs + pos)
        }
        pos = match.indexOf(colStr)
        if(pos != -1){
            killed.push(col + pos*4)
        }
        return killed
    }
}  

module.exports = Game