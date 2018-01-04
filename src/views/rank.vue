//我的profile页面
<template>
  <div>
     <group>
     <tab v-model="selectIdx">
      <tab-item @on-item-click="query">积分</tab-item>
      <tab-item @on-item-click="query">胜率</tab-item>
    </tab>
    </group>

    <group>
        <div class="rank-items" v-for="(item,k) in this.items" @click="navi(item._id)">
          <span  class="rank" v-bind:class="{'rank-hl': k < 3}"> {{k+1}}</span>
          <span class="rank-name">
            {{item.nick}}<span class="avatar-lv">lv.{{item.lv}}</span>
          </span>
          <span class="rank-right">&raquo;</span>
          <span class="rank-val" v-show="selectIdx==0">{{item.score}}</span>
          <span class="rank-val" v-show="selectIdx==1">{{item.win_rate}} %</span>
        </div>
    </group>

  </div>
</template>

<script>
import {Group, Tab, TabItem,ButtonTab,ButtonTabItem} from 'vux'
import userDao from '../dao/user'

let orderList = {0:'score',1:'win_rate'}

export default {
    components:{
      Group,Tab,TabItem,ButtonTab,ButtonTabItem
    },
    data() {
        return {
            selectIdx:0,
            items:[],
        }
    },
    methods:{
        query(){
            let order = orderList[this.selectIdx]
            userDao.rank(order).then( res => {
              this.items = res.data
            })
        },
        navi(uid){
          this.$router.push({path:'/profile', query:{uid: uid }})
        }
    },
    created() {
        this.query()
    },
}
</script>

<style scoped>
.rank-items{
  margin:.5rem;padding:0.3rem;border-bottom:1px solid #ccf;font-size:1.15rem;
}
.rank{font-size:1.35rem;font-weight:bold;}
.rank-hl{color:#dd4822;}
.rank-right{float:right;}
.rank-val{float:right;margin-right:100px;}
.avatar-lv{
    color:#ccc;
    background-color:red;
    font-size:0.5rem;
    padding: 3px 5px 3px 8px;
    border-radius:8px;
}
</style>