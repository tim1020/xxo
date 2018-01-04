//棋局相关处理
let dao = require('./')
let config = require("../config")
module.exports = {
    //棋局列表
    list(params){
        return dao.send(config.API.game_list, params)
    },
    //查询用户最新未完成的棋局
    query(gid){
        return dao.send(config.API.game_query,{gid:gid})
    },
    //创建比赛
    create(){
        return dao.send(config.API.game_create,)
    },
    //走一步,返回结果
    next(gid,from,to){
        return dao.send(config.API.game_mv,{_id:gid,from:from,to:to},'post')
    }
}