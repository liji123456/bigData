<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><a class="rank-head-back" @click="routerBack">返回</a></el-breadcrumb-item>
                <span>{{$route.params.userId}}</span>
                <el-breadcrumb-item>{{ $route.params.name }}</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <!--<div class="handle-box">-->

            <!--<span class="demonstration">姓名：</span>-->
            <!--<el-input v-model="select_name" placeholder="筛选姓名" class="handle-input mr10"></el-input>-->
            <!--<span class="demonstration">身份证号：</span>-->
            <!--<el-input v-model="select_IdentificationNumber" placeholder="筛选身份证号" class="handle-input mr10"></el-input>-->
            <!--<el-button type="primary" icon="search" @click="getData">搜索</el-button>-->
        <!--</div>-->
        <el-table :data="tableData" border style="width:100%;" v-loading="loading"  show-overflow-tooltip="true">

            <el-table-column :prop="item.attname"   :label="item.descript"  v-for="(item,index) in tableHeader" >
            </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="tolnum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: process.env.API_ROOT+'/home/searchdatadetail',
                tableData: [],
                tableHeader: [],
                tolnum:100,
                cur_page: 1,
                multipleSelection: [],
                select_IdentificationNumber: '',
                select_name:'',
                collectionDate:'',
                del_list: [],
                is_search: false,
                loading:true,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }

            }
        },
        created(){
            this.getData();
        },
        computed: {

        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },

            getData(){

                let self = this;
                self.loading = true;
                if(process.env.NODE_ENV === 'development'){
                    self.url = process.env.API_ROOT+'/home/searchdatadetail';
                };
                self.$axios.post(self.url, {
                    pageNum:self.cur_page,
                    code:self.$route.params.userId,
                    pageSize:10

                }).then((res) => {
                    console.log(res.data.data.tableContent.list);
                    self.tableHeader = res.data.data.columnDescriptions;
                    self.tableData = res.data.data.tableContent.list;
                    self.tolnum = res.data.data.tableContent.total;
                    self.loading=false;
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const self = this,
                        length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            routerBack(){
                this.$router.push({ path: 'card', query: {activeName:this.$route.params.activeName}});
            }
        }
    }
</script>

<style >
  .cell{max-height: 94px !important;overflow: auto !important;}
 .demonstration{padding: 0 10px;}
.pagination{width: 100%;}
.handle-box{
    margin:10px 0 25px 0;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 180px;
    display: inline-block;
}
.minHeight{min-height: 529px;}
</style>