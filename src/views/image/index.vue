<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div>
        <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" @click="addImg" size="small" style="float:right">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item"  v-for="item in images" :key="item.id" >
          <img :src="item.url" />
          <div class="option">
            <span class="el-icon-star-off" @click="toggleCollect(item)" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete" @click="delImg(item.id)"></span>
          </div>
        </div>
      </div>
<!-- 对话弹出框 -->
<!-- toggleVisible true false 两个值 控制 显示隐藏  默认隐藏(false) -->
<el-dialog title="上传图片" :visible.sync="toggleVisible" width="300px">
  <el-upload
  class="avatar-uploader"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  :headers="headers"
  name="image"
  :show-file-list="false"
  :on-success="handleAvatarSuccess">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  <div slot="footer" class="dialog-footer">
    <el-button @click="toggleVisible = false">取 消</el-button>
  </div>
</el-dialog>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        @current-change="changePager"
        hide-on-single-page
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      imageUrl: null,
      images: [],
      total: 0,
      toggleVisible: false,
      selectedImageUrl: null,
      headers: {
        Authorization: 'Bearer ' + store.getUser().token
      }
    }
  },
  created () {
    this.getImage()
  },
  methods: {

    // 上传图片成功后 执行操作
    handleAvatarSuccess (res) {
      this.$message.success('上传图片成功')
      this.imageUrl = res.data.url
      setTimeout(() => {
        this.toggleVisible = false
        this.reqParams.page = 1
        this.getImage()
      }, 2000)
    },
    // 添加素材
    addImg () {
      this.toggleVisible = true
      this.imageUrl = null
    },
    // 删除素材  根据图片id 发送请求点击删除数据
    async delImg (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`/user/images/${id}`)
        this.$message.success('删除成功')
        this.getImage()
      }).catch(() => {
      })
    },
    // 点击星星按钮 判断收藏 未收藏
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`/user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前图片的数据 默认后台有排序
      item.is_collected = data.collect
    },
    //   changeCollect 当按钮发生改变 切换全部/收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImage()
    },
    //   changePager 返回当前页
    changePager (newPage) {
      console.log(newPage)
      this.reqParams.page = newPage
      this.getImage()
    },
    async getImage () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      // 成功
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>

.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px solid #ddd;
    position: relative;
    display: inline-block;
    margin-left: 30px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      display: block;

    }
    .option {
      width: 100%;
      height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
