<template>
  <div class="main">
    <div class="wrapper_top">
      <div class="wrapper_child">
        <van-image
          round
          width="60"
          height="60"
          :src="base + '/file/image/' + user.avatar"
        />
        <div class="des">
          <div class="des-name">{{ user.nickname }}</div>
          <div style="display: flex; padding-top: 7px">
            <van-icon color="#06f" name="wechat-pay" />
            <span class="author-des">{{ user.school }}</span>
          </div>
        </div>
      </div>
      <van-button class="btn" @click="exitLogin">注销</van-button>
    </div>
    <div class="card card-content">
      <div class="wrapper-title">
        <van-icon name="friends-o" size="16px" class="icon"/>
        <div class="card-title">我的数据</div>
      </div>
      <van-row style="text-align: center">
        <van-col span="8" class="card-item"
          >{{ user.articleCount }}
          <div class="card-d1">文章</div>
        </van-col>
        <van-col span="8" class="card-item"
          >{{ user.videoCount }}
          <div class="card-d1">视频</div>
        </van-col>
        <van-col span="8" class="card-item"
          >{{ user.commentCount }}
          <div class="card-d1">评论</div>
        </van-col>
      </van-row>
    </div>
    <div class="card card-content2">
      <div class="wrapper-title">
        <van-icon name="apps-o" class="icon" size="16px"/>
        <div class="card-title">内容管理</div>
      </div>
      <van-cell title="我的文章" is-link to="/userArticle" />
      <van-cell title="我的视频" is-link to="/UserVideo" />
    </div>
  </div>
</template>

<script>
import { BASE_RUL } from "@/utils/request";
export default {
  data() {
    return {
      base: BASE_RUL,
      // 用户信息
      user: null,
      // 默认显示文章列表
      active:0,
    };
  },
  components:{
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    // console.log(this.user.articleCount);
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
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
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
.card-content2{
  height: 140px;
}
.card-content {
  height: 100px;
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