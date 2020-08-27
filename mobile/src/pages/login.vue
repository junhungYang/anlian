<template>
    <div class="loginPage">
            <div class="logo-container">
                <img src="../img/logo_01.png"/>
            </div>
            <div class="form-container">
                <div class="input-container">
                    <div class="icon-container">
                        <i class="user-i_01"></i>
                    </div>
                    <input type="text" placeholder="请输入您的身份证号码" v-model="account" @change="clearErrorMsg()"/>
                </div>
                <div class="input-container">
                    <div class="icon-container">
                        <i class="lock-i"></i>
                    </div>
                    <input type="password" placeholder="请输入密码" v-model="password" @change="clearErrorMsg()"/>
                </div>
                <p class="errorTips">{{errorMsg}}</p>
                <button class="login" @click="login()">登 录</button>
            </div>
        <background></background>
    </div>
</template>

<script>
    import background from '../layouts/background.vue'
    export default {
        data () {
            return {
                account: '',
                password: '',
                errorMsg: ''
            }
        },
        watch: {
            account: 'clearErrorMsg',
            password: 'clearErrorMsg'
        },
        methods: {
            clearErrorMsg () {
                this.errorMsg = ''
            },
            login () {
                base.ajax({
                    url: 'wap/student/login',
                    data: {
                        account: this.account,
                        password: this.password
                    },
                    success: (data) => {
                        this.$store.commit('setLoginInfo', {id: data.studentId, name: data.studentName, token: data.token})
                        this.$router.push('/')
                    },
                    error: (error) => {
                        if (error.status == 302) {
                            this.errorMsg = '用户名或密码的格式不正确, 请重新输入'
                            return true
                        }
                        if (error.status == 100) {
                            this.errorMsg = '用户名或者密码错误, 请重新输入'
                            return true
                        }
                        return false
                    }
                })
            }
        },
        mounted () {
            // 安卓处理输入法框影响background
            document.getElementsByClassName('loginPage')[0].style.minHeight = window.innerHeight + 'px'
        },
        components: {
            background
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .loginPage {
        position: relative;
        .logo-container {
            padding: 4.5rem 0 1rem;
            img {
                display: block;
                width: 13.8rem;
                height: 13.8rem;
                margin: 0 auto;
            }
        }
        .form-container {
            width: 78%;
            margin: 0 auto;
        }
        .input-container {
            display: flex;
            margin: 2rem auto 0;
            height: 3.5rem;
            input {
                background: #fff;
                height: 100%;
                flex: 1;
                font-size: 1.3rem;
                line-height: 1;
                padding: 0 1rem;
                box-sizing: border-box;
            }
            .icon-container {
                width: 3.5rem;
                height: 3.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: $cl-f;
            }
        }
        .errorTips {
            font-size: 1.2rem;
            color: #ff4e4e;
            line-height: 3rem;
            min-height: 3rem;
        }
        .login {
            display: block;
            width: 100%;
            color: #fff;
            font-size: 1.5rem;
            height: 3.5rem;
            line-height: 3.5rem;
            border-radius: 3.5rem;
            background: $cl-f;
        }
    }
</style>
