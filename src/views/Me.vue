<template>
  <div class="main">
    <div class="wrapper_top">
      <div class="wrapper_child">
        <van-image
          v-if="user"
          round
          width="60"
          height="60"
          :src="base + '/file/image/' + user.avatar"
        />
        <van-image
          v-else
          round
          width="60"
          height="60"
          src="../assets/photo.jpeg"
        />
        <div class="des" v-if="user">
          <div class="des-name">{{ user.nickname }}</div>
          <div style="display: flex; padding-top: 7px">
            <van-icon color="#06f" name="wechat-pay" />
            <span class="author-des">{{ user.school }}</span>
          </div>
        </div>
        <div class="des2" v-else>请登录</div>
      </div>
      <van-button class="btn" v-if="user" @click="exitLogin">注销</van-button>
      <van-button class="btn" v-else @click="goLogin">登录</van-button>
    </div>
    <div class="card card-content">
      <div class="wrapper-title">
        <van-icon name="friends-o" size="16px" class="icon"/>
        <div class="card-title">我的数据</div>
      </div>
      <van-row style="text-align: center" v-if="!user">
        <van-col span="8" class="card-item">
          <div class="card-d1">文章</div>
        </van-col>
        <van-col span="8" class="card-item" >
          <div class="card-d1">视频</div>
        </van-col>
        <van-col span="8" class="card-item">
          <div class="card-d1">评论</div>
        </van-col>
      </van-row>
      <div id="main-echarts" v-else></div>
    </div>
    <div class="card card-content2">
      <div class="wrapper-title">
        <van-icon name="apps-o" class="icon" size="16px"/>
        <div class="card-title">内容管理</div>
      </div>
      <van-cell title="我的文章" is-link value="文章" @click="goPathArticle"/>
      <van-cell title="我的视频" is-link value="视频" @click="goPathVideo"/>
    </div>
  </div>
</template>

<script>
import { BASE_RUL } from "@/utils/request";
import * as echarts from 'echarts';
export default {
  data() {
    return {
      base: BASE_RUL,
      // 用户信息
      user: null,
      // 默认显示文章列表
      active:0,
      // echarts对象
      mycharts:null
    };
  },
  components:{
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user")) || null;
    // console.log(this.user.articleCount);
  },
  mounted(){
    if(this.user){

      window.onresize = () => {
        this.mycharts.resize()
      }
      //初始化echarts对象
      this.mycharts = echarts.init(document.getElementById("main-echarts"))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: '生活论坛',
            type: 'pie',
            radius: ['40%', '70%'],
            // 控制图形的位置（左右，上下）
            center:['40%','45%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              // 点击图形出现辅助信息，false不显示
              label: {
                show: false,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.user.articleCount, name: '文章数量' },
              { value: this.user.videoCount, name: '视频数量' },
              { value: this.user.commentCount, name: '评论数量' },
            ],
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            // 点击图形时会出现边框效果
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(255, 255, 255, 0.5)'
              }
            }
          }
        ]
      };
  
      option && this.mycharts.setOption(option);
    }
  },
  methods: {
    // 退出登录
    exitLogin() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "確定要注销用户吗",
        })
        .then(() => {
          // on confirm
          localStorage.clear();
        })
        .catch(() => {
          // on cancel
        });
    },
    // 跳转路径方法
    goToPath(path){
      return this.$router.push(path)
    },
    // 去到登陆界面
    goLogin(){
      this.goToPath('login')
    },
    goPathArticle(){
      if(!this.user){
        this.$toast('请先登录')
        return
      }
      this.goToPath('/userArticle')
    },
    goPathVideo(){
      if(!this.user){
        this.$toast('登录方可查看')
        return
      }
      this.goToPath('/UserVideo')
    }
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  letter-spacing: 1px;
}
/* 图标区域 */
#main-echarts{
  width: 100%;
  height: 150px;
}
.card-content2{
  height: 140px;
}
.card-content {
  height: 180px;
}
.wrapper-title{
  display: flex;
  justify-content:flex-start;
  align-items: center;
  margin-left: 20px;
}
.icon{
  margin-top: 4px;
  margin-right: 2px;
}
.card-title {
  font-size: 12px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  padding-top: 12px;
  padding-bottom: 10px;
}

.card-item {
  font-size: 18px;
}

.card-d1 {
  font-size: 11px;
  padding-top: 5px;
  color: rgba(0, 0, 0, 0.8);
}

.main {
  padding: 20px;
  height: calc(100vh - 136px);
  overflow-y: auto;
}
.wrapper_top {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.wrapper_child {
  display: flex;
  justify-content: space-between;
}
.des {
  padding-left: 20px;
  letter-spacing: 1px;
  padding-top: 6px;
}
.des2{
  padding-left: 20px;
  letter-spacing: 1px;
  padding-top: 16px;
  font-weight: bold;
}
.des-name {
  font-size: 18px;
  padding-left: 3px;
}

.author-des {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  padding-left: 2px;
}
::v-deep .van-tabs__line {
  width: 20px;
  background-color: #0066ff;
}
</style>