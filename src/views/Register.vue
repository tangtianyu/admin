<template>
    <div style="margin-top: 100px;width: 500px;padding-top:100px" >
        <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="user.email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="V_CODE">
                <el-input  v-model="user.V_CODE"  auto-complete="off" class="el-input-v"></el-input>
                <el-button class="el-btn"
                        :disabled="timeout<120" @click="getVcode('user')">{{timeout<120?timeout+'秒后再试':'获取验证码'}}</el-button>

            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input :disabled="firstgetvcode" type="password" v-model="user.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input :disabled="firstgetvcode" type="password" v-model="user.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item  class="submit">
                <el-button :disabled="firstgetvcode" type="primary" @click="submitForm('user')">提交</el-button>
                <el-button  @click="resetForm('user')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>

    export default {
        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.user.checkPass !== '') {
                        this.$refs.user.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                user: {
                    email: '',
                    pass: '',
                    checkPass: '',
                    V_CODE: ''
                },
                timeout:120,
                firstgetvcode:true,
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    V_CODE:[
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post(this.myurl+`admin/users/register`,{
                            email:this.user.email,
                            password:this.user.pass,
                            V_CODE:this.user.V_CODE
                        }).then(res=>{
                            this.$message(res.data.msg);
                        })
                    } else {
                        this.$message.error('请输入正确信息')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getVcode(){

                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式

                if(this.user.email === ""){ //输入不能为空
                    this.$message.error('请输入邮箱地址');                    return false;
                }else if(!reg.test(this.user.email)){ //正则验证不通过，格式不对
                    this.$message.error('请输入正确邮箱地址');                    return false;
                }else{
                    this.axios.post(this.myurl+`admin/users/register/sendv_code`,{email:this.user.email}).then((res)=>{
                        this.$message(res.data.msg);
                        if(res.data.code==200){
                            if(res.data.restTime!=undefined)
                                this.timeout=res.data.restTime
                            this.firstgetvcode=false
                            let timer = setInterval(()=>{
                                this.timeout--
                                if(this.timeout==0){
                                    this.timeout=120
                                    clearInterval(timer)
                                }
                            },1000)

                        }
                    })
                    return true;
                }

            }
        }
    }

</script>

<style scoped>
.el-input-v{
    width: 260px;
}
    .el-btn{
        float: right;
    }
    .submit{
        text-align: center;
    }
</style>