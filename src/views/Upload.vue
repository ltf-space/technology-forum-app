<template>
  <div>
    <van-nav-bar
        :title="submitType === 'video' ? '上传视频' : '撰写文章'"
        left-text="取消"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
    >
      <template #right>
        <van-button style="margin-top: 5px" plain hairline round type="info" @click="submit" size="small">提交
        </van-button>
      </template>
    </van-nav-bar>
    <div style="padding: 5px 20px">
      <div>
        <label v-if="submitType === 'article'">
          <input v-model="articleForm.title" class="in-title" placeholder="请输入标题"/>
        </label>
        <label v-if="submitType === 'video'">
          <input v-model="videoForm.title" class="in-title" placeholder="请输入标题"/>
        </label>

        <!---->
        <label v-if="submitType === 'article'">
          <textarea style="height: 74vh"
                    v-model="articleForm.content"
                    class="in-content"
                    placeholder="请输入正文 （Markdown文档）"
                    rows="20"/>
        </label>
        <!---->

        <!---->
        <div v-if="submitType === 'video'" style="margin: 20px 0">
          <van-uploader v-model="fileList"
                        :after-read="onRead"
                        :max-count="1"
                        accept="video/*"/>
        </div>
        <!---->

        <div class="footer" @click="show = true">+ 稿件类型（必须选择）
          <van-tag round
                   style="font-size: 10px;letter-spacing: 1px;margin-left: 10px"
                   v-if="tag"
                   size="large"
                   plain type="primary">
            {{ tag }}
          </van-tag>
        </div>
        <!-- 类型标签 -->
        <van-popup v-model="show" round position="top" :style="{ height: '220px' }">
          <div style="padding: 20px">
            <van-tag round
                     @click="selectTag(item)"
                     v-for="(item, index) in tagList" :key="index"
                     size="large"
                     plain type="primary"
                     style="margin-bottom: 10px;margin-right: 10px">
              {{ item }}
            </van-tag>
          </div>
        </van-popup>
      </div>
    </div>

    <div class="poster-btn" v-if="submitType === 'article'" @click="posterShow = true">
      <img alt="" class="poster-btn-img" src="../assets/poster.svg">
      选择封面
    </div>
    <van-popup v-model="posterShow" round position="bottom" :style="{ height: '200px' }">
      <div style="padding: 20px;text-align: center">
        <div style="padding-bottom: 30px;letter-spacing: 1px;color: rgba(0,0,0, .7);font-weight: bold">选择文章封面</div>
        <van-uploader :after-read="onRead2" :max-count="1" v-model="posterFile"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {FindAllType, SaveArticle} from "@/api/article";
import axios from "axios";
import {SaveVideo} from "@/api/video";
import {checkArticleForm, checkVideoForm} from "@/utils/check";
import {BASE_RUL} from "@/utils/request";

export default {
  name: "Upload",

  data() {
    return {
      // 选择发表文章或者视频类型后显示的标签
      tag: '',
      posterFile: [],
      fileList: [],
      tagList: [],
      // 控制显示文章类型
      show: false,
      posterShow: false,
      submitType: this.$route.query.type,
      articleForm: {
        uid: localStorage.getItem("uid"),
        title: '',
        hasPoster: false,
        type: '',
        poster: '',
        content: '',
      },
      videoForm: {
        title: '',
        uid: localStorage.getItem("uid"),
        type: '',
        fid: '',
      },
      // 用户信息
      userInfo:null
    }
  },

  mounted() {
    FindAllType().then((res) => {
      if (res.status) this.tagList = res.data
    })
  },

  methods: {

    submit() {
      if (this.submitType === 'video') {
        this.submitVideo()
      } else {
        this.submitArticle()
      }
    },
// 视频上传成功后回调
    onRead() {
      let formData = new FormData()
      let file = this.fileList[0].file
      formData.append("file", file, file.name)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      axios.post(BASE_RUL + "/file/video", formData, config).then((res) => {
        console.log(res);
        if (res.status === 200) this.videoForm.fid = res.data
      })
    },
// 文章上传成功后回调
    onRead2() {
      let formData = new FormData()
      let file = this.posterFile[0].file
      console.log(file);

      formData.append("file", file, file.name)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      axios.post(BASE_RUL + "/file/image", formData, config).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.articleForm.hasPoster = true
          this.articleForm.poster = res.data
          this.posterShow = false
        }
      })
    },
// 发布视频
    submitVideo() {
      if (checkVideoForm(this.videoForm)) {
        SaveVideo(this.videoForm).then((res) => {
          console.log(res);
          if(!res.status) this.$toast.error("视频稿件发布失败")
          this.$toast.success("视频稿件发布成功")
          this.videoForm = {}
          this.fileList = []
          // 将本地存储的视频数+1
          this.userInfo = JSON.parse(localStorage.getItem('user'))
          this.localStorageUser(this.userInfo,1)
        })
      }
    },
    // 发布文章
    submitArticle() {
      if (checkArticleForm(this.articleForm)) {
        SaveArticle(this.articleForm).then((res) => {
          if(!res.status) this.$toast.error("文章稿件发布失败")
          this.$toast.success("文章稿件发布成功")
          this.articleForm = {}
          this.posterFile = []
          let id = res.data.id
          // 将本地存储的文章数+1
          this.userInfo = JSON.parse(localStorage.getItem('user'))
          this.localStorageUser(this.userInfo)
          setTimeout(() => {
            this.$router.push("/article/details/" + id)
          }, 600)
        })
      }
    },
    localStorageUser(user,id=0){
      if(id == 1){
        user.videoCount += 1
      }else{
        user.articleCount += 1
      }
      console.log(user.articleCount);
      this.userInfo = JSON.stringify(user)
      localStorage.setItem('user',this.userInfo)
    },
    selectTag(tag) {
      this.tag = tag
      this.show = false
      if (this.submitType === 'video') this.videoForm.type = tag
      if (this.submitType === 'article') this.articleForm.type = tag
    },

    onClickLeft() {
      this.$router.back()
    },

  }

}
</script>

<style scoped>

.poster-btn {
  font-size: 13px;
  letter-spacing: 1px;
  display: flex;
  width: 100px;
  height: 50px;
  position: absolute;
  z-index: 99;
  bottom: 15px;
  color: #0066ff;
  right: 3vw;
  line-height: 27px;
}

.poster-btn-img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.in-title {
  color: rgba(0, 0, 0, .7);
  letter-spacing: 1px;
  width: 97%;
  margin: auto;
  height: 50px;
  border: none;
  font-size: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.in-content {
  width: 97%;
  margin-top: 20px;
  font-size: 15px;
  color: rgba(0, 0, 0, .5);
  letter-spacing: 1px;
  border: none;
  line-height: 25px;
}

.footer {
  position: absolute;
  border-bottom: 0;
  font-weight: bold;
  font-size: 14px;
  color: #0066ff;
  padding-top: 4px;
}
</style>