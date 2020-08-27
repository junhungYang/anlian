<template>
    <div class="indexPage">
        <div class="topContainer">
            <div class="flex">
                <div class="img-wrap">
                    <img src="../img/logo_02.png">
                </div>
                <div class="welcome">
                    安联安全生产培训系统<br/>
                    欢迎{{studentName}}用户，您的到来！<br/>
                    <!--<em>查看机构简介 ></em>-->
                </div>
            </div>
            <div class="flex">
                <router-link class="navItem" to="/myInfo">
                    <i class="user-i_02"></i>
                    <span>个人资料</span>
                </router-link>
                <router-link class="navItem" to="/myCertificate">
                    <i class="card-i"></i>
                    <span>我的证件</span>
                </router-link>
                <router-link class="navItem" to="/classInfo">
                    <i class="horn-i"></i>
                    <span>开班信息</span>
                </router-link>
                <router-link class="navItem" to="/examSignUp">
                    <i class="building-i"></i>
                    <span>预约考试</span>
                </router-link>
            </div>
        </div>
        <div class="myExamSignUp" v-if="myExamSignUp.length > 0">
            <div class="header">
                <h6>—我的预约—</h6>
                <button class="admin" @click="showAdmin(!isAdmin)">{{isAdmin ? '取消' : '管理'}}</button>
            </div>
            <ul class="content">
               <li v-for="item in myExamSignUp">
                   <p class="title">
                       {{item.subjectName}}
                   </p>
                   <p class="date" v-html="split(item.examTime)">
                   </p>
                   <!--<transition name="slideRight">-->
                       <a class="delete" v-show="isAdmin" @click="cancelBespeak(item.bespeakExamId)">取 消<br/>预 约</a>
                   <!--</transition>-->
               </li>
            </ul>
        </div>
        <div class="subjectSlt">
            <p>请选择做题科目:</p>
            <div class="toSlt" @click="showPopup(!0)">
                {{subjectCheckedName}}
            </div>
        </div>
        <div class="menu">
            <div class="row">
                <router-link class="item" to="/testInfo">
                    <div class="img-wrap_01">
                        <i class="test-i"></i>
                    </div>
                    <span>考试</span>
                </router-link>
                <router-link class="item" to="/practise?type=1">
                    <div class="img-wrap_02">
                        <i class="practice-i_02"></i>
                    </div>
                    <span>顺序练习</span>
                </router-link>
            </div>
            <div class="row">
                <router-link class="item" to="/practise?type=2">
                    <div class="img-wrap_03">
                        <i class="practice-i_03"></i>
                    </div>
                    <span>随机练习</span>
                </router-link>
                <router-link class="item" to="/practise?type=3">
                    <div class="img-wrap_04">
                        <i class="practice-i_01"></i>
                    </div>
                    <span>错题练习</span>
                </router-link>
            </div>
        </div>
        <popup-comp v-model="isShowPopup" @close="showPopup(!1)">
            <div class="sltPopup">
                <div class="header">
                    <span>请选择练习/考试科目</span>
                </div>
                <div class="content">
                    <label v-for="item in subjectList">
                        <input type="radio" :value="item.subjectId" name="subject" v-model="checked" class="checkbox">
                        <i class="checkbox-i"></i>
                        <p>{{item.subjectName}}</p>
                    </label>
                </div>
                <div class="submit" @click="submitSlt()">确定</div>
            </div>
        </popup-comp>
    </div>
</template>

