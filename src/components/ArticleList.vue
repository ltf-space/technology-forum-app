<template>
  <div>
    <div v-for="(item,index) in list" :key="index">

      <div v-if="item.article.hasPoster" class="item">
        <div class="content" @click="goPath(item.article.id )">
          <div class="title">{{ item.article.title }}</div>
          <div style="">
            <!-- 用户头像，名字等信息 -->
            <div>
              <div class="author">
                <van-image
                    round
                    width="20"
                    height="20"
                    :src="base + '/file/image/' + item.author.avatar"
                    @click.stop="clickImg($event,item.author.id)"
                />
                <span class="author-name">{{ item.author.nickname }}</span>
                <van-icon color="#06f" style="padding-left: 7px;" name="wechat-pay"/>
                <span class="author-des">{{ item.author.school }}认证</span>
              </div>
            </div>
            <div class="article-content">
              <!-- 文章内容区域 -->
              <div class="article">
                {{ item.article.content }}
              </div>
              <div class="article-poster">
                <van-image
                    width="100px"
                    height="63px"
                    fit="contain"
                    :src="base + '/file/image/' + item.article.poster"
                />
              </div>
            </div>
          </div>
          <div class="star-bar">
            <van-icon name="like-o" size="12px"/><span class="star-bar-count">{{ item.article.agreeCount }}</span> 
            <van-icon name="chat-o" size="12px"/><span class="star-bar-count">{{ item.article.commentCount }}</span>
            <span class="star-bar-count">{{ item.article.createAt }}</span>
            <van-icon color="#909399" style="float: right;padding-top: 3px" name="ellipsis"/>
          </div>
        </div>
      </div>

      <div v-if="!item.article.hasPoster" class="item">
        <div class="content" @click="goPath(item.article.id )">
          <div class="title">{{ item.article.title }}</div>
          <div style="display: flex">
            <div>
              <div class="author">
                <van-image
                    round
                    width="20"
                    height="20"
                    :src="base + '/file/image/' + item.author.avatar"
                />
                <span class="author-name">{{ item.author.nickname }}</span>
                <van-icon color="#06f" style="padding-left: 7px;" name="wechat-pay"/>
                <span class="author-des">{{ item.author.school }}认证</span>
              </div>
              <div class="article">
                {{ item.article.content }}
              </div>
            </div>
          </div>
          <div class="star-bar">
            <van-icon name="like-o" size="12px"/><span class="star-bar-count">{{ item.article.agreeCount }}</span> 
            <van-icon name="chat-o" size="12px"/><span class="star-bar-count">{{ item.article.commentCount }}</span>
            <span class="star-bar-count">{{ item.article.createAt }}</span>
            <van-icon color="#909399" style="float: right;padding-top: 3px" name="ellipsis"/>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {BASE_RUL} from "@/utils/request";

export default {
  name: "ArticleList",
  data() {
    return {
      base: BASE_RUL
    }
  },
  props: {
    list: {
      type: Array,
    }
  },
  methods: {
    clickImg(e,uid){
      e = e.preventDefault()
      this.$router.push('/user/' + uid)
    },
    goPath(id){
      this.$router.push('/article/details/' + id)
    }
  },
}
</script>

<style scoped>
.article-poster {
  width: 100px;
  height: 63px;
  border-radius: 5px;
  object-fit: fill;
}
.article-content{
  display: flex;
  justify-content: space-between;
}
.item {
  width: 100%;
  min-height: 170px;
  background: #ffffff;
  margin-bottom: 10px;
}

.content {
  min-height: 150px;
  padding: 10px;
}

.title {
  letter-spacing: 1px;
  font-weight: 600;
  color: rgba(0, 0, 0, .9);
}

.author {
  display: flex;
  padding-top: 10px;
}

.author-name {
  padding-left: 10px;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, .9);
}

.author-des {
  padding-left: 3px;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, .6);
}

.article {
  font-size: 14px;
  letter-spacing: 1px;
  padding: 5px 0;
  color: rgba(0, 0, 0, .8);
  max-height: 35px;

/* 超过两行显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.star-bar {
  height: 25px;
  padding-top: 8px;
}

.star-bar-count {
  padding-left: 4px;
  padding-right: 10px;
  font-size: 13px;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, .5);
}

</style>