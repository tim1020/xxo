let Game = require('./game.js')

const S_OVER    = 100
const S_KILL    = 5
const S_TO_KILL = 2
const S_BE_KILL = -2
const P1 = 1
const P2 = 2
const MAX_STEP   = 2

const maxScore = (score,turns) => {
    score.sort((a,b)=>{
        return turns == P2  ? a.score > b.score : a.score < b.score
    })
    return score[0]
}

const makePromise = (idx, val, from, to,step) => {
    return new Promise(async (resolve) => {
        let score  = 0
        let turns  = step % 2 == 1 ? P2 : P1
        let rival  = turns == P1 ? P2 : P1
        let game = new Game(val)
        let killed_nums = game.move(from,to)
        if(game.isOver(rival)) { 
            score = turns == P2 ? score + S_OVER : score - S_OVER
        }else{ //
            score = turns == P2 ? score + Math.pow(killed_nums,2) * S_KILL : score - Math.pow(killed_nums,2) * S_KILL
            step ++
            if(step <= MAX_STEP) { 
                let newGame = new Game(game.chessVal)
                let promises = []
                for(let from of newGame.getChess(rival)){
                    let nbEmpty = newGame.getEmptyNeighbors(from)
                    for(let to of nbEmpty){
                        promises.push(makePromise(idx,newGame.chessVal,from,to, step))
                    }
                }
                let r = await Promise.all(promises) 
                score += maxScore(r,turns).score
                resolve({idx,score}) 
            }
        }
        //
        //['1200','0120','0021','0210']
        //['2100','0210','0012','0120']
        resolve({idx,score}) 
    })
}

module.exports = {
     async run(val){
        let promises = []
        let myGame = new Game(val)
        let chess  = myGame.getChess(P2)
        for(let from of chess){
            let nbEmpty = myGame.getEmptyNeighbors(from)
            for(let to of nbEmpty){
                promises.push(makePromise({from,to},myGame.chessVal,from,to,1))
            }
        }
        let r = await Promise.all(promises)

        r.sort(()=>{return 0.5 - Math.random() > 0})
        console.log(r)
        r =  maxScore(r,P1)
        return r
    },
    P1:P1,
    P2:P2
}