<template>
    <div class="header">
        <div class="logo">
            数据采集系统<i round class="edition">V1.0</i>
            <i class="line"></i>
            <router-link to="/updateLog">
                <i class="el-icon-erp icon-guanliyuan_guanliyuanrizhi"   title="更新日志"></i>
            </router-link>
            <i class="line"></i>

        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'linxin'
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username');
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:500px;
        padding: 0 0 0 20px;
    }
    .header .logo .line{
        display: inline-block;
        width: 1px;
        height: 38px;
        background:#353f51 ;
        vertical-align: middle;

    }
    .header .logo .edition{
        width: 38px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background:#1b7be0 ;
        display: inline-block;
        border-radius: 20px;
        vertical-align: middle;
        margin: 0 47px 0 5px;
        transform:scale(0.85);
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .icon-guanliyuan_guanliyuanrizhi{
        color: #fff;
        font-size: 26px;
        margin: 0 18px;
        vertical-align: middle;
    }
</style>
