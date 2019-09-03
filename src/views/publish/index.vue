<template>
  <div class='container'>
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">

            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 选择封面图按钮 -->
          <div v-if="articleForm.cover.type === 1">
          <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
          <my-image v-model="articleForm.cover.images[0]"></my-image>
          <my-image v-model="articleForm.cover.images[1]"></my-image>
          <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button  type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>

        <el-form-item v-else>
          <el-button  type="primary" @click="update(false)">修改</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: '',
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      articleId: null,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  // 侦听器 监听地址栏变化 有ID则为编辑 没有ID则为发布
  watch: {
    '$route.query.id': function (newValue, oldValue) {
      //  修改切到发布时  重置文章内容 清空文章ID
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
      this.articleId = null
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 如果是编辑
    // this.articleId && this.getArticle()
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    changeType () {
    // 选择过封面类型的时候 重置数据
      this.articleForm.cover.images = []
    },
    async getArticle () {
      const { data: { data } } = await this.$http.get(`articles/${this.articleId}`)
      // 填充表单
      this.articleForm = data
    },
    async submit (draft) {
      // 省去了校验
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    async update (draft) {
      // 地址栏多了ID  方式put
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '修改时存入草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'>

</style>
