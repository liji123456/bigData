import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


  const  routes=[
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/card',
            meta: { requiresAuth: true },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {

                    path: '/',
                    meta: { requiresAuth: true },
                    component: resolve => require(['../components/page/Card.vue'], resolve)
                },
                {
                    path: '/collection',
                    meta: { requiresAuth: true },
                    component: resolve => require(['../components/page/CollectionTask.vue'], resolve)    //
                },
                {
                    path: '/log',
                    meta: { requiresAuth: true },
                    component: resolve => require(['../components/page/LogCollection.vue'], resolve)    //
                },{
                    path: '/tableCont',
                    meta: { requiresAuth: true },
                    name:'tableCont',
                    component: resolve => require(['../components/page/TableCont.vue'], resolve)    //
                },{
                    path: '/logDetail',
                    meta: { requiresAuth: true },
                    name:'logDetail',
                    component: resolve => require(['../components/page/LogDetail.vue'], resolve)    //
                },{
                    path: '/updateLog',
                    meta: { requiresAuth: true },
                    name:'updateLog',
                    component: resolve => require(['../components/page/UpdateLog.vue'], resolve)    // 拖拽列表组件
                }

            ]
        },
        {
            path: '*',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]



const router = new Router({
    routes
});

// 全局导航钩子
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        let username = localStorage.getItem('ms_username');
        console.log(username);
        if(!isEmptyObject(username)) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});


function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
//判断object是否为空


export default router;