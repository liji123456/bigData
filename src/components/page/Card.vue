<template>
   <div class="card">
       <div class="crumbs">
           <el-row style="width:100%;">
               <el-col :span="16">
                   <el-tabs v-model="activeName">
                       <el-tab-pane label="全部" name="all"></el-tab-pane>
                       <el-tab-pane label="内部数据清单" name="SDT101"></el-tab-pane>
                       <el-tab-pane label="外部数据清单" name="SDT102"></el-tab-pane>

                   </el-tabs>
               </el-col>
               <el-col :span="8" style="box-sizing:border-box;">
                   <el-col :span="4" style="padding: 0 10px 0 0;">
                       <el-button size="medium" @click.native="changeList"><i :class="[el_icon_erp,imgList?icon_zhankai1:icon_zhankai]"></i></el-button>
                       <!--<i class="el-icon-erp icon-zhankai"></i>-->
                       <!--<i class="el-icon-erp icon-zhankai1"></i>-->
                   </el-col>
                   <el-col :span="20">

                       <el-input
                               width="100px;"
                               placeholder="请输入您想查询的数据清单"
                               suffix-icon="el-icon-search"
                               v-model="select_list">
                       </el-input>

                   </el-col>

               </el-col>
           </el-row>

       </div>
       <el-row style="width: 100%;" @click.native="add">

             <el-col v-if="imgList" style="text-align: center">
                 <el-col  v-if="data.length">
                     <el-col  v-for="(o,index) in data"  style="padding: 15px;width: 208px;" :key="index">
                         <router-link :to="{name: 'tableCont',params:{userId:o.code,name:o.name,activeName:activeName}}">
                             <el-card :body-style="{ padding: '0px' }">
                                 <img :src="root+o.imgUrl" class="image">
                                 <div style="padding: 14px;">
                                     <span class="oname">{{o.name}}</span>
                                     <div class="bottom clearfix">
                                         <time class="time">{{o.showTime}}</time>

                                     </div>
                                 </div>
                             </el-card>
                         </router-link>
                     </el-col>
                 </el-col>
                 <p v-else style="text-align: center;line-height:600px;">查询数据为空</p>
             </el-col>
             <el-col v-else class="box-card">
                 <el-col  v-if="data.length">
                      <el-col class="text item" v-for="(o,index) in data" :key="index">
                         <el-col :span="5"><img :src="root+o.imgUrl" alt=""></el-col>
                         <el-col :span="12">
                             <div class="title">
                                 {{o.name}}
                             </div>
                             <div class="main">
                                {{o.description}}
                             </div>
                             <div class="describe">
                                 <el-col :span="12">{{o.showTime}}</el-col>
                                 <el-col :span="12">{{o.size}}</el-col>
                             </div>

                         </el-col>
                         <el-col :span="7" class="show-detail">
                             <router-link :to="{name: 'tableCont',params:{userId:o.code,name:o.name,activeName:activeName}}">
                                 <el-button type="success">查看详情</el-button>
                             </router-link>

                         </el-col>
                     </el-col>
                 </el-col>


                 <p v-else style="text-align: center;line-height:600px;">查询数据为空</p>

             </el-col>
       </el-row>

   </div>
</template>

<style scoped>
    .text {
        font-size: 14px;
    }
    .item {
        padding: 18px 0;
        border-bottom: 1px dashed #cccccc;
    }
    .box-card {
        width: 856px;
    }
    .time {
        font-size: 13px;
        color: #999;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    .button {
        padding: 0;
        float: right;
    }
    .oname{
        width: 144px;
        height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .title{
        margin: 10px 0 0 0;
        font-size: 16px;
        color: #7e6696;
    }
    .main{
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
        font-size: 14px;
        color: #999999;
        margin: 25px 0 0 0;
    }
    .describe{margin: 18px 0 0 0;color: #999999;}
    .show-detail{
        text-align: right;
        line-height: 140px;
    }

</style>

<script>

    export default {
        data() {
            return {
                url:process.env.API_ROOT+'/home/searchdatalist',
                root:process.env.API_ROOT,
                currentDate: new Date(),
                dataArr:[],
                select_list:'',
                imgList:true,
                el_icon_erp:'el-icon-erp',
                icon_zhankai1:'icon-zhankai1',
                icon_zhankai:'icon-zhankai',
                activeName:this.$route.query.activeName || 'all'

            };
        },
        created(){
            this.getData();
        },
        computed:{
            data(){
                const self = this;
                return self.dataArr.filter(function(d){

                        if(self.activeName==='all'){
                            if(d.name.indexOf(self.select_list) > -1
                            ){
                                return  d;
                            }
                        }else {
                            if(d.name.indexOf(self.select_list) > -1&&d.typeCode.indexOf(self.activeName) > -1
                            ){
                                return  d;
                            }
                        }



                })
                //进行筛选并截取分页
            }

        },
        methods:{
            add(){

            },
            changeList(){
                this.imgList = !this.imgList;
            },
            getData(){

                let self = this;
                self.loading = true;
                if(process.env.NODE_ENV === 'development'){
                    self.url = process.env.API_ROOT+'/home/searchdatalist';
                };
                self.$axios.get(self.url,{},
                        {
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"
                            }
                        }

                ).then((res) => {
                    self.dataArr = res.data.data.list;

                })
            },
        }
    }
</script>