<template>
  <div>
    <div class="header">
      <div style="display: flex">
        <van-icon @click="handleBack" size="23" class="left-icon" name="arrow-left"/>
        <van-image
            class="avatar"
            round
            width="37"
            height="37"
            fit="cover"
            :src="base + '/file/image/' + data.author.avatar"
            @click="goUserInfo"
        />
        <div class="des">
          <div class="des-name">{{ data.author.nickname }}</div>
          <div class="des-school">
            {{ data.author.school }}
          </div>
        </div>
      </div>
      <!-- <div class="follow" @click="showShare = true"> -->
      <div class="follow" @click="showShareWei">
        <van-icon name="share"/>
        分享
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <div class="content-title">
        {{ data.article.title }}
      </div>
      <van-divider/>
      <div class="content-main">
        <MarkdownContent :content="content"/>
      </div>
      <div v-if="hasPoster">
        <van-image
            class="avatar"
            width="100"
            height="100"
            fit="cover"
            error-icon='node实现增删改查'
            :src="base + '/file/image/' + data.article.poster"
            @click="openPreview"
        />
      </div>
      <div class="content-time">发布于 {{ data.article.createAt }} · 未经作者允许禁止转载</div>
    </div>

<!-- 底部tabbar -->
    <div class="bottom-bar">
      <van-button 
          ref="agreeButton"
          :loading="agreeLoading"
          loading-text="加载中..."
          round
          hairline
          :plain='plain'
          type="info"
          @click="agree">
        <div style="display: flex">
          <van-icon class="bottom-bar-icon" size="20" name="play" v-if="plain"/>
          <van-icon class="top-bar-icon" size="20" name="play" v-else/>
          <span class="s1" v-if="plain">赞同 {{ data.article.agreeCount }}</span>
          <span class="s1" v-else>已赞同 {{ data.article.agreeCount }}</span>
        </div>
      </van-button>
      <a @click="show = true" style="float: right">
        <div class="comments-count">{{ data.article.commentCount }}条评论</div>
        <van-icon color="#909399" size="25" class="comments-icon" name="chat-o"/>
      </a>
    </div>
    <van-popup closeable
               close-icon="clear"
               v-model="show"
               round
               position="bottom"
               :style="{ height: '90%' }"
               @close="commentForm.content = ''">
      <div style="padding: 15px">
        <div class="popup-title">全部评论</div>
        <div class="popup-content">
          <div style="padding-top: 10px;letter-spacing: 1px;padding-bottom: 20px">评论 {{ commentList.length }}
          </div>
          <div v-for="(item, index) in commentList" :key="index" class="comments-item">
            <van-image
                style="margin-top: 5px"
                round
                width="30"
                height="30"
                :src="base + '/file/image/' + item.user.avatar"
            />
            <div style="margin-left: 15px">
              <div class="comments-item-d1">{{ item.user.nickname }}</div>
              <div class="comments-item-d2">{{ item.comment.content }}</div>
              <div class="comments-item-d3">{{ item.comment.createAt }}</div>
            </div>
          </div>
        </div>
        <div class="popup-bottom">
          <label>
            <input placeholder="发一条友善的评论" v-model="commentForm.content" class="bottom-bar-input"/>
          </label>
          <div class="popup-bottom-send" @click="submitComment">发布</div>
        </div>
      </div>
    </van-popup>

    <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
    />
  </div>
</template>

<script>
import MarkdownContent from "@/components/MarkdownContent";
import {Agree, FindArticleById} from "@/api/article";
import {BASE_RUL} from "@/utils/request";
import {FindAllComment, SaveComment} from "@/api/comment";

