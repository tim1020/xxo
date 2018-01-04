<template>
<div>
  <div v-show="logined">
    <div class="title"> &spades; 你已登录</div>
    <div class="content">
      <button @click="forwardIndex">进入游戏界面</button>
    </div>
  </div>
  <div v-show="!logined">
    <div class="title"> &raquo; 注册帐号</div>
    <div class="content">
      <p>请输入昵称，系统会为你自动分配一个帐号</p> 
      <p><input type="text" v-model="nick"></p>
      <p><span v-show="error">昵称要求 2－6 个字符</span></p>
      <p><button @click="reg">进入游戏</button></p>
      <p>注意：本程序没有完善用户系统，注册的帐号均为临时帐号</p>
    </div>
  </div>
</div>
</template>


<script>
import userDao from '../dao/user'
import config from '../config'
export default {
    data(){
        return {
            logined:false,
            nick:'',
            token:'',
            error:false,
        }
    },
    methods:{
        init(){
            if(localStorage.getItem(config.LS_TOKEN) && localStorage.getItem(config.LS_UID)){ //已登录
                this.logined = true
            }else{

            }
        },
        reg(){
            //简单验证 
            if(this.nick.length <2 || this.nick.length>6){
              this.error = true
              return
            }
            userDao.reg(this.nick).then((res) => {
              localStorage.setItem(config.LS_TOKEN,res.data.token)
              localStorage.setItem(config.LS_UID,res.data.uid)
              let path = this.$store.state.to_path || "/index"
              this.$router.replace(path)
          })
        },
        forwardIndex(){
            this.$router.replace('/index')
        }
    },
	created() {
       this.init()
    },
}
</script>

<style scoped>
h1 {text-align:center;padding-top:15px;font-size:1.8rem;}
h1 span {font-size:0.8rem;color:#cfcfcf;}
div {margin:5px;padding:5px;font-size:1rem;}

.title{
    font-weight:bold;
    font-size:1.3rem;
    color:#8f8f8f;
    padding:8px;
    border-bottom:1px dashed #ccc;
}
.content p{
    text-indent:2rem;
    line-height:2rem;
    padding-top:1rem;
}
input{
  height:22px;
}
button{
  padding:5px;
}
</style>
