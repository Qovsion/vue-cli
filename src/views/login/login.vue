<template>
    <div id="container">
        <el-card class="box-card card">
            <img src="../../assets/images/logo_index.png" id="title" alt="">
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    #container{
        width:100%;
        height:100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url('../../assets/images/login_bg.jpg') no-repeat center / cover;
        .card{
            width: 300px;
            height: 340px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            #title{
                display: block;
                width: 230px;
                margin: 0 auto;
            }
        }
    }

</style>
