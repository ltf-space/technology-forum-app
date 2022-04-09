<template>
  <div class="main">
    <div class="wrapper_top">
      <div class="wrapper_child">
        <van-image
          v-if="user"
          round
          width="60"
          height="60"
          :src="base + '/file/image/' + user.avatar"
        />
        <van-image
          v-else
          round
          width="60"
          height="60"
          src="../assets/photo.jpeg"
        />
        <div class="des" v-if="user">
          <div class="des-name">{{ user.nickname }}</div>
          <div style="display: flex; padding-top: 7px">
            <van-icon color="#06f" name="wechat-pay" />
            <span class="author-des">{{ user.school }}</span>
          </div>
        </div>
        <div class="des2" v-else>请登录</div>
      </div>
      <van-button class="btn" v-if="user" @click="exitLogin">注销</van-button>
      <van-button class="btn" v-else @click="goLogin">登录</van-button>
    </div>
    <div class="card card-content">
      <div class="wrapper-title">
        <van-icon name="friends-o" size="16px" class="icon"/>
        <div class="card-title">我的数据</div>
      </div>
      <van-row style="text-align: center" v-if="!user">
        <van-col span="8" class="card-item">
          <div class="card-d1">文章</div>
        </van-col>
        <van-col span="8" class="card-item" >
          <div class="card-d1">视频</div>
        </van-col>
        <van-col span="8" class="card-item">
          <div class="card-d1">评论</div>
        </van-col>
      </van-row>
      <div id="main-echarts" v-else></div>
    </div>
    <div class="card card-content2">
      <div class="wrapper-title">
        <van-icon name="apps-o" class="icon" size="16px"/>
        <div class="card-title">内容管理</div>
      </div>
      <van-cell title="我的文章" is-link value="文章" @click="goPathArticle"/>
      <van-cell title="我的视频" is-link value="视频" @click="goPathVideo"/>
      <van-collapse v-model="activeNames" class="shezhi">
        <van-collapse-item title="设置" name="">
          <div class="changePwd" @click="openPopPwd">更换密码</div>
          <div class="changeName" @click="openPopName">更换用户昵称</div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 点击更换密码触发 -->
    <van-popup v-model="showPwd" round position="bottom" :style="{ height: '65%' }">
      <div class="form_style">
        <label for="pwd">原密码</label>
        <input
          placeholder="请输入原密码"
          type="password"
          v-model="editFormPwd.password"
          class="input input_password"
          name="pwd"
        />
        <div class="border_common password_border"></div>

        <label for="newPwd">新密码</label>
        <input
          placeholder="请输入新密码"
          type="password"
          v-model="editFormPwd.newPassword"
          class="input input_newPassword"
          name="newPwd"
        />
        <div class="border_common newPassword_border"></div>

        <label for="surePwd">确认密码</label>
        <input
          placeholder="确认密码"
          type="password"
          v-model="surePassword"
          class="input input_surePassword"
          name="surePwd"
        />
        <div class="border_common surePassword_border"></div>
        <div><van-notice-bar scrollable text="请输入6~20个字符的密码且由字符数字下划线组成。" /></div>
        <div class="buttonAnNiu">
          <van-button plain type="info" @click="canle">取消</van-button>
          <van-button plain type="info" :loading='loading' 
          loading-text="加载中..." @click="goUpdate">立即修改</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 点击更换昵称触发 -->
    <van-popup v-model="showNickName" round position="bottom" :style="{ height: '45%' }">
      <div class="form_style">
        <label for="newNickNme">昵称</label>
        <input
          placeholder="请输入新昵称"
          type="text"
          v-model="newNickNme"
          class="input input_newNickNme"
          name="newNickNme"
        />
        <div class="border_common newNickNme_border"></div>
        <div class="buttonAnNiu">
          <van-button plain type="info" @click="canleNickName">取消</van-button>
          <van-button plain type="info" :loading='loading' @click="goUpdateNickName">立即修改</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { BASE_RUL } from "@/utils/request";
