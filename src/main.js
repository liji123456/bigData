import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import { Loading, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

axios.defaults.timeout = 5000;// 超时时间
axios.defaults.withCredentials=true;//设置session不变化

axios.interceptors.request.use(config => { //添加请求拦截器
    return config
}, error => {
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) { // 添加响应拦截器
    let rc = response.data.rc;
    // 对响应数据做点什么
    if(rc=='401'){
        localStorage.removeItem('ms_username');
        router.push('/login');
    }else if(rc!='200'){
        Message.error({
            message: response.data.msg
        })
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    Message.error({
        message: '接口错误'
    })
    return Promise.reject(error)
});
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');