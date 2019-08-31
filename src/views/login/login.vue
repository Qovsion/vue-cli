<template>
  <div id="container">
    <el-card class="box-card card">
      <img src="../../assets/images/logo_index.png" id="title" alt />
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:140px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">已同意条款项</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- :model 表示表单内所有元素的数据集合 -->
  </div>
</template>
<script>
import store from '@/store'
export default {
  data () {
    // 定义校验函数 在return前声明
    // 三个参数
    // rule 校验规则桂香 value 当前字段值 callback 校验后回调函数
    // callback() 成功 callback(new Error('显示错误提示'))
    const checkMobile = (rule, value, callback) => {
      // 1开头 3-9第二位 必须为数字 9位数
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { len: 6, message: '请输入6位数字', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      // 1.给表单组件加 ref属性 2.获取组件实例(dom对象) 3.调用校验函数
      this.$refs.loginForm.validate(async vaild => {
        // if (vaild) {
        //   this.$http
        //     .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
        //     .then(res => {
        //       // 成功 res 对象响应对象 res.data 主体
        //       // 保存  用户信息（token） 获取响应主体下data对象
        //       store.setUser(res.data.data)
        //       this.$router.push('/')
        //     })
        //     .catch(() => {
        //       // 失败
        //       this.$message.error('手机号或验证码错误')
        //     })
        // }
        try {
          const { data: { data } } = await this.$http.post('/authorizations', this.loginForm)
          store.setUser(data)
          this.$router.push('/')
        } catch (error) {
          this.$message.error('手机号或验证码错误')
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .card {
    width: 300px;
    height: 340px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    #title {
      display: block;
      width: 230px;
      margin: 0 auto 30px;
    }
  }
}
</style>
