import Vue from 'vue'
import Vuex from 'vuex'
import {Toast} from 'Vant'
Vue.use(Vuex)

import {FindAllArticle} from "@/api/article";
export default new Vuex.Store({
  state: {
    articleList:[],
    isLoading:false
  },
  mutations: {
    onrefresh(state,data){
      this.state.articleList = data
      this.state.isLoading = false
    }
  },
  actions: {
    ONREFRESH(context){
      FindAllArticle('all').then((res) => {
        if (!res.status){
          Toast('加载失败');
          this.isLoading = false;
        }
        setTimeout(() => {
          Toast('刷新成功');
          this.commit('onrefresh',res.data)
          this.isLoading = false;
        }, 1000);
      })
    }
  },
  modules: {
  }
})
