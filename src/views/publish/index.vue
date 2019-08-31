<template>
  <div class="container">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">富文本</el-form-item>
        <el-form-item label="选项：">
          <!-- 单选框组 -->
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">一张</el-radio>
            <el-radio :label="3">三张</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="btn_img" >
            <img src="../../assets/images/default.png" alt />
          </div>
        </el-form-item>
        <el-form-item  label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        cover: {
          type: 1
        },
        title: '',
        channel_id: null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn_img {
  width: 170px;
  height: 170px;
  border: 1px solid #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
