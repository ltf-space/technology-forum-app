<template>
  <div class="wrapper-bar">
    <van-nav-bar
      class="nav-bar"
      title="视频列表"
      left-arrow
      @click-left="handleBack"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div style="margin-bottom: 66px">
        <VideoList :videoList='videoList' :isIcon='true' @reloadVideo = 'reloadVideo'/>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { BASE_RUL } from "@/utils/request";
import { userVideo } from "@/api/video";
import VideoList from "@/components/VideoList";
export default {
  name:'UserVideo',
  components:{ VideoList },
  data(){
    return {
      // 视频列表
      videoList: [],
      // 用户标识
      uid:'',
      isLoading: false,
    }
  },
  created(){
    this.uid = localStorage.getItem("uid");
    this.getVideos()
  },
  mounted() {
  },
  methods: {
    onRefresh() {
      this.getVideos()
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    // 接收子组件传过来的事件，重新加载视频列表
    reloadVideo(){
      this.getVideos()
    },
    // 获取用户所有视频
    getVideos(){
      userVideo(this.uid).then( res => {
        if (!res.status) return
        this.videoList = res.data
        console.log(this.videoList)
      })
    },
    // 点击左上角返回按钮触发
    handleBack(){
      this.$router.back()
    }
  },
}
</script>
<style scoped>
.wrapper-bar{
  height: 100vh;
}
.nav-bar{
  box-shadow: 0 2px 3px #eee;
  margin-bottom: 6px;
}
</style>