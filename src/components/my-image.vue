<template>
  <div class="container">
    <!-- 按钮图片 -->
    <div class="btn_img" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="素材库" name="image">
            <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片列表 -->
          <div class="img_list">
            <div class="img_item" :class="{selected:item.url===selectedImageUrl}" @click="selectedImage(item.url)" v-for="item in images" :key="item.id">
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            style="text-align:center"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
            <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess">
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-tab-pane>
                        </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
import store from '@/store'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
    // 上传默认预览图片
      uploadImageUrl: null,
      // 默认URL路径
      selectedImageUrl: null,
      // 对话框默认隐藏
      dialogVisible: false,
      //  设置选项卡默认值
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      defaultImage,
      images: [],
      total: 0,
      headers: {
        Authorization: 'Bearer ' + store.getUser().token
      }
    }
  },
  methods: {
    openDialog () {
      // 点击按钮图片时
      this.dialogVisible = true
      //   再次打开对话框时  清除上此操作数据
      this.activeName = 'image'
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      //   获取资源列表
      this.getImage()
    },
    async getImage () {
      // 获取图片列表
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    },
    changeCollect () {
      // 当全部/收藏发生变化时
      this.reqParams.page = 1
      this.getImage()
    },
    selectedImage (url) {
      // 当点击图片列表的图片时  记录当前图片URL   类 === 是对比URL
      this.selectedImageUrl = url
    },
    handleSuccess (res) {
      // 上传成功之后操作
    //   预览
      this.uploadImageUrl = res.data.url
    },
    confirmImage () {
      // 点击成功之后
      let url = null
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.info('请选中一张图片')
        url = this.selectedImageUrl
      } else {
        if (!this.uploadImageUrl) return this.$message.info('请上传一张图片')
        url = this.uploadImageUrl
      }
      // 给图片按钮的src赋值  看到你选择的封面图片
      //   this.confirmSrc = url
      this.$emit('input', url)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.btn_img {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  float: left;
  margin-right:5px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_item {
  width: 150px;
  height: 150px;
  margin-right: 25px;
  margin-bottom: 10px;
  margin-top: 5px;
  display: inline-block;
  position: relative;
  &.selected{
      &::after{
        // .img_item.selected::after{} 解析后选择器
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px
      }
    }
  img {
    width: 100%;
    height: 100%;
  }
}
.dialog-footer{
  width: 100%;
  display: block;
  text-align: center;
}

</style>