<script>
    import popupComp from '../components/popupComp.vue'
    export default {
        data () {
            return {
                isShowPopup: false,
                checked: '',
                isAdmin: false
            }
        },
        computed: {
            studentName () {
                return this.$store.state.loginInfo.name
            },
            subjectList () {
                return this.$store.state.subjectList
            },
            subjectChecked () {
                return this.$store.state.subjectChecked
            },
            subjectCheckedName () {
                var name = '.'
                this.subjectList && this.subjectList.some((item) => {
                    if (item.subjectId == this.subjectChecked) {
                        name = item.subjectName
                        return true
                    }
                })
                return name
            },
            myExamSignUp () {
                return this.$store.state.myExamSignUp || []
            }
        },
        methods: {
            showPopup (bool) {
                this.isShowPopup = bool
                this.checked = this.subjectChecked
            },
            submitSlt () {
                this.$store.commit('setSubjectChecked', this.checked)
                this.showPopup(!1)
            },
            showAdmin (bool) {
                this.isAdmin = bool
            },
            cancelBespeak (id) {
                this.$store.dispatch('cancelBespeak', id)
            },
            split (str) {
                return str.replace(' ', '</br>')
            }
        },
        created () {
            this.$store.dispatch('getSubjectList')
            this.$store.dispatch('getMyExamSignUp')
        },
        components: {
            popupComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .indexPage {
        .topContainer {
            background: linear-gradient(to bottom right, #bad7ff , #7787ca);
            .flex:first-child {
                padding: 1.5rem $padding/2 0.5rem;
                .img-wrap {
                    display: flex;
                    justify-content: center;
                    width: 30%;
                }
                img {
                    display: block;
                    margin: 0 auto;
                    width: 7.5rem;
                    height: 8rem;
                }
                .welcome {
                    font-size: 1.5rem;
                    flex: 1;
                    text-align: center;
                    color: #fff;
                    line-height: 2.2rem;
                    margin-top: -0.3rem;
                }
                em {
                    font-size: 1rem;
                }
            }
            .navItem {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                justify-content: center;
                width: 25%;
                margin-bottom: 0.8rem;
                box-sizing: border-box;
                border-right: 0.1rem solid #fff;
                span {
                    font-size: 1.2rem;
                    color: #fff;
                }
            }
            .navItem:last-child {
                border: none;
            }
            .flex:last-child i {
                width: 3rem;
                height: 3rem;
            }
        }
        .myExamSignUp {
            border-top: 0.5rem solid #f5f5f5;
            border-bottom: 0.5rem solid #f5f5f5;
            .header {
                position: relative;
                margin-bottom: 0.8rem;
            }
            h6 {
                color: $cl-a;
                padding-top: 1rem;
                text-align: center;
                font-size: 1.4rem;
                line-height: 1;
            }
            .admin {
                position: absolute;
                right: $padding/2;
                font-size: 1.2rem;
                padding: 0.4rem 0.4rem 0;
                bottom: 0;
                color: #8e8e8e;
            }
            li {
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 0.1rem solid #e8e8e8;
                line-height: 1.5rem;
                height: 5.5rem;
                width: 100%;
                padding: 0 $padding/2;
                overflow: hidden;
                box-sizing: border-box;
            }
            li:first-child {
                border-top: none;
            }
            .title {
                width: 58%;
                font-size: 1.2rem;
            }
            .date {
                font-size: 1.2rem;
                text-align: center;
            }
            .delete {
                position: absolute;
                right: -$padding/2;
                padding: 0 $padding/2;
                box-sizing: content-box;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 7rem;
                height: 100%;
                background-color: #e33737;
                color: #fff;
                font-size: 1.2rem;
                line-height: 1.5rem;
            }
        }
        .menu {
            .row{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0 $padding/2 1rem;
            }
            .item {
                display: flex;
                flex-direction: column;
                width: 45vw;
                height: 45vw;
                max-width: 288px;
                max-height: 288px;
                border: 0.1rem solid #e8e8e8;
                font-size: 1.6rem;
                color: #747474;
                align-items: center;
                justify-content: center;
                padding-bottom: 0.4rem;
                box-sizing: border-box;
                box-shadow: 0.1rem 0.1rem 0.2rem #e8e8e8;
            }
            .img-wrap_01,
            .img-wrap_02,
            .img-wrap_03,
            .img-wrap_04 {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                height: 50%;
                border-radius: 50%;
                background: #e4b379;
                margin-bottom: 1rem;
            }
            .img-wrap_02 {
                background: #6a84f2;
            }
            .img-wrap_03 {
                background: #71c280;
            }
            .img-wrap_04 {
                background: #ca5266;
            }
            i {
                width: 66.66%;
                height: 66.66%;
            }
        }
    }
    .subjectSlt {
        display: flex;
        font-size: 1.3rem;
        color: #747474;
        align-items: center;
        justify-content: space-between;
        padding: 1rem $padding/2;
    }
    .subjectSlt .toSlt {
        flex: 1;
        margin-left: 4%;
        border: 0.1rem solid #e8e8e8;
        border-radius: 0.5rem;
        line-height: 2.4rem;
        padding: 0 2rem 0 0.8rem;
        box-sizing: border-box;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .subjectSlt .toSlt:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0.8rem;
        transform: translate3d(0,-50%,0);
        width: 0;
        height: 0;
        border-left: 0.4rem solid transparent;
        border-right: 0.4rem solid transparent;
        border-top: 0.8rem solid #e8e8e8;
    }
    .sltPopup {
        background: #fff;
        width: 25.6rem;
        border-radius: 1.2rem;
        overflow: hidden;
        .header {
            background: $cl-a;
            height: 5.4rem;
            font-size: 1.6rem;
            text-align: center;
            line-height: 5.4rem;
            color: #fff;
        }
        .content {
            padding: 0.5rem 4%;
        }
        label{
            display: flex;
            align-items: center;
            font-size: 1.3rem;
            margin: 1rem 0;
            i {
                margin-right: 0.8rem;
            }
        }
        .submit {
            background-color: #fff;
            border-top: 0.1rem solid #e8e8e8;
            box-sizing: border-box;
            text-align: center;
            font-size: 1.4rem;
            line-height: 4.2rem;
        }
    }
    .slideRight-enter-active, .slideRight-leave-active {
        transition: transform .3s ease-out;
    }
    .slideRight-enter, .slideRight-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>
