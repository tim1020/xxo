module.exports = {
    dlog(){
        if(process.env.NODE_ENV != 'development') return;
        if(arguments.length > 1){
            console.log(arguments)
        } else{
            console.log(arguments[0])
        }               
    },
    //转换uint 32的值为棋盘的棋子,棋盘由左上至右下为位置为1－16
    listChess(val){
        let data = {p1:[],p2:[]};
        for(let i =  1; i <= 16; i++){
        	let placeId= 16 - i;
        	let mask = (3 << (2* placeId)) >>> 0;
        	let re =  (val & mask) >>> (2*placeId);
            if(re == 1){
                data.p1.push(i);
            } 
            if(re == 2 ) {
                data.p2.push(i);
            }
        }
        return data;
    }
}