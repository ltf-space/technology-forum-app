import Vue from 'vue'
import Vuex from 'vuex'
import {Toast} from 'vant'
import {Dialog} from 'vant'
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
    },
      // 封装函数（弹出框）
    dialog(state,payload){
      return Dialog.confirm({
          title: payload.title,
          message: payload.msg,
        }).then(() => {
          // 点击确认后操作
          location.href = '/login'
        })
        .catch(() => {
          // 点击取消后操作
        });
    },
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
