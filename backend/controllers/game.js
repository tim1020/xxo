const conf = require('../config')
const TRACK_DEFAULT= 2860663125
const Game = require('../model/game')
const npc = require('../model/npc')

module.exports = {
    list: async (ctx)=>{
        try{
            let where = {}
            if(ctx.request.query.type =='in_play'){
                where.result = ''
            }else if(ctx.request.query.type =='finished'){
                where.result = {'$ne':''}
            }
            let options = {limit : 12,sort:{ctime:-1}}
            ctx.dao.setCol(conf.coll_games)
            let r = await ctx.dao.get(where,options)
            ctx.body = {code:200,data:r}
        }catch(err){
            ctx.body = {code:500,error:err}
        }
    },
    //查询棋局，指定gid时使用gid，没指定时使用当前uid
    query: async (ctx) => {
        try{
            let data = null
            let options= {}
            let where = {}
            if(ctx.request.query.gid){
                where._id = ctx.request.query.gid
            }else{
                where.uid = ctx.uid
                where.result= ''
                options = { sort:{ctime:-1} }
            }   
            ctx.dao.setCol(conf.coll_games)
            let r = await ctx.dao.getOne(where,options)
            if(r){
                data = r
            }
            ctx.body = {code:200,data:data}
        }catch(err){
            ctx.body = {code:500,error:err}
        }
    },
    //start a new gmae
    create: async (ctx) => {
        try{
            //todo:如果有正在进行的，直接返回
            let games = {
                uid:    ctx.uid,
                nick:   ctx.userInfo.nick, //冗余
                track:  [TRACK_DEFAULT],
                result: '',
                ctime:  Date.now()
            }
            ctx.dao.setCol(conf.coll_games)
            let gid = await ctx.dao.insert(games)
            if(gid == false) throw 'Insert DB fail'
            ctx.body = {code:200,data:games}
        }catch(err) {
            ctx.body = {code:500,error:err}
        }
    },
    //走棋
    mv: async (ctx)=>{
        try{
            let change = false
            let user = ctx.userInfo
            let wh = {_id:ctx.request.body._id}
            ctx.dao.setCol(conf.coll_games)
            let r = await ctx.dao.getOne(wh)
            if(!r || r.uid != ctx.uid) throw '参数错误'

            let lastTrack = r.track[r.track.length-1]
            let game = new Game(lastTrack)
            let killed_nums = game.move(ctx.request.body.from,ctx.request.body.to)
            if(killed_nums === false) throw 'Can not move here'
            if(killed_nums == 2){ //db_kill
                change = true
                user.db_kill += 1
            }
            r.track.push(game.chessVal)
            if(game.isOver(npc.P2)){
                r.result = npc.P1
                user.win    += 1
                user.score  += 3
                user.win_streaks += 1
                if(user.max_win_streaks < user.win_streaks) user.max_win_streaks = user.win_streaks
                if(game.getChess(npc.P1).length ==6){
                    user.ko += 1
                }
            }else if(game.isDraw()){ //平局，也可以加上平局局面形成之后多少步之后才算平
                r.result = 0
                user.score += 1
                user.win_streaks = 0
            }else{
                let result = await npc.run(game.chessVal)
                let mv = result.idx
                game.move(mv.from,mv.to)
                r.track.push(game.chessVal)
                if(game.isOver(npc.P1)){
                    r.result = npc.P2
                    user.win_streaks = 0
                }else if(game.isDraw()){ //平局
                    r.result = 0
                    user.score += 1
                    user.win_streaks = 0
                }
            }


            await ctx.dao.update(wh, r) //save game result
            
            if(r.result !== ''){
                user.games  += 1 
                user.win_rate = Math.round(((user.win / user.games) * 10000)) / 100
                change = true
            }
            if(change) {
                ctx.dao.setCol(conf.coll_user)
                await ctx.dao.update({_id:user._id},user)
            }
            ctx.body = {code:200, data:r }
        }catch(err){
            console.log(err)
            ctx.body = {code:500,error:err}
        }
    }
}