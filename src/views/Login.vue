<template>
    <div style="margin-top: 100px;width: 500px;padding-top:100px" >
        <el-form :model="user"  :rules="rules" ref="user" label-width="100px" >
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="user.email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input  type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item class="submit">
                <el-button  type="primary" @click="submitForm('user')">提交</el-button>
                <el-button  @click="resetForm('user')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>

    export default {
        data() {

            return {
                user: {
                    email: '',
                    password: '',
                },
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post(this.myurl+`admin/users/login`,{
                            email:this.user.email,
                            password:this.user.password,
                        }).then(res=>{
                            this.$message(res.data.msg);
                            localStorage.token=res.data.token;

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
        }
    }

</script>

<style scoped>
    .submit{
        text-align: center;
    }
</style>