export default {

  components: {MarkdownContent},

  data() {
    return {
      // 文章详情里是否有图片
      hasPoster:false,
      // 用户信息
      userInfo:null,
      showShare: false,
      options: [
        {name: '微信', icon: 'wechat'},
        {name: '微博', icon: 'weibo'},
        {name: '复制链接', icon: 'link'},
        {name: '分享海报', icon: 'poster'},
        {name: '二维码', icon: 'qrcode'},
      ],
      agreeLoading: false,
      commentForm: {
        uid: localStorage.getItem("uid"),
        aid: this.$route.params.id,
        content: ''
      },
      commentList: [],
      base: BASE_RUL,
      data: {
        article: {},
        author: {},
      },
      images:[{

      }],
      content: '',
      show: false,
      // 默认不点赞
      isAgree:false,
      plain:true,
    }
  },
  // created(){
  //   let 
  // },
  // computed:{
  //   agree(){
  //     return this.plain?'赞同':'已赞同'
  //   }
  // },
  mounted() {
    // 页面渲染后查到内容详情
    FindArticleById(this.$route.params.id,this.commentForm.uid).then( res => {
      console.log(res);
      if (res.status) {
        this.data = res.data
        this.hasPoster = res.data.article.hasPoster
        // 说明当前用户对此文章已经点过赞
        if(res.data.flag){
          this.plain = false
        }else{
          this.plain = true
        }
      }
      this.content = this.data.article.content.toString()
    })
    // 页面渲染后查到所有评论
    FindAllComment(this.$route.params.id).then( res => {
      // console.log(res);
      if (res.status) this.commentList = res.data
    })
  },

  methods: {
// 点击左上角箭头触发
    handleBack() {
      this.$router.back()
    },
// 点击发布按钮触发
    submitComment() {
      if(!this.commentForm.uid){
        this.$store.commit('dialog',{
          title:'提示',
          msg:'您当前没有登录，是否跳转到登陆界面'
        })
        return
      }
      if(!this.commentForm.content){
        this.$toast('请输入评论内容')
        return
      }
      SaveComment(this.commentForm).then( res => {
        if (!res.status) this.$toast.error("评论失败")
        this.commentList.push(res.data)
        this.data.article.commentCount += 1
        this.userInfo = JSON.parse(localStorage.getItem('user'))
        this.userInfo.commentCount += 1
        this.userInfo = JSON.stringify(this.userInfo)
        localStorage.setItem('user',this.userInfo)
        this.$toast.success("感谢你的评论")
        this.commentForm.content = ''
      })
    },
// 点击赞同按钮触发  （待完善，应该再传一个条件给后台用来判断点赞还是取消点赞）
    agree() {
      if(!this.commentForm.uid){
        this.$store.commit('dialog',{
          title:'提示',
          msg:'您当前没有登录，是否跳转到登陆界面'
        })
        // this.dialog('提示','您当前没有登录，是否跳转到登陆界面')
        return
      }
      this.agreeLoading = true
      Agree(this.$route.params.id,this.commentForm.uid).then( res => {
        console.log(res);
        if (res.status) {
          if(this.plain){
            this.data.article.agreeCount += 1
            // this.isAgree = true
            this.plain = false
            // this.$refs.agreeButton.hairline = false
            setTimeout(() => {
              this.$toast.success("谢谢你的赞同")
              this.agreeLoading = false
            }, 700)
          }else{
            this.data.article.agreeCount -= 1
            // this.isAgree = false
            this.plain = true
            // this.$refs.agreeButton.hairline = true
            setTimeout(() => {
              this.$toast.success("已经取消点赞")
              this.agreeLoading = false
            }, 700)
          }
        }
      })
    },
    // 点击用户头像进入用户主页
    goUserInfo(){
      this.$router.push('/user/' + this.data.author.id)
    },
    // 图片预览
    openPreview(){
      this.imagePreview({
        images:[this.base + '/file/image/' + this.data.article.poster],
        closeable: true
      })
    },
    // 分享到微信
    showShareWei(){
      let shareObj = null;
      plus.share.getServices(
          //获取分享服务成功
        function(services){
          for(i in services){
              //判断微信分享服务
              if(services[i].id == 'weixin'){
                  shareObj = services[i];
              }
          }
          if(shareObj == null){plus.nativeUI.toast('获取分享服务失败'); return ;}
          let msg = {
            // 页面分享标题
            title:this.data.article.title,
            // 分享内容
            content:this.content,
            // thumbs:['_www/shareLogo.png'], 
            thumbs:['../assets/profile.png'], 
            href:'https://www.baidu.com',
            // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
            extra:{scene:"WXSceneSession"}
          }
          //分享核心代码
          shareObj.send(
              msg,
              function(){
                  // alert( "分享成功！" );
                  this.$toast.success("分享成功！")
              },function(e){
                  // alert( "分享失败："+e.message );
                  this.$toast.fail("分享失败："+e.message)
              }
          );
        },
        //获取分享服务失败
        function(e){
            console.log(e.message);
        }
      );
    }
  },

}
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.left-icon {
  padding-top: 23px;
  padding-left: 15px;
  margin-right: 20px;
}

.avatar {
  margin-top: 16px;
}

.des {
  font-size: 12px;
  padding-top: 13px;
  padding-left: 10px;
  letter-spacing: 1px;
  width: 47vw;
}

.des-name {
  font-size: 15px;
  color: rgba(0, 0, 0, .8);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
}

.des-school {
  display: flex;
  padding-top: 5px;
  font-size: 12px;
  color: rgba(0, 0, 0, .5);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
}

.follow {
  float: right;
  margin-top: -28px;
  margin-right: 15px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #0066ff;
}

.content {
  padding: 15px;
  height: calc(100vh - 165px);
  height: -webkit-calc(100vh - 165px);
  overflow-y: auto;
}

.content-title {
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: 2px;
}



.content-time {
  font-size: 13px;
  color: rgba(0, 0, 0, .4);
  letter-spacing: 1px;
  padding: 20px 0;
}

.bottom-bar {
  width: 100%;
  height: 45px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  padding: 10px;
}

.bottom-bar-icon {
  transform: rotate(-90deg);
}
.top-bar-icon {
  transform: rotate(90deg);
}

.s1 {
  font-size: 15px;
  letter-spacing: 2px;
  padding-left: 10px;
}

.comments-icon {
  float: right;
  padding-right: 5px;
  padding-top: 8px;
}

.comments-count {
  float: right;
  padding-right: 25px;
  color: #909399;
  letter-spacing: 1px;
  padding-top: 11px;
  font-size: 13px;
}

.popup-content {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 75vh;
}

.popup-content ::-webkit-scrollbar {
  display: none !important;
}

.popup-title {
  text-align: center;
  letter-spacing: 1px;
  font-size: 17px;
  font-weight: bold;
}

.popup-bottom {
  width: 100%;
  height: 70px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 99;
  background: #ffffff;
  bottom: 0;
  left: 0;
}

.popup-bottom-send {
  letter-spacing: 3px;
  float: right;
  color: #0066ff;
  line-height: 70px;
  font-weight: 400;
  font-size: 15px;
  padding-right: 15px;
}

.bottom-bar-input {
  height: 35px;
  font-size: 13px;
  letter-spacing: 1px;
  color: #000;
  margin-top: 16px;
  margin-left: 20px;
  padding-left: 20px;
  width: 70%;
  border: none;
  background: rgba(134, 123, 123, 0.192);
  border-radius: 50px;
}

.comments-item {
  display: flex;
  margin-bottom: 20px;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 20px;
}

.comments-item-d1 {
  color: rgba(0, 0, 0, .9);
}

.comments-item-d2 {
  color: rgba(0, 0, 0, .7);
  padding: 4px 0;
}

.comments-item-d3 {
  color: rgba(0, 0, 0, .4);
  font-size: 11px;
}

</style>