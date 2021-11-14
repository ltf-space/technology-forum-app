<template>
  <div class="main">
    <div class="item" v-for="(item,index) in videoList" :key="index">
      <div class="title">{{ item.title }}</div>
      <van-icon  v-if="isIcon" color="#eee" style="float: right;padding-top: 3px" name="cross" @click="test"/>
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
// import { FindAllVideo } from "@/api/video";

export default {

  data() {
    return {
      base:BASE_RUL,
      windowWidth: document.documentElement.clientWidth - 30,  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
      playHeight: 0,
      // src: require('../assets/test.mp4'),
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
    test(){
      console.log(111);
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