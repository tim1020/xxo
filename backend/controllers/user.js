//用户相关接口
const conf = require('../config')
const crypto = require('crypto');
const md5 = (str) => {
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}
const lv=(score)=>{
    let lv = parseInt(score / 10).toString(2).length - 1
    if(lv == 0) lv=1
    return lv
}

module.exports = {
    profile : async (ctx) => {
        try{
            let data = null
        	let uid = ctx.request.query.uid
            if(!uid){ //没指定，表示当前登录用户
                data = ctx.userInfo
            }else{
                ctx.dao.setCol(conf.coll_user)
                let user = await ctx.dao.getOne({_id:uid})
                if(user == false) throw 'User Not Found'
                data = user
            }
            data.lv             = lv(data.score) 
            ctx.body = {code:200,data:data }
        }catch(err){
            ctx.body = {code:500,error:err}
        }
    },
    reg: async (ctx) =>{
        try{
            let nick = ctx.request.body.nick
            if(nick.length < 2 || nick.length > 6) throw '昵称长度要求2－6个字符'
            let token = md5(nick)
            ctx.dao.setCol(conf.coll_user)
            let uid = await ctx.dao.insert({nick,token,games:0,win:0,score:0,ko:0,db_kill:0,win_streaks:0,max_win_streaks:0,win_rate:0})
            if(uid == false) throw 'Insert DB fail'
            ctx.body = {code:200,data:{uid,token}}
        } catch(err){
            ctx.body = {code:500,error:err}
        }
    },
    rank: async (ctx)=>{
        try{
            let options = {limit:9}
            if(ctx.request.query.order == 'score') options.sort = {score: -1}
            else if(ctx.request.query.order == 'win_rate') options.sort = {win_rate: -1}
            options.fields = {nick:1,score:1,win_rate:1,_id:1}
            ctx.dao.setCol(conf.coll_user)
            let r = await ctx.dao.get({},options)
            if(r==false) throw '没有数据'
            let data = []
            for(let d of r){
                d.lv = lv(d.score)
                data.push(d)
            }
        	ctx.body = {code:200, data:data }
        }catch(err){
            ctx.body = {code:500,error:err}
        }
    }
}