import {Toast} from "vant";
// 校验登录信息
export function checkSignInForm(form) {
    if (!form.phone || !form.password) {
        Toast.fail("请输入手机号和密码")
        return false
    }
    if (form.phone.length !== 11) {
        Toast.fail("请输入11位的手机号码")
        return false
    }
    if (form.password.length < 6 || form.password.length > 20) {
        Toast.fail("请输入正确的密码")
        return false
    }
    return true
}

// 校验注册信息
export function checkSignUpForm(form) {
  let phone_pattern = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!form.avatar) {
        Toast.fail("请选择您的头像")
        return false
    }
    if (!form.phone || !form.password || !form.school || !form.nickname) {
        Toast.fail("请填写完整注册表单")
        return false
    }
    if (form.phone.length !== 11 || !phone_pattern.test(form.phone)) {
        Toast.fail("请输入正确的11位的手机号码")
        return false
    }
    if (form.nickname.length < 3 || form.nickname.length > 10) {
        Toast.fail("请输入3~10个字符的昵称")
        return false
    }
    if (form.password.length < 6 || form.password.length > 20) {
        Toast.fail("请输入6~20个字符的密码")
        return false
    }
    if (form.school.length < 4 || form.school.length > 20) {
        Toast.fail("请输入正确的学校")
        return false
    }
    return true
}

// 校验视频信息
export function checkVideoForm(form) {
    if (!form.title) {
        Toast.fail("请输入视频标题")
        return false
    }
    if (form.title.length > 20) {
        Toast.fail("视频标题不能超过20个字符")
        return false
    }
    if (!form.fid) {
        Toast.fail("还没有上传视频")
        return false
    }
    if (!form.type) {
        Toast.fail("请选择稿件类型")
        return false
    }
    return true
}

// 校验文章信息
export function checkArticleForm(form) {
    if (!form.title) {
        Toast.fail("请输入文章标题")
        return false
    }
    if (form.title.length > 20) {
        Toast.fail("文章标题不能超过20个字符")
        return false
    }
    if (!form.content) {
        Toast.fail("请输入正文")
        return false
    }
    if (!form.type) {
        Toast.fail("请选择文章类型")
        return false
    }
    return true
}

// 校验更改密码信息
export function checkPwdForm(form,surePassword) {
  if (!form.password || !form.newPassword || !surePassword) {
    Toast.fail("请填写完整表单信息")
    return false
  }
  if (form.password.length < 6 || form.password.length > 20) {
    Toast.fail("请输入6~20个字符的原密码")
    return false
  }
  if (form.newPassword.length < 6 || form.newPassword.length > 20) {
    Toast.fail("请输入6~20个字符的新密码")
    return false
  }
  if (form.newPassword !== surePassword) {
    Toast.fail("请重新输入确认密码")
    return false
  }
  return true
}