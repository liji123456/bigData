<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>

        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;"></p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    aaa:'222',
                },
                //process 系统变量
                url: process.env.API_ROOT+'/loginpost',
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]

                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = process.env.API_ROOT+'/loginpost';
                };
                self.$refs[formName].validate((valid) => {
                    //判断登录
                    if (valid) {

                        self.$axios.post(self.url, {name:self.ruleForm.username,passWord:self.ruleForm.password}
                        ).then((res) => {
                            if(res.data.rc=='500'){

                                self.$refs.ruleForm.fields[0].error=res.data.msg;

                                 return false

                            }else {
                                localStorage.setItem('ms_username',self.ruleForm.username);
                                if(self.$route.query.redirect){
                                    self.$router.push(self.$route.query.redirect);
                                }else {
                                    self.$router.push('/card');
                                }
                            }


                    })




                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>