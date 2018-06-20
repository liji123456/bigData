<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><a class="rank-head-back" @click="routerBack">返回</a></el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.params.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <span class="demonstration">日志详情：</span>
            <el-input v-model="select_word" placeholder="筛选日志" class="handle-input mr10"></el-input>
            <span class="demonstration">错误时间：</span>
            <el-date-picker
                    v-model="collectionDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    :picker-options="pickerOptions2">
            </el-date-picker>
            <el-button type="primary" icon="search" @click="getData">搜索</el-button>

        </div>
        <el-table :data="tableData" border style="max-width: 850px;min-height: 529px;" v-loading="loading">

            <el-table-column prop="id"  label="序号"  width="50">
            </el-table-column>
            <el-table-column prop="warningDate" label="报错时间"  width="150">
            </el-table-column>
            <el-table-column prop="warningDetail"  label="日志详情"  min-width="418">

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
                url: './static/warningLog.json',
                tableData: [],
                tolnum:100,
                cur_page: 1,
                multipleSelection: [],
                select_word: '',
                collectionDate:'',
                del_list: [],
                loading:true,
                is_search: false,
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
//                console.log(this.tableData);
//                this.tableData = this.newTable.slice((val-1)*10,val*10);
//                console.log(this.tableData)

            },

            getData(){

                let self = this;
                self.loading = true;
                if(process.env.NODE_ENV === 'development'){
                     self.url = '/ms/table/list';
                };
                self.$axios.post(self.url, {
                    page:self.cur_page,
                    selectWord:self.select_word,
                    collectionDate:self.collectionDate
                }).then((res) => {
                    self.tableData = res.data.list;
                    self.tolnum = 100;
                    self.loading = false;

            })
            },
            deleteRow(index, rows) {
               console.log(index)
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
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .demonstration{padding: 0 10px;}
    .pagination{max-width: 850px;}
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
</style>