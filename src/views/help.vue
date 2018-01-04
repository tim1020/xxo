//玩法
<template>
  <div>

    <tab>
        <tab-item selected @on-item-click="tabSelected=1">游戏规则</tab-item>
        <tab-item @on-item-click="tabSelected=2">成就和等级</tab-item>
        <tab-item @on-item-click="tabSelected=3">操作说明</tab-item>
    </tab>


    <div v-show="tabSelected==1">
        <div class="title"> &#9836; 走子</div>
        <div class="content">
            <p>双方轮流走棋，每次只能走一个棋子</p>
            <p>只能水平或垂直方向上移动，且每次只能走到相连的<span class="hlight">空白结点</span>上，不能跳跃，也不能走到已有棋的位置</p>
        </div>

        <div class="title"> &#9836; 吃子</div>
        <div class="content">
            <p>当某方走棋后，该子所在的垂直或水平方向上与对方形成XXO格局（即己方两子与对方一子在同一直线上形成2对1的紧密相连）时，即可吃掉对方该子</p>
            <p>若某方走棋后，在该子的垂直和水平方向上同时形成XXO，则可以同时杀掉对方这两个方向上的棋子，完成<span class="hlight">双杀</span></p>
        </div>
 
        <div class="title"> &#9836; 胜负判定</div>
        <div class="content">
            <p>&raquo; 当某方只剩一子时，对方获胜</p>
            <p>&raquo; 当某方棋子全部无路可走时，对方获胜</p>
            <p>&raquo; 当双方棋子均只剩两个时，则为平局</p>
        </div>
    </div>

    <div v-show="tabSelected==2">
        <div class="title"> &#9836; 积分和等级</div>
        <div class="content">
            <p>&#10173; 总分最低为0，不设负分; 初始等级为1</p>
            <p>&#10173; 根椐胜负平的计分</p>
            <p>&raquo;  胜3分，负0分，平1分</p>
            <p>&#10173; 根椐分数来计算等级，当分数达到 （2的N次方） * 10 时升到N级</p>
            
            <p>2级: >= 2*2*10，即40分</p>
            <p>3级: >= 2*2*2*10，即80分</p>
            <p>4级: >= 160分</p>
            <p>5级: >= 320分</p>
            <p>...</p>
        </div>

        <div class="title"> &#9836; 成就系统</div>
        <div class="content">
            <p>&#10173; 志在参与：参加比赛的次数</p>
            <p>&#10173; 常胜将军：获得比赛胜利的次数</p>
            <p>&#10173; 所向无敌：获得连胜的场次</p>
            <p>&#10173; 一箭双雕：走出双杀的次数</p>
            <p>&#10173; 毫发无损：KO对方次数</p>
        </div>
    </div>

    <div v-show="tabSelected==3">
        <div class="title"> &#9836; 走棋</div>
        <div class="content">
            <p>点击选中要走的棋(连续点选时以最后一个为选中)，再点击要走的目的位置</p>
        </div>
        <!--当前只有一个电脑AI，暂时屏蔽
        <div class="title"> &#9836; 选择对手</div>
        <div class="content">
            <p>进入游戏界面时，会自动随机分配一个对手，点击“开始”可以开始游戏</p>
            <p>点击“切换对手”，系统随机重新分配对手</p>
            <p>点击“选择对手”，可以弹出的列表中选择一个对手</p>
        </div>
        -->

        <div class="title"> &#9836; 围观及重放</div>
        <div class="content">
            <p>点击下方工具栏进入围观界面，在围观界面选择要观看的比赛</p>
            <p>一局游戏结束后，可点击“回放”按钮即时进行回放</p>
            <p>可设置手动和自动模式</p>
        </div>

    </div>

  </div>
</template>

<script>
import {Tab, TabItem} from 'vux'

export default {
    components:{
      Tab,TabItem
    },
    data(){
        return {
            tabSelected:1
        }
    },
    methods:{
    }
}
</script>

<style scoped>
.title{
    font-weight:bold;
    font-size:1.25rem;
    margin-top:1rem;
    padding-top:1rem;
    color:#8f8f8f;
}
.content{
    padding:0.5rem;
    font-size:1rem;
}
.content p{
    text-indent:2rem;
    line-height:2rem;
}
.hlight{
    font-weight:bold;
    color:#ee9911;
}
</style>