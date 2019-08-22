<template>
  <div id="container">
    <el-card class="box-card card">
      <img src="../../assets/images/logo_index.png" id="title" alt />

      <el-form :model="loginForm">
        <el-form-item>
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:140px;margin-right:8px"></el-input>
            <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox :value="true">已同意条款项</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- :model 表示表单内所有元素的数据集合 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
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
