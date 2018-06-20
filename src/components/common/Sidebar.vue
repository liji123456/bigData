<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" style="font-size: 16px;">
                        <i :class="item.icon" style="font-size: 25px;margin: 0 10px 0 0;"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [

                    {
                        icon: 'el-icon-erp icon-shujuku',
                        index: 'card',
                        title: '数据清单'
                    },
                    {
                        icon: 'el-icon-erp icon-renwutongjibaobiao1',
                        index: 'collection',
                        title: '采集任务'
                    },
                    {
                        icon: 'el-icon-erp icon-rizhiguanli',
                        index: 'log',
                        title: '采集日志'
                    }

                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/icon/iconfont.css";
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
