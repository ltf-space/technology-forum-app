<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div style="margin-bottom: 66px">
        <VideoList :videoList='videoList'/>
      </div>
    </van-pull-refresh>

  </div>
</template>

<script>
import VideoList from "@/components/VideoList";
import {FindAllVideo} from "@/api/video";

export default {

  data() {
    return {
      isLoading: false,
      // 视频列表
      videoList: [],
    }
  },
  components: {VideoList},
  created(){
    this.getAllVideo()
  },
  mounted() {
  },


  methods: {
    // 查询所有视频
    getAllVideo(){
      FindAllVideo().then((res) => {
        if (!res.status) return
        this.videoList = res.data
      })
    },
    onClickRight() {
      this.$router.push('/upload')
    },
    onRefresh() {
      this.getAllVideo()
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
  },

}
</script>

<style scoped>

</style>
