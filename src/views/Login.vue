<template>
  <div class="main">
    <div class="header">
      <div class="header-d1">登录5220论坛会</div>
      <div class="header-d2">面向广大组织学术交流网站</div>
    </div>
    <van-tabs
      style="width: 200px; padding-top: 30px; text-align: center; margin: auto"
      v-model="active"
    >
      <van-tab title="账号登录" />
      <van-tab title="账号注册" />
    </van-tabs>
    <div class="form" v-if="active === 0">
      <input
        placeholder="请输入手机号"
        v-model="signInForm.phone"
        class="input input_phone"
      />
      <div class="phone_border"></div>
      <input
        placeholder="请输入密码"
        type="password"
        v-model="signInForm.password"
        class="input input_password"
      />
      <div class="password_border"></div>
      <input
        placeholder="请输入验证码"
        v-model="getStrCode"
        class=" input input_code"
      />
      <em class="strCode" @click="referCode"><span>验证码：</span><strong>{{code}}</strong></em>
      <van-button
        @click="submitSignIn"
        round
        block
        type="info"
        class="btn"
        :loading="loading"
        loading-text="加载中..."
        >登 录</van-button
      >
    </div>
    <div class="form" v-if="active === 1">
      <van-uploader v-model="fileList" :after-read="onRead" :max-count="1">
        <template #preview-cover="{ file }">
          <div class="preview-cover van-ellipsis">{{ file.name }}</div>
        </template>
      </van-uploader>
      <div
        style="
          font-size: 12px;
          color: #909399;
          padding-left: 15px;
          margin-bottom: 10px;
        "
      >
        上传头像
      </div>
      <input
        placeholder="请输入手机号码"
        v-model="signUpForm.phone"
        class="input"
      />
      <input
        placeholder="请输入密码"
        v-model="signUpForm.password"
        type="password"
        class="input"
      />
      <input
        placeholder="请输入昵称"
        v-model="signUpForm.nickname"
        class="input"
      />
      <input
        placeholder="请输入就读高校"
        v-model="signUpForm.school"
        class="input"
      />
      <van-button
        @click="submitSignUp"
        round
        block
        type="info"
        class="btn"
        :loading="loading"
        loading-text="加载中..."
        >注 册</van-button
      >
    </div>
  </div>
</template>

<script>
import { checkSignInForm, checkSignUpForm } from "@/utils/check";
import { Login, SaveUser } from "@/api/user";
import axios from "axios";
import { BASE_RUL } from "@/utils/request";

export default {
  data() {
    return {
      // 按钮加载状态
      loading: false,
      active: 0,
      fileList: [],
      // 验证码显示
      code:'',
      // 输入框验证码绑定
      getStrCode:'',
      // 登录表单信息
      signInForm: {
        phone: "",
        password: "",
      },
      // 注册表单信息
      signUpForm: {
        avatar: "",
        nickname: "",
        phone: "",
        password: "",
        school: "",
      },
    };
  },
  created(){
    this.getCode()
  },
  methods: {
    // 文件上传成功后的回调
    onRead() {
      let formData = new FormData();
      let file = this.fileList[0].file;
      formData.append("file", file, file.name);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post(BASE_RUL + "/file/image", formData, config).then((res) => {
        if (res.status === 200) this.signUpForm.avatar = res.data;
      });
    },

    // 点击登录按钮触发
    submitSignIn() {
      if (checkSignInForm(this.signInForm)) {
        if(this.getStrCode.toLowerCase() != this.code.toLowerCase()){
          this.$toast.fail("验证码输入错误");
          this.referCode()
          return;
        }
        this.loading = true;
        Login(this.signInForm).then((res) => {
          if (res.status) {
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("uid", res.data.id);
            this.$toast.success("登录成功");
            this.loading = false;
            this.$router.push("/");
          }else{
            this.loading = false;
            this.referCode()
          }
        }).catch( err => {
          this.$toast.fail('登陆失败，请检查以重新登陆')
          this.loading = false;
          this.referCode()
        });
      }else{
        this.referCode()
      }
    },
    // 点击注册按钮触发
    submitSignUp() {
      if (checkSignUpForm(this.signUpForm)) {
        this.loading = true;
        SaveUser(this.signUpForm).then((res) => {
          if (res.status) {
            this.$toast.success("注册成功");
            setTimeout(() => {
              this.loading = false;
              this.signUpForm = {};
              this.fileList = [];
              this.active = 0;
            }, 700);
          }else{
            this.loading = false;
          }
        });
      }
    },
    // 获取验证码
    getCode(){
      // 先将验证码置空，防止后续验证码叠加
      this.code = ''
      // 从中随机选取4个字符
      let strCode = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789'
      for (let i = 0; i < 4; i++) {
        let n = Math.round(Math.random()*61)
        // 在str中没有找到重复字符
        if(this.code.indexOf(strCode[n]) === -1){
          this.code += strCode[n]
        }else{
          // 出现重复，将i--，保证验证码四位
          i--
        }
      }
      return this.code
    },
    // 点击验证码刷新
    referCode(){
      this.getCode()
    }
  },
};
</script>

<style scoped>
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}

::v-deep .van-tab__text {
  font-size: 16px;
  letter-spacing: 1px;
}
::v-deep .van-tabs__nav{
  background: transparent;
}
::v-deep .van-tab--active{
  color: #fff;
}
.main {
  width: 100%;
  height: 100vh;
  background: #23343c;
}

.header {
  height: 110px;
  background: transparent;
  /* background-image: -moz-linear-gradient(
    135deg,
    rgb(163, 223, 255),
    rgb(179, 180, 255)
  );
  background-image: -webkit-linear-gradient(
    135deg,
    rgb(163, 223, 255),
    rgb(179, 180, 255)
  );
  background-image: linear-gradient(
    135deg,
    rgb(163, 223, 255),
    rgb(179, 180, 255)
  ); */
  text-align: center;
  letter-spacing: 1px;
}

.header-d1 {
  color: #ffffff;
  font-size: 22px;
  padding-top: 25px;
}

.header-d2 {
  color: #f5f6f7;
  font-size: 13px;
  padding-top: 10px;
}

.form {
  width: 90%;
  height: 300px;
  margin: 20px auto;
  position: relative;
}

.input {
  width: 94%;
  border: none;
  border-bottom: 1px solid rgba(27, 52, 136, 0.1);
  outline: none;
  background: transparent;
  /* color: rgba(0, 0, 0, .4); */
  letter-spacing: 1px;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
  color: #fff;
}
.input_phone:focus ~ .phone_border {
  transform: scale(1, 1);
}
.input_password:focus ~ .password_border {
  transform: scale(1, 1);
}
.phone_border {
  width: 100%;
  height: 2px;
  position: absolute;
  top: 46px;
  left: 0;
  background: #eee;
  transform: scale(0, 1);
  transition: 0.2s ease;
}
.password_border {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 200px;
  left: 0;
  background: #eee;
  transform: scale(0, 1);
  transition: 0.2s ease;
}
.input_code{
  width: 50%;
  border: none;
  border-bottom: 2px solid #eee;
  outline: none;
  background: transparent;
  letter-spacing: 2px;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
}
.strCode{
  letter-spacing: 4px;
}
.strCode span{
  font-size: 10px;
  color: #fff;
}
.btn {
  width: 100%;
  margin: 30px 0;
}

::v-deep .van-tabs__line {
  background-color: #0066ff;
  width: 50px;
}
</style>