import { checkPwdForm } from "@/utils/check";
import { updataPwd ,updataNickeName} from "@/api/user.js";
import * as echarts from 'echarts';
export default {
  data() {
    return {
      base: BASE_RUL,
      // 用户信息
      user: null,
      // 默认显示文章列表
      active:0,
      // echarts对象
      mycharts:null,
      activeNames: ['1'],
      showPwd:false,
      // 更改密码表单信息
      editFormPwd:{
        password:'',
        newPassword:''
      },
      // 确认密码
      surePassword:'',
      loading:false,
      showNickName:false,
      newNickNme:''
    };
  },
  components:{
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user")) || null;
    // console.log(this.user.articleCount);
  },
  mounted(){
    if(this.user){

      window.onresize = () => {
        this.mycharts.resize()
      }
      //初始化echarts对象
      this.mycharts = echarts.init(document.getElementById("main-echarts"))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: '生活论坛',
            type: 'pie',
            radius: ['40%', '70%'],
            // 控制图形的位置（左右，上下）
            center:['40%','45%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              // 点击图形出现辅助信息，false不显示
              label: {
                show: false,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.user.articleCount, name: '文章数量' },
              { value: this.user.videoCount, name: '视频数量' },
              { value: this.user.commentCount, name: '评论数量' },
            ],
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            // 点击图形时会出现边框效果
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(255, 255, 255, 0.5)'
              }
            }
          }
        ]
      };
  
      option && this.mycharts.setOption(option);
    }
  },
  methods: {
    // 退出登录
    exitLogin() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "確定要注销用户吗",
        })
        .then(() => {
          // on confirm
          localStorage.clear();
          // 刷新当前页面
          this.$router.go(0)
        })
        .catch(() => {
          // on cancel
        });
    },
    // 跳转路径方法
    goToPath(path){
      return this.$router.push(path)
    },
    // 去到登陆界面
    goLogin(){
      this.goToPath('login')
    },
    goPathArticle(){
      if(!this.user){
        this.$toast('请先登录')
        return
      }
      this.goToPath('/userArticle')
    },
    goPathVideo(){
      if(!this.user){
        this.$toast('登录方可查看')
        return
      }
      this.goToPath('/UserVideo')
    },
    // 点击更换密码触发
    openPopPwd(){
      this.editFormPwd.password = ''
      this.editFormPwd.newPassword = ''
      this.surePassword = ''
      this.showPwd = true
    },
    // 点击密码取消按钮触发
    canle(){
      this.editFormPwd.password = ''
      this.editFormPwd.newPassword = ''
      this.surePassword = ''
      this.showPwd = false
    },
    // 点击修改密码提交按钮
    goUpdate(){
      this.loading = true
      if(checkPwdForm(this.editFormPwd,this.surePassword)){
        updataPwd(this.user.id,this.editFormPwd).then(res => {
          this.loading = false
          console.log(res);
          if(res.code == 400)return this.$toast.fail(res.message)
          this.$toast.success('修改成功')
          localStorage.clear()
          setTimeout(()=> {
            this.$router.push('/login')
          },1500)
          // 修改成功后清除用户信息跳转到登录页
        })
      }else{
        setTimeout(()=> {
          this.loading = false
        },1500)
      }
    },
    // 点击更换昵称触发
    openPopName(){
      this.newNickNme = ''
      this.showNickName = true
    },
    canleNickName(){
      this.showNickName = false
      this.newNickNme = ''
    },
    goUpdateNickName(){
      if(this.newNickNme == '')return this.$toast.fail('请输入昵称')
      updataNickeName(this.user.id,this.newNickNme).then(res=> {
        if(res.code !== 200)return this.$toast.fail('更改失败')
        console.log(res);
        this.user.nickname = this.newNickNme
        localStorage.setItem('user',JSON.stringify(this.user))
        this.showNickName = false
      })
    }
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  letter-spacing: 1px;
}
/* 图标区域 */
#main-echarts{
  width: 100%;
  height: 150px;
}
.card-content2{
  height: 140px;
}
.card-content {
  height: 180px;
}
.wrapper-title{
  display: flex;
  justify-content:flex-start;
  align-items: center;
  margin-left: 20px;
}
.icon{
  margin-top: 4px;
  margin-right: 2px;
}
.card-title {
  font-size: 12px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  padding-top: 12px;
  padding-bottom: 10px;
}

.card-item {
  font-size: 18px;
}

.card-d1 {
  font-size: 11px;
  padding-top: 5px;
  color: rgba(0, 0, 0, 0.8);
}

.main {
  padding: 20px;
  height: calc(100vh - 136px);
  overflow-y: auto;
}
.wrapper_top {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.wrapper_child {
  display: flex;
  justify-content: space-between;
}
.des {
  padding-left: 20px;
  letter-spacing: 1px;
  padding-top: 6px;
}
.des2{
  padding-left: 20px;
  letter-spacing: 1px;
  padding-top: 16px;
  font-weight: bold;
}
.des-name {
  font-size: 18px;
  padding-left: 3px;
}

.author-des {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  padding-left: 2px;
}
.changePwd{
  color: #000;
  line-height: 30px;
  font-size: 12px;
  margin-left: 10px;
}
.changeName{
  color: #000;
  line-height: 30px;
  font-size: 12px;
  margin-left: 10px;
}
.form_style{
  width: 100%;
  padding: 10px 20px;
}
.input {
  width: 94%;
  border: none;
  border-bottom: 1px solid rgba(27, 52, 136, 0.1);
  outline: none;
  background: transparent;
  letter-spacing: 1px;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
  color: #000;
}
.border_common{
  width: 100%;
  height: 2px;
  top: 65px;
  position: absolute;
  background: #000;
  transform: scale(0, 1);
  transition: 0.2s ease;
}
.password_border {
  top: 75px;
}
.newPassword_border{
  top: 150px;
}
.surePassword_border{
  top: 227px;
}
.newNickNme_border{
  top: 75px;
}
.input_password:focus ~ .password_border {
  transform: scale(1, 1);
}
.input_newPassword:focus ~ .newPassword_border {
  transform: scale(1, 1);
}
.input_surePassword:focus ~ .surePassword_border {
  transform: scale(1, 1);
}
.input_newNickNme:focus ~ .newNickNme_border {
  transform: scale(1, 1);
}
/* 改变设置右箭头方向 */
.shezhi ::v-deep .van-cell__right-icon{
  transform: rotate(-90deg);
}
.shezhi ::v-deep .van-collapse-item__title--expanded .van-cell__right-icon::before{
  transform: rotate(180deg);
}
/* 滚动背景 */
::v-deep .van-notice-bar{
  background-color: #eeefff;
}
.buttonAnNiu{
  width: 190px;
  float: right;
  margin-top: 5px;
}
::v-deep .van-button{
  margin-right: 10px;
}
::v-deep .van-collapse-item__content{
  padding: 4px 16px;
}
::v-deep .van-tabs__line {
  width: 20px;
  background-color: #0066ff;
}
</style>