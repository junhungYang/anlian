<template>
    <div class="signUpPage">
        <background></background>
        <div class="logo-container">
            <img src="../../img/logo_03.png" class="logo">
        </div>
        <h3 class="company">安联安全生产培训有限公司</h3>
        <div class="notice" v-html="notice"></div>
        <div class="lesson-container">
            <div class="header">
                <div class="lessonSlt-container">
                    <div class="left" style="line-height:3rem">报名课程:</div>
                    <select style="border:2px solid red;height:3rem;width:80%; padding: 0 .5rem" name="lesson" v-model="subjectChecked" :class="{unSelected: subjectChecked == -1}">
                        <option  :value="-1" disabled>-----请选择-----</option>
                        <option v-for="item,index in subjectList" :value="index">{{item.subjectName}}</option>
                    </select>
                </div>
                <div class="info">
                    <div>剩余名额：<span v-if="typeof subjectInfo.remainSignUpQuantity != 'undefined'">{{subjectInfo.remainSignUpQuantity}}人</span></div>
                    <div>报名费用：<span v-if="typeof subjectInfo.price != 'undefined'">{{subjectInfo.price}}元</span></div>
                </div>
            </div>
            <div class="detail">
                <div class="content" v-html="subjectInfo.subjectDetails"></div>
            </div>
        </div>
        <div class="form">
            <h3>请填写相关信息</h3>
            <div class="input-container">
                <div class="left">
                    姓名<em>*</em>:
                </div>
                <div class="right">
                    <input type="text" placeholder="报名人姓名" v-model="form.studentName">
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    性别<em>*</em>:
                </div>
                <div class="right">
                    <label>
                        <input type="radio" name="sex" value="1" class="checkbox" v-model="form.sex">
                        <i class="checkbox-i"></i>
                        <span>男</span>
                    </label>
                    <label>
                        <input type="radio" name="sex" value="2" class="checkbox" v-model="form.sex">
                        <i class="checkbox-i"></i>
                        <span>女</span>
                    </label>
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    身份证号码<em>*</em>:
                </div>
                <div class="right">
                    <input type="text" placeholder="报名人身份证号码" v-model="form.idCard">
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    手机号码<em>*</em>:
                </div>
                <div class="right">
                    <input type="text" placeholder="报名人手机号码" v-model="form.phone">
                </div>
            </div>
            <div class="select-position">
                <div class="left">
                    所在地区<em>*</em>
                </div>
                <select class="right" style="border:0;" v-model="form.location">
                    <option v-for="item,index in subjectInfo.location" :value="item" :selected="index === 0 ? 'selected' : ''">{{item}}</option>
                </select>
            </div>
            <!-- <div class="input-container">
                <div class="left">
                    电子邮箱:
                </div>
                <div class="right">
                    <input type="text" placeholder="报名人电子邮箱" v-model="form.email">
                </div>
            </div> -->
            <div class="select-position">
                <div class="left">
                    行业分类
                </div>
                <select class="right" style="border:0;" v-model="form.tradeType">
                    <option :value="undefined"> </option>
                    <option :value="1">轻工行业</option>
                    <option :value="2">纺织行业</option>
                    <option :value="3">商贸行业</option>
                </select>
            </div>
            <div class="select-position">
                <div class="left">
                    学历<em>*</em>
                </div>
                <select class="right" style="border:0;" v-model="form.education">
                    <option v-for="item,index in education" :value="index + 1" :selected="index === 0 ? 'selected' : ''">{{item}}</option>
                </select>
            </div>
            <div class="input-container" v-if="subjectInfo.isPay === 1">
                <div class="left">
                    发票类型<em>*</em>:
                </div>
                <div class="right">
                    <label @click.prevent="type(1)">
                        <input type="radio" name="type" :value="1" class="checkbox" v-model="form.type">
                        <i class="checkbox-i"></i>
                        <span>个人发票</span>
                    </label>
                    <label @click.prevent="type(2)">
                        <input type="radio" name="type" :value="2" class="checkbox" v-model="form.type">
                        <i class="checkbox-i"></i>
                        <span>企业发票</span>
                    </label>
                </div>
            </div>
            <div class="input-container" v-if="subjectInfo.isPay === 1">
                <div class="left">
                    发票形式<em>*</em>:
                </div>
                <div class="right">
                    <label @click.prevent="invoiceTypeC(1)">
                        <input type="radio" name="invoiceType" :value="1" class="checkbox" v-model="form.invoiceType">
                        <i class="checkbox-i"></i>
                        <span>电子发票</span>
                    </label>
                    <!-- <label @click.prevent="invoiceTypeC(2)">
                        <input type="radio" name="invoiceType" :value="2" class="checkbox" v-model="form.invoiceType">
                        <i class="checkbox-i"></i>
                        <span>纸质发票</span>
                    </label> -->
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    企业名称<em>*</em>:
                </div>
                <div class="right">
                    <input type="text" placeholder="公司名称" v-model="form.companyName">
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    公司地址:
                </div>
                <div class="right">
                    <input type="text" placeholder="公司地址" v-model="form.companyLocation">
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    纳税登记号<em>*</em>:
                </div>
                <div class="right">
                    <input type="text" placeholder="请确认无误" v-model="form.invoice">
                </div>
            </div>
            <p class="errorTips">{{errorMsg}}</p>
            <div class="flex btn-wrap">
                <router-link style="margin-right:1rem" to="/signUpRecord" tag="button" class="btn-a">报名查询</router-link>
                <button style="margin-left:1rem" class="btn-a" @click="signUp()">确定报名</button>
            </div>
            
        </div>
        <confirm-comp v-model="isShowConfirm_1" okText="确认报名" cancelText="" @ok="pay()" @close="showConfirm_1(!1)">
            <section v-if="subjectChecked >= 0" class="infoConfirm">
                <h3>请确认所填信息</h3>
                <ul>
                    <li>
                        <div class="left">
                            报名课程:
                        </div>
                        <div class="right">
                            {{subjectList[subjectChecked] && subjectList[subjectChecked].signUpSubjectId}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            姓名:
                        </div>
                        <div class="right">
                            {{form.studentName}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            性别:
                        </div>
                        <div class="right">
                            {{form.sex == 1 ? '男' : '女'}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            身份证号码:
                        </div>
                        <div class="right">
                            {{form.idCard}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            手机号码:
                        </div>
                        <div class="right">
                            {{form.phone}}
                        </div>
                    </li>
                     <li v-if="form.email">
                        <div class="left">
                            电子邮箱:
                        </div>
                        <div class="right">
                            {{form.email}}
                        </div>
                    </li>
                    <li v-if="form.education">
                        <div class="left">
                            学历:
                        </div>
                        <div class="right">
                            {{education[form.education - 1]}}
                        </div>
                    </li>
                    <li v-if="subjectInfo.isPay === 1">
                        <div class="left">
                            发票类型:
                        </div>
                        <div class="right">
                            {{form.type == 1 ? '个人发票' : form.type == 2  ?　'企业发票'　: ''}}
                        </div>
                    </li>
                    <li v-if="subjectInfo.isPay === 1">
                        <div class="left">
                            发票形式:
                        </div>
                        <div class="right">
                            {{form.invoiceType == 1 ? '电子发票' : form.invoiceType == 2  ?　'纸质发票'　: ''}}
                        </div>
                    </li>
                    <li v-if="form.type === 2 && subjectInfo.isPay === 1">
                        <div class="left">
                            企业名称:
                        </div>
                        <div class="right">
                            {{form.companyName}}
                        </div>
                    </li>
                    <li v-if="form.type === 2 && subjectInfo.isPay === 1">
                        <div class="left">
                            纳税登记号:
                        </div>
                        <div class="right">
                            {{form.invoice}}
                        </div>
                    </li>
                </ul>
            </section>
        </confirm-comp>
    </div>
</template>

<script type="text/ecmascript-6">
    import background from '../../layouts/background.vue'
    import wechat from '../../js/wechat'
    import confirmComp from '../../components/confirmComp.vue'
    export default {
        data () {
            return {
                education: ['初中', '高中', '中专', '大专', '本科', '研究生', '博士'],
                subjectChecked: 0,
                subjectList: [],
                subjectInfo: {},
                notice: '',
                form: {
                    signUpSubjectId: 1,
                    studentName: '',
                    sex: '',
                    idCard: '',
                    phone: '',
                    companyName: '',
                    invoice: '',
                    invoiceType: 1,
                    type: 1,
                    email: '',
                    location: '',
                    education: 0,
                    companyLocation: '',
                    tradeType: 1
                },
                errorMsg: '',
                isShowConfirm_1: false,
                isShowConfirm_2: false
            }
        },
        mounted () {
        },
        watch: {
            subjectChecked (val) {
                if (val >= 0) {
                    this.form.signUpSubjectId = this.subjectList[val].signUpSubjectId
                    this.getSubjectInfo()
                }
            },
            form: {
                handler () {
                    this.clearErrorMsg()
                },
                deep: true
            }
        },
        methods: {
            showConfirm_1 (bool) {
                this.isShowConfirm_1 = bool
            },
            showConfirm_2 (bool) {
                this.isShowConfirm_2 = bool
            },
            clearErrorMsg () {
                this.errorMsg = ''
            },
            getSubjectList () {
                base.ajax({
                    url: "common/signUp/getSignUpSubjectList",
                    data: {
                        state: 1
                    },
                    success: (data) => {
                        this.subjectList = data
                        this.form.signUpSubjectId = this.subjectList[0].signUpSubjectId
                        this.getSubjectInfo()
                    }
                })
            },
            getSubjectInfo () {
                base.ajax({
                    url: "common/signUp/getSignUpSubjectInfo",
                    data: {
                        signUpSubjectId: this.form.signUpSubjectId
                    },
                    success: (data) => {
                        data.location = data.location.split(',')
                        this.subjectInfo = data
                    }
                })
            },
            getNotice () {
                base.ajax({
                    url: "common/signUp/getNoticeInfo",
                    success: (data) => {
                        this.notice = data.noticeContent
                    }
                })
            },
            invoiceTypeC (val) {
                // this.form.invoiceType = this.form.invoiceType == val ? -1 : val
                this.form.invoiceType = val
            },
            type (val) {
                this.form.type = val
            },
            signUp () {
                for (let key in this.form) { // 非空验证
                    let flag = this.form.invoiceType != '' && this.form.type != '' && this.form.studentName != '' && this.idCard != '' && this.phone != '' && this.form.location != ''
                    if (this.form.hasOwnProperty(key)){
                        if (!this.form[key] && key !== 'email'){
                            if (key == 'signUpSubjectId') {
                                this.$store.commit('showConfirm',{text: '请先选择科目'})
                            } else {
                                if (!flag || (['invoice', 'companyName',].indexOf(key) && this.form.type === 2)) {
                                    this.$store.commit('showConfirm',{text: '请先填完报名人信息'})
                                } else {
                                    this.showConfirm_1(true)
                                }
                            }
                            return
                        }
                    }
                }
                if (this.form.education < 1) {
                    this.$store.commit('showConfirm',{text: '请选择学历'})
                }
                this.showConfirm_1(true)
            },
            pay () {
                this.showConfirm_1(false)
                let url = (this.subjectInfo.isPay === 1 ? 'common/signUp/paySignUp' : 'common/signUp/paySignUp2')
                let data = { openid: wechat.openid, ...this.form }
                base.ajax({
                    url,
                    data,
                    success: (data) => {
                        if(this.subjectInfo.isPay === 1) {
                            wechat.payParam = data
                            wechat.setWxConfig({
                                jsApiList: ['chooseWXPay'],
                                ready: () => {
                                    wechat.paySubmit({
                                        success: () => {
                                            this.$store.commit('showConfirm',{
                                                text: '您已预约报名成功，具体通知请留意短信或我司来电。',
                                                ok: () => {
                                                    this.$router.push('/signUp/orderDetail?orderCode=' + data.orderCode)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }else {
                            this.$store.commit('showConfirm',{
                                text: '您已预约报名成功，具体通知请留意短信或我司来电。',
                                ok: () => {
                                    this.form.studentName = ''
                                    this.form.sex = ''
                                    this.form.idCard = ''
                                    this.form.phone = ''
                                    this.form.companyName = ''
                                    this.form.invoice = ''
                                    this.form.email = ''
                                }
                            })
                        }
                    },
                    error: (error) => {
                        if (error.status == 304 || error.status == 308) {
                            this.errorMsg = error.message
                        }
                    }
                })
            }
        },
        created () {
            wechat.getOpenid()
            this.getNotice()
            this.getSubjectList()
        },
        components: {
            background,
            confirmComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../css/base.scss";
    .signUpPage {
        position: relative;
        padding-bottom: 8.5rem;
        em{
            color: red;
        }
        .logo {
            display: block;
            width: 7.9rem;
            margin: 0 auto;
            padding: 2rem 0 1.3rem;
        }
        .company {
            font-size: 2rem;
            color: #fff;
            text-shadow: 0.2rem 0.2rem 0.2rem #434e84;
            text-align: center;
            margin-bottom: 1.8rem;
        }
        .notice {
            padding: 1rem 2rem;
            font-size: 1.2rem;
            background: rgba(255,255,255,0.8);
            line-height: 2rem;
            /*white-space: pre-wrap;*/
            margin: 0 $padding;
        }
        .lesson-container {
            margin: 2.3rem $padding 0;
            background: #fff;
            box-shadow: 0 0.2rem 0.5rem #ddd;
            border-radius: 2rem;
            border: 0.1rem solid #e8e8e8;
            .header {
                padding: 1.2rem 2rem 0;
            }
            .info {
                display: flex;
                line-height: 2rem;
                div {
                    width: 50%;
                    padding-left: 10%;
                    font-size: 1rem;
                    color: #8e8e8e;
                }
            }
            .detail {
                min-height: 5rem;
                border-top: 0.1rem solid #e8e8e8;
                padding: 2rem;
            }
        }
        .lessonSlt-container {
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            height: 3.5rem;
            line-height: 1.6rem;
            .left {
                width: 25%;
            }
            select {
                width: 72%;
                font-size: 1.2rem;
                box-sizing: border-box;
                appearance: none;
                border: none;
                background: url("../../img/arrowDown-i_02.png") no-repeat scroll 97% center transparent;
                background-size: 1.5rem;
                padding-right: 1.4rem;
                height: 1.6rem;
                line-height: 1.6rem;
                &.unSelected {
                    color: #8e8e8e;
                }
            }
            option {
                color: #353535;
            }
            option[disabled] {
                color: #8e8e8e;
            }
        }
        .form {
            margin: 0 $padding;
            padding: 0 1.5rem;
            h3 {
                font-size: 1.5rem;
                padding: 1.8rem 0 0.8rem;
            }
            .input-container,.select-position {
                display: flex;
                font-size: 1.2rem;
                padding: 1rem 0;
                border-bottom: 0.1rem solid #e8e8e8;
                .left {
                    width: 35%;
                }
                .right {
                    width: 70%;
                }
                label {
                    margin-right: 1rem;
                }
            }
            .btn-a {
                margin-top: 2rem;
            }
            .errorTips {
                font-size: 1.2rem;
                margin-top: 1rem;
                margin-left: 10%;
                height: 1.4rem;
                color: $cl-e;
            }
        }
        .infoConfirm {
            width: 80vw;
            font-size: 1.2rem;
            h3 {
                font-size: 1.6rem;
                text-align: center;
                line-height: 2;
                font-weight: bold;
            }
            li {
                display: flex;
                margin: 1rem 2rem;
            }
            .left {
                width: 40%;
                min-width: 40%;
            }
        }
    }
</style>
