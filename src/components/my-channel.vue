<template>
  <el-select :value="value" placeholder="请选择"  @change='fn'>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],

  data () {
    return {
      // 当前选择频道ID
    //   value: null,
      // 频道选项数据
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (channelId) {
      // channelId 当你清空操作 值是空字符串  改成null
      if (channelId === '') channelId = null
      console.log(channelId)
      this.$emit('input', channelId)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
