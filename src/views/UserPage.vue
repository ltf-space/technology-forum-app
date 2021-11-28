<template>
  <div class="body-wrapper">
    <div class="img-content"></div>
    <!-- 左上角返回按钮 -->
    <van-icon 
      class="go-back" 
      name="arrow-left" 
      size="30px"
      @click="goBack" />
      <!-- 用户头像，昵称部分 -->
    <!-- 头像 -->
    <van-image 
      class="round"
      round
      width="60"
      height="60"
      :src="base + '/file/image/' + userInfo.author.avatar"
    />
    <div class="user-content">
      <div class="user-info">
          <!-- 昵称，认证 -->
        <div>
          <div class="author-name">{{userInfo.author.nickname}}</div>
          <van-icon color="#06f" name="wechat-pay"/>
          <span class="author-des">{{userInfo.author.school}}</span>
        </div>
        <!-- 关注 -->
        <div>
          <van-button type="default">
            <van-icon name="plus" />
            关注
          </van-button>
        </div>
      </div>
      <div class="user-article-video">
        <van-tabs>
          <van-tab title="文章列表">
            <user-article-list class="listContent" :list="userInfo" :isIcon='false'></user-article-list>
          </van-tab>
          <van-tab title="视频列表">
            <video-list :videoList='userVideo'></video-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { userArticle } from '../api/article'
import { userVideo } from '../api/video'
import {BASE_RUL} from "@/utils/request";
import UserArticleList from "@/components/UserArticleList";
import VideoList from "@/components/VideoList";
export default {
  name: "UserPage",
  components: { UserArticleList ,VideoList },
  data() {
    return {
      // 用户id
      uid: "",
      // 用户文章信息
      userInfo:null,
      // 用户视频信息
      userVideo:null,
      base:BASE_RUL
    };
  },
  created() {
    this.uid = this.$route.params.uid;
    this.getUserInfo(this.uid)
  },
  methods: {
    // 获取用户信息
    async getUserInfo(uid){
      const res_article = await userArticle(uid)
      if(!res_article.status)this.$toast.info('获取用户文章信息失败')
      this.userInfo = res_article.data
      const res_video = await userVideo(uid)
      if(!res_video.status)this.$toast.info('获取用户视频信息失败')
      this.userVideo = res_video.data
      console.log(res_video);
    },
    goBack(){
      this.$router.back()
    }
  },
};
</script>
<style scoped>
.body-wrapper{
  width: 100%;
  height: 100vh;
  position: relative;
  /* background: #eee; */
}
.img-content{
  width: 100%;
  height: 160px;
  background: url('../assets/background.jpg') no-repeat 0 0 / 100% 160px ;
  position: relative;
}
.go-back{
  position: fixed;
  left: 8px;
  top: 10px;
}
.round{
  position: absolute;
  left: 10px;
  top: 135px;
  border: 1px solid rgb(207, 106, 106);
}
.user-info{
  margin: 40px 0 0 0;
  padding: 6px 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #eee;
}
.author-name {
  margin-bottom: 2px;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, .9);
}
.author-des {
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, .6);
}
.listContent{
  padding: 0 6px;
  height: calc(100vh - 294px);
  overflow-y: auto;
}
</style>