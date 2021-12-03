<template>
  <div class="main">
    <div class="item" v-for="(item,index) in videoList" :key="index">
      <div class="title">{{ item.title }}</div>
      <van-icon  v-if="isIcon" color="#eee" style="float: right;padding-top: 3px" name="cross" @click="delVideo(item.uid,item.id)"/>
      <div class="des">{{ item.type }}｜发布时间 {{ item.createAt }}</div>
      <div class="play" :style="'height:' + playHeight + 'px'">
        <video class="video"
               :width="windowWidth"
               :height="playHeight"
               controls
               >
          <source :src="base + '/file/video/' + item.fid" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_RUL } from "@/utils/request";
import { delUserVideo } from "@/api/video";

export default {

  data() {
    return {
      base:BASE_RUL,
      windowWidth: document.documentElement.clientWidth - 30,  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
      playHeight: 0,
      // 用户信息
      user:null
    }
  },
  props:{
    videoList:{
      type:Array,
      default:()=>[]
    },
    isIcon:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    this.playHeight = this.windowWidth * (9 / 16)
  },
  methods:{
    delVideo(uid,id){
      this.$dialog.confirm({
        title: '警告',
        message: '删除后无法撤回，是否删除',
      }).then(()=> {
        console.log('点击了确认按钮');
        delUserVideo(uid,id).then( res => {
          if(!res.status)return
          this.$toast.success('删除成功')
          this.user = JSON.parse(localStorage.getItem('user'))
          // 将视频数减少1
          this.user.videoCount--
          localStorage.setItem('user',JSON.stringify(this.user))
          // 重新加载视频列表
          this.$emit('reloadVideo')
        })
      }).catch(()=> {
        console.log('点击了取消按钮');
      })
    }
  }

}
</script>

<style scoped>

.main {
  padding: 0 15px;
  height: calc(100vh - 46px);
  overflow-y: auto;
}

.item {
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  line-height: 23px;
}

.des {
  font-size: 11px;
  color: rgba(0, 0, 0, .5);
  line-height: 30px;
}

.play {
  width: 100%;
  height: 120px;
  background: rgba(0, 0, 0, .9);
  border-radius: 10px;
}

video {
  border-radius: 10px;
}

</style>