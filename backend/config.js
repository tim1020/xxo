module.exports = {
    type: 2,
    dbConf : {                 //使用自动RESTful时所用的数据连接配置
        driver: 'mongodb',	
        url: 'mongodb://localhost:27017/xxo',
        database: 'xxo' 
    },
    coll_user:'user',
    coll_games:'games',
    port:3000,
    env:'dev'
}