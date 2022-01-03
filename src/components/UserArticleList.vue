<template>
  <div style="background: ##FBFCFC  ">
    <div v-for="(item, index) in list" :key="index">
      <div v-if="item.hasPoster" class="item">
        <router-link :to="'/article/details/' + item.id">
          <div class="content">
            <div class="title">{{ item.title }}</div>
            <div class="article-content">
              <div class="article">
                {{ item.content }}
              </div>
              <div class="article-poster" v-if="item.hasPoster">
                <van-image
                  width="100px"
                  height="63px"
                  fit="contain"
                  :src="base + '/file/image/' + item.poster"
                />
              </div>
            </div>
          </div>
        </router-link>
        <div class="star-bar">
          <van-icon name="like-o" size="12px" /><span class="star-bar-count">{{
            item.agreeCount
          }}</span>
          <van-icon name="chat-o" size="12px" /><span class="star-bar-count">{{
            item.commentCount
          }}</span>
          <span class="star-bar-count">{{ item.createAt }}</span>
          <van-icon
            v-if="isIcon"
            color="#eee"
            style="float: right; padding-top: 3px"
            name="cross"
            @click="delArticle(item.uid, item.id)"
          />
        </div>
      </div>

      <div v-if="!item.hasPoster" class="item">
        <router-link :to="'/article/details/' + item.id">
          <div class="content">
            <div class="title">{{ item.title }}</div>
            <div style="display: flex">
              <div class="article-content">
                <div class="article">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <div class="star-bar">
          <van-icon name="like-o" size="12px" /><span class="star-bar-count">{{
            item.agreeCount
          }}</span>
          <van-icon name="chat-o" size="12px" /><span class="star-bar-count">{{
            item.commentCount
          }}</span>
          <span class="star-bar-count">{{ item.createAt }}</span>
          <van-icon
            v-if="isIcon"
            color="#eee"
            style="float: right; padding-top: 3px"
            name="cross"
            @click="delArticle(item.uid, item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_RUL } from "@/utils/request";
import { delUserArticle } from "../api/article";
import { userArticle } from "@/api/article";
export default {
  name: "UserArticleList",
  components: {},
  data() {
    return {
      base: BASE_RUL,
      user: null,
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    isIcon: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.user = localStorage.getItem("user");
  },
  mounted() {
    // console.log(this.list);
  },
  methods: {
    // 获取用户所有文章
    // getArticle() {
    //   userArticle(this.user.id).then( res => {
    //     console.log(res);
    //     if (!res.status) return;
    //     this.articleList = res.data;
    //   });
    // },
    // 点击删除按钮触发
    delArticle(uid, id) {
      this.$dialog
        .confirm({
          title: "警告",
          message: "删除后无法撤回，是否删除",
        })
        .then(() => {
          delUserArticle(uid, id).then((res) => {
            if (!res.status) return;
            this.$toast.success("删除成功");
            console.log(res);
            this.user = JSON.parse(localStorage.getItem("user"));
            // 使文章数减1，评论数相应减少
            this.user.articleCount--;
            this.user.commentCount -= res.data;
            localStorage.setItem("user", JSON.stringify(this.user));
            this.$emit("reloadArticle");
          });
        })
        .catch(() => {
          console.log("点击了取消按钮");
        });
    },
  },
};
</script>
<style scoped>
.item {
  width: 100%;
  background: #ffffff;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding: 0 6px;
  box-sizing: border-box;
}
.content {
  padding: 10px 0;
}

.title {
  letter-spacing: 1px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
}
.article {
  font-size: 14px;
  letter-spacing: 1px;
  padding: 5px 0;
  color: rgba(0, 0, 0, 0.8);
  max-height: 33px;

  /* 超过两行显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.article-poster {
  min-width: 100px;
  min-height: 63px;
  border-radius: 5px;
  object-fit: fill;
}
.article-content {
  min-height: 70px;
  display: flex;
  justify-content: space-between;
}

.author {
  display: flex;
  padding-top: 10px;
}

.author-name {
  padding-left: 10px;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.9);
}

.author-des {
  padding-left: 3px;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.6);
}

.star-bar {
  height: 25px;
  padding-top: 8px;
  padding-left: 8px;
}

.star-bar-count {
  padding-left: 4px;
  padding-right: 10px;
  font-size: 13px;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.5);
}
</style>