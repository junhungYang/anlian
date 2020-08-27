<template>
  <div class="signUpRecord-wrapper bg-default">
    <div class="header-wrapper flex flex-col-center bg-white">
      <img class="logo ml50" src="../img/logo_03.png" alt="">
      <p class="title fc-title fz-36 fw-bold flex-1 text-center mr20">安联培训考试系统</p>
      <router-link to="/index" tag="div" class="handle fz-20 flex flex-column flex-col-center mr20">
        <div class="back-i"></div>
        <span class="fc-default mt10">返回首页</span>
      </router-link>
    </div>
    <p class="title mt30 fz-36 fw-bold text-center fc-title">报名记录查询</p>
    <div class="search flex bg-white">
      <input v-model="fetchParams.idCard" class="flex-1" type="text" placeholder="请输入完整的身份证号码">
      <div class="btn bg-danger-btn fc-white fz-26 fw-bold text-center" @click="fetchRecordList">确认</div>
    </div>
    <ul
      v-infinite-scroll="fetchRecordList"
      :infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="record-list">
      <li class="record-item bg-white mb25" v-for="(item, index) in listData" :key="index">
        <div class="flex flex-col-center fw-bold">
          <div class="flex-1">
            <p class="fz-28">{{item.subjectName}}，您已报名成功</p>
            <p class="fz-24 mt30">报名时间：{{item.createTime}}</p>
            <!--<p class="fz-24 mt10">报名费：{{item.price || 0}}元</p>-->
          </div>
        </div>
        <p class="text-center fz-24 fc-default" @click="$set(item, 'showNotice', !item.showNotice)">点击查看报名须知</p>
        <div v-if="item.showNotice">
          <p class="fz-28 mt10 mb10">报名须知：</p>
          <div class="fz-24" v-html="item.content"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui'

