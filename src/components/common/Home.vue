<template>
    <div class="wrapper">
        <!--组件使用-->
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        //组件注册
        components:{
            vHead, vSidebar
        }
    }
//    局部组件
//    var ComponentA = { /* ... */ }
//    new Vue({
//        el: '#app'
//        components: {
//            'component-a': ComponentA,
//            'component-b': ComponentB
//        }
//    })
</script>
