<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form>
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格 -->
      <el-table :data="tableData">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:160px;height:100px">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:160px;height:100px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row.id}} -->
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="$router.push('/publish?id='+scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" @click="delArticles(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pager"
        background
        layout="prev, pager, next, total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import Mybread from '@/components/my-bread'
export default {
  // components: { 'my-bread': Mybread },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      dateArr: [],
      tableData: [],
      total: 0
    }
  },

  methods: {
    // 删除
    async delArticles (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认触发的函数
        // get 获取数据 post 添加数据 put 完整修改数据 delete 删除数据 patch 局部修改数据
      // 1.发送请求到服务器
        await this.$http.delete(`articles/${id}`)
        // 成功
        this.$message.success('删除成功')
        // 重新获取表格数据
        this.getTableData()
      }).catch(() => {
        // 点击取消触发的函数
      })
    },
    search () {
      // 选择双向绑定值替换值 之后  点击搜索按钮
      // 1.把日期格式调换  2.获取数据
      // 页面需要在第一页
      this.reqParams.page = 1
      this.reqParams.begin_pubdate = this.dateArr[0]
      this.reqParams.end_pubdate = this.dateArr[1]
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.getTableData()
    },
    changePager (ThisPage) {
      this.reqParams.page = ThisPage
      this.getTableData()
    },

    async getTableData () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.tableData = data.results
      this.total = data.total_count
    }
  },

  created () {
    // 频道组件
    // this.getChannelOptions()
    this.getTableData()
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin: 20px;
}
.pager {
  margin-top: 10px;
  text-align: center;
}
</style>