export default {
  directives: {
    InfiniteScroll
  },
  components: {
  },
  data () {
    return {
      fetchParams: {
        idCard: this.$route.query.idCard ? this.$route.query.idCard : this.studentInfo ? this.studentInfo.idCard : '',
        pageNo: 1,
        pageSize: 20
      },
      listData: [],
      loading: false,
      load: false,
      loadAll: false,
      fistLoad: true
    }
  },
  computed: {
    studentInfo () {
      return this.$store.state.studentInfo || {}
    }
  },
  methods: {
    fetchRecordList () {
      let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regIdNo.test(this.fetchParams.idCard)) {
        if (!this.fistLoad) {
          this.$store.commit('showConfirm',{text: '请输入正确的身份证号码查询报名记录'})
        }
        this.fistLoad = false
        return false
      }
      if (this.loadAll || this.load) return false
      this.loading = true
      this.load = true
      base.ajax({
        url: "common/signUp/getSignUpStudentList",
        data: this.fetchParams,
        success: (res) => {
          if (this.fetchParams.pageNo >= res.pageCount && this.listData.length !== 0) this.loadAll = true
          res.signUpStudentList.forEach(item => {
            item.showNotice = false
          })
          if (this.listData.length === 0 && res.signUpStudentList.length === 0) this.$store.commit('showConfirm',{text: '您暂无报名记录'})
          this.listData = this.listData.concat(res.signUpStudentList)
          this.loading = false
          this.load = false
          this.fetchParams.pageNo += 1
        },
        error: (error) => {
          this.loading = false
          this.load = false
          this.$store.commit('showConfirm',{text: error.message})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  /** 清除浮动 **/
  .clearfix::after,
  .clearfix::after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
    overflow: hidden;
    visibility: hidden;
  }
  .clearfix {
    *zoom: 1;
  }

  .textHide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text-hide1,
  .text-hide2,
  .text-hide3 {
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .text-hide1 {
    -webkit-line-clamp: 1;
  }

  .text-hide2 {
    -webkit-line-clamp: 2;
  }

  .text-hide3 {
    -webkit-line-clamp: 3;
  }
  .align-middle{
    vertical-align: middle;
  }
  .border-1px{
    border: 1px solid #ccc;
  }
  .container-wrap{
    width: 100%;
  }
  .padding-none{
    padding: 0;
  }
  .inline-block{
    display: inline-block;
  }
  .block{
    display: block;
  }
  .flex{
    display: flex;
  }
  .flex-center{
    justify-content: center;
  }
  .flex-column{
    flex-direction: column;
  }
  .flex-between{
    justify-content: space-between;
  }
  .flex-col-center{
    align-items: center;
  }
  .flex-right{
    justify-content: flex-end;
  }
  .flex-col-end{
    align-items: flex-end;
  }
  .flex-content-around {
    justify-content: space-around;
  }
  .flex-1{
    flex: 1;
  }
  .flex-wrap{
    flex-wrap: wrap;
  }
  .cursor{
    cursor: pointer;
  }
  .text-muted{
    color: #999999 !important;
  }
  .fc-title{
    color: #4b5eb2;
  }
  .fc-danger{
    color: #ff0000;
  }
  .fc-primary{
    color: #26A2FF;
  }
  .fc-secondly{
    color: #339900;
  }
  .fc-easy-green{
    color: #56B493;
  }
  .fc-i-user{
    color: #33CC33;
  }
  .fc-palevioletred{
    color: #EB607A;
  }
  .fc-pink{
    color: #FF66CC;
  }
  .fc-white{
    color: #ffffff;
  }
  .fc-default{
    color: #918b8b;
  }
  .fc-main{
    color: #353535;
  }
  .fc-8e8e8e{
    color: #8e8e8e;
  }
  .fc-333{
    color: #333333;
  }
  .fc-999{
    color: #999999;
  }
  .fc-warn{
    color: #FFBD27;
  }
  .fc-black{
    color: #000;
  }
  .fc-green{
    color: #89C600;
  }
  .fc-8399F7{
    color: #8399F7;
  }
  .fc-61A7F2{
    color: #61A7F2;
  }
  .bg-green{
    background: #89C600;
  }
  .bg-f5{
    background: #f5f5f5;
  }
  .bg-warn{
    background: #FFBD27;
  }
  .bg-easy-green{
    background: #56B493;
  }
  .bg-danger{
    background: #ff0000;
  }
  .bg-danger-btn{
    background: #4b5eb2;
  }
  .bg-primary{
    background: #26A2FF;
  }
  .bg-pink{
    background: #FF66CC;
  }
  .bg-default{
    background: #f8f8f8;
  }
  .bg-white{
    background: #ffffff;
  }
  .fz-12{
    font-size: 12px;
  }
  .fz-14{
    font-size: 14px;
  }
  .fz-16{
    font-size: 16px;
  }
  .fz-18{
    font-size: 18px;
  }
  .fz-20{
    font-size: 0.6rem;
  }
  .fz-24{
    font-size: 0.72rem;
  }
  .fz-34{
    font-size: 1.3rem;
  }
  .fz-36{
    font-size: 1.5rem;
  }
  .fw-bold{
    font-weight: bold;
  }

  .hidden {
    overflow: hidden;
  }

  .fixed {
    position: fixed;
    width: 100%;
  }

  .is-disabled {
    opacity: 0.6;
  }

  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active{
    transition:opacity .5s;
  }
  .fade-leave-active {
    opacity: 0;
    transition: opacity .5s;
  }

  /** 各类间隔 **/



  /** 类名: 方位 **/
  .left {
    float: left !important;
  }
  .right {
    float: right !important;
  }
  .text-center {
    text-align: center !important;
  }
  .text-left {
    text-align: left !important;
  }
  .text-right {
    text-align: right !important;
  }

  /** 各种边距 **/
  .mt10{
    margin-top: 0.3rem;
  }
  .mt20{
    margin-top: 0.6rem;
  }
  .mt30{
    margin-top: 0.9rem;
  }
  .mt50{
    margin-top: 1.5rem;
  }
  .mt80{
    margin-top: 2.4rem;
  }

  .mr25{
    margin-right: 0.75rem;
  }
  .mr20{
    margin-right: 0.6rem;
  }

  .mb10{
    margin-bottom: 0.3rem;
  }
  .mb30{
    margin-bottom: 0.9rem;
  }
  .mb25{
    margin-bottom: 0.75rem;
  }

  .ml20{
    margin-left: 0.6rem;
  }
  .ml40{
    margin-left: 1.2rem;
  }
  .ml50{
    margin-left: 1.5rem;
  }
  .back-i{
    width: 1.32rem;
    height: 1.2rem;
    background: url("../img/back-i.png") center no-repeat;
    background-size: 100%;
  }
  .header-wrapper{
    width: 100%;
    height: 4.2rem;
    box-shadow: 0 0.06rem 0.12rem #dddddd;
    .logo{
      width: 2.8rem;
      height: 2.8rem;
    }
    .title{
      height: 1.95rem;
      line-height: 1.95rem;
      border-right: 1px solid #918b8b;
    }
  }
.signUpRecord-wrapper{
  width: 100%;
  min-height: 100vh;
  .search {
    width: calc(100% - 3rem);
    margin: 1rem auto;
    height: 2.34rem;
    line-height: 2.34rem;
    border: 1px solid #e8e8e8;
    border-radius: 0.6rem;
    overflow: hidden;
    & > input {
      width: 100%;
      height: 100%;
      padding-left: 0.6rem;
    }
    .btn {
      width: 3.24rem;
      height: 2.34rem;
      border: 1px solid #4b5eb2;
    }
  }
  .record-list{
    box-sizing: border-box;
    width: 100%;
    padding: 0.9rem 1.5rem;
    .record-item{
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #cccfcd;
      border-radius: 0.3rem;
      padding: 0.6rem 1.08rem;
      .qrcode{
        width: 4.2rem;
        padding-left: 0.9rem;
        position: relative;
        &:before{
          content: '';
          width: 1px;
          height: 2.4rem;
          background: #cccfcd;
          position: absolute;
          left: 0;
          top: 0.6rem;
        }
      }
    }
  }
}
</style>
