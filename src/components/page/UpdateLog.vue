<template>
    <div class="card" v-loading="loading" style="min-height: 100%;">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>更新日志记录</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <el-col :span="24">
            <el-card v-for="(o,index) in logData" class="card-box" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{o.version}}</span>
                </div>
                <div v-for="o of o.list" class="text item" :key="o.code">
                    <span>{{o.name}}</span>
                    <p v-for="(o,index) in o.list" :key="index">[{{o.functionText}}]{{o.systemName+o.systemVersion+" 更新内容："+o.content}}</p>
                </div>
            </el-card>
        </el-col>
    </div>

</template>

<script>
    export default{
        data(){
            return{
                url:process.env.API_ROOT+'/loginfo/versioninfo',
                logData:[],
                loading:true
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                let self = this;
                self.$axios.get(self.url, {page:self.cur_page}).then((res) => {
                    self.logData = res.data.data.reverse();
                    console.log(res);
                    self.loading= false;
                })

            }
        }
    }
</script>
<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .card-box{
        margin:  0 0 15px 0;
    }

</style>