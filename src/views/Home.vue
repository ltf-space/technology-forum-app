<template>
  <div class="main">
    <van-tabs v-model="active" @click="onClick">
      <van-tab
        v-for="(item, index) in tagList"
        :key="index"
        :title="item"
        style="background: #f5f6f7"
      >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div style="margin-bottom: 66px">
            <ArticleList class="listContent" :list="articleList" />
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-icon name="wap-nav" class="btn" @click="show = true"/>
    <!-- 点击首页tag最右边图标显示 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="onSelect" 
    />
    <div class="d">没有更多内容了</div>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList";
import { FindAllArticle, FindAllType } from "@/api/article";

export default {
  data() {
    return {
      active: 0,
      articleList: this.$store.state.articleList,
      tagList: ["推荐"],
      isLoading: this.$store.state.isLoading,
      show: false,
      actions: [],
    };
  },
  components: {
    // 文章列表
    ArticleList,
  },
  created(){
  },
  mounted() {
    // 获取顶部类型滑动条
    FindAllType().then((res) => {
      if (res.status) {
        for (let i = 0; i < res.data.length; i++) {
          this.tagList.push(res.data[i]);
        }
        // 对actions进行拼接
        this.tagList.forEach((item,index) => {
          this.actions.push({name:item,index:index})
        })
        this.actions[0].color = '#06f'
      }
    });
    this.getAllArticle();
  },

  methods: {
    onSelect(item) {
      this.active = item.index
      this.getArticle()
    },
    onCancel(){
      this.$toast('取消')
      console.log('hello');
    },
    // 查询所有文章
    getAllArticle() {
      FindAllArticle("all").then((res) => {
        // console.log(res);
        if (res.status) {
          this.articleList = res.data;
        }
      });
    },
    // 点击tag标签触发
    onClick() {
      this.getArticle()
    },
    getArticle(){
      if (this.active !== 0) {
        FindAllArticle(this.tagList[this.active]).then( res => {
          if (res.status) {
            this.articleList = res.data;
          }
        });
      } else {
        FindAllArticle("all").then( res => {
          if (res.status) {
            this.articleList = res.data;
          }
        });
      }
    },
    // 下拉刷新
    onRefresh() {
      this.$store.dispatch("ONREFRESH");
      setTimeout(() => {
        this.isLoading = this.$store.state.isLoading;
      }, 500);
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: calc(100vh - 102px);
  background: #f5f6f7 !important;
  position: relative;
}
::v-deep .van-tabs__line {
  width: 20px;
  background-color: #0066ff;
}
.btn {
  width: 24px;
  height: 30px;
  position: absolute;
  right: 0;
  top: 14px;
  text-align: center;
  background-color: #fff;
}
.d {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
</style>
