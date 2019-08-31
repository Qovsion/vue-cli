<template>
  <el-container class="my-container">
    <el-aside :width="isTog?'60px':'200px'" class="my-aside">
      <div class="logo" :class="{'logomin':isTog}"></div>
      <!-- element自定义导航 -->
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo my-el-col"
          background-color="#002033"
          :collapse="isTog"
        :collapse-transition="false"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
         <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内存管理</span>
          </el-menu-item>

          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>

          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>

          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>

          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>

          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>

        </el-menu>

    </el-aside>
    <el-container>
      <el-header>
        <span class="fold el-icon-s-fold" @click='tog()'></span>
        <span class="header-title">北京XXXX管理后台</span>

        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
             <img class="avatarImg" :src="avatar" alt />
            <span class="username"> {{username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- @click 是原生事件  而el是组件 所以不会触发 需要触发要加事件修饰符
            例如 @click.prevent="函数"  阻止默认行为  @click.native 把原生事件绑定在组件上-->
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native='logout()'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <router-view></router-view>
          </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {

  data () {
    return {
      isTog: false,
      avatar: '',
      username: ''
    }
  },
  created () {
    console.log(this.$route)
    this.avatar = store.getUser().photo
    this.username = store.getUser().name
  },
  methods: {
    tog () {
      this.isTog = !this.isTog
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 1、删除用户信息 2、跳转登录页面
      store.delUser()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-aside {
    background: #002033;
    .my-el-col {
      border-right: none;
    }
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("../../assets/images/logo_admin.png") no-repeat
        center / 140px auto;
    }
    .logomin{
        background: #002244 url("../../assets/images/logo_admin_01.png") no-repeat
        center / 32px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .fold {
      font-size: 30px;
      vertical-align: middle;
    }
    .header-title {
      vertical-align: middle;
      margin-left: 10px;
    }
    .my-dropdown {
      float: right;
      .avatarImg {
        width: 36px;
        height:36px;
        vertical-align: middle;
      }
      .username {
        vertical-align: middle;
      }
    }
  }
}
</style>
