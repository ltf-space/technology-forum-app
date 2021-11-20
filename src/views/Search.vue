<template>
  <div>
    <van-nav-bar :border="false" fixed ref="navbar" @click-left="onClickLeft">
      <template #left>
        <p class="header-logo">生活论坛</p>
      </template>
      <template #title>
        <van-search
            v-model="searchValue"
            ref="search"
            @search="onSearch"
            @cancel="onClear"
            @clear="onClear"
            shape="round"
            placeholder="请输入搜索关键词"
            autofocus='true'
        />
      </template>
      <template #right>
        <p class="header-cancle" @click="goBack">取消</p>
      </template>
    </van-nav-bar>
    <div style="width: 100%;height: 50px"/>

    <div v-if="list.length === 0" style="padding: 20px">
      <img style="width: 100%;height: 100%" src="../assets/Analytic.svg" alt="">
      <div class="d1">什么也没有找到!</div>
      <div class="d2">Nothing was found, please search again</div>
    </div>


    <div v-if="list.length !== 0">
      <div style="padding: 20px">
        <ArticleList :list="list"/>
      </div>
    </div>

  </div>
</template>

<script>
import {SearchArticle} from "@/api/article";
import ArticleList from "@/components/ArticleList";

export default {
  components: {ArticleList},
  data() {
    return {
      list: [],
      searchValue: '',
      show: false,
    }
  },
  created(){
  },
  methods: {
// 点击导航栏左侧内容触发
    onClickLeft() {
      this.$router.push('/home')
    },
//  点击键盘上的搜索/回车按钮后触发
    onSearch() {
      SearchArticle(this.searchValue).then((res) => {
        if (res.status) {
          this.list = res.data
        }
      })
    },
// 点击搜索框取消图标触发
    onClear() {
      this.list = []
    },
    // 点击右上角取消按钮回退
    goBack(){
      this.$router.back()
    }
  },

}
</script>

<style scoped>

.d1 {
  text-align: center;
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: 500;
  padding-top: 20px;
}

.d2 {
  text-align: center;
  font-size: 13px;
  letter-spacing: 2px;
  padding: 15px;
  color: rgba(0, 0, 0, .6);
}
.header-cancle{
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #06f;
}

.header-logo {
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #06f;
  margin-right: 20px;
}
</style>
