<template>
  <div>
    <van-nav-bar
      class="nav-bar"
      title="文章列表"
      left-arrow
      @click-left="handleBack"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div style="">
        <user-article-list class="listContent" :list="this.articleList" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import UserArticleList from "@/components/UserArticleList";
import { userArticle } from "@/api/article";
export default {
  name: "UserArticle",
  components: {
    UserArticleList,
  },
  data() {
    return {
      // 文章列表
      articleList: null,
      // 用户标识
      uid: null,
      isLoading:false
    };
  },
  created() {
    this.uid = localStorage.getItem("uid");
    this.getArticle();
  },
  methods: {
    // 获取用户所有文章
    getArticle() {
      userArticle(this.uid).then((res) => {
        console.log(res);
        if (!res.status) return;
        this.articleList = res.data;
      });
    },
    // 点击左上角返回按钮触发
    handleBack(){
      this.$router.back()
    },
    // 下拉刷新
    onRefresh() {
      this.getArticle();
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>
<style scoped>
.nav-bar{
  box-shadow: 0 2px 3px #eee;
}
.listContent{
  
  padding: 0 6px;
  height: calc(100vh - 46px);
  overflow-y: auto;
}
</style>