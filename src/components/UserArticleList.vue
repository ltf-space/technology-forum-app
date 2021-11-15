<template>
  <div>
    <div v-for="(item,index) in list.articles" :key='index'>
      <div v-if="item.hasPoster" class="item">
        <router-link :to="'/article/details/' + item.id ">
          <div class="content">
            <div class="title">{{ item.title }}</div>
            <div style="display: flex">
              <div>
                <div class="article">
                  {{ item.content }}
                </div>
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
          <van-icon name="like-o" size="12px"/><span class="star-bar-count">{{ item.agreeCount }}</span> 
          <van-icon name="chat-o" size="12px"/><span class="star-bar-count">{{ item.commentCount }}</span>
          <span class="star-bar-count">{{ item.createAt }}</span>
          <van-icon color="#eee" style="float: right;padding-top: 3px" name="cross" @click="test"/>
        </div>
      </div>

      <div v-if="!item.hasPoster" class="item">
        <router-link :to="'/article/details/' + item.id ">
          <div class="content">
            <div class="title">{{ item.title }}</div>
            <div style="display: flex">
              <div>
                <div class="article">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <div class="star-bar">
          <van-icon name="like-o" size="12px"/><span class="star-bar-count">{{ item.agreeCount }}</span> 
          <van-icon name="chat-o" size="12px"/><span class="star-bar-count">{{ item.commentCount }}</span>
          <span class="star-bar-count">{{ item.createAt }}</span>
          <van-icon color="#eee" style="float: right;padding-top: 3px" name="cross" @click="test"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_RUL } from "@/utils/request";
export default {
  name:'UserArticleList',
  components:{},
  data(){
    return {
      base:BASE_RUL
    }
  },
  props: {
    list: {
      type:Object,
      default:()=>{}
    }
  },
  created(){
    // console.log(this.list);
  },
  mounted() {
    // console.log(this.list);
  },
  methods: {
    test(){
      this.$dialog.confirm({
        title: '警告',
        message: '删除后无法撤回，是否删除',
      }).then(()=> {
        console.log('点击了确认按钮');
      }).catch(()=> {
        console.log('点击了取消按钮');
      })
    }
  },
}
</script>
<style scoped>
.article {
  font-size: 14px;
  letter-spacing: 1px;
  padding: 5px 0;
  color: rgba(0, 0, 0, .8);
  max-height: 33px;

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
  margin: 15px 0 0 10px;
  object-fit: fill;
}

.item {
  width: 100%;
  background: #ffffff;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.content {
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
  color: rgba(0, 0, 0, .5);
}

</style>