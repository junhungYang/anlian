/**
 * Created by Fish on 2016/3/11.
 */

var base = {
    url: 'http://192.168.3.189:8081/yuanExam/',
    // url: 'http://anlian.ydcycloud.com/anlianExam/',
    // url: 'http://192.168.3.189:8080/anlianExam/',
    getUrl: function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return "";
    },
    getPageName: function () {
        var reg = new RegExp(/\/(\w+)(\.|$)/);
        var r = window.location.pathname.match(reg);
        if (r != null) {
            return r[1];
        }
        return ""
    },
    loginInfo: JSON.parse(Cookies.get('loginInfo') || '{}'),
    loginFrequency: Cookies.get('loginFrequency') || ' ',
    setCookie: function (name,value) {
        Cookies.set(name, value, { expires: 7 ,path: '/'});
    },

    getCookie: function(name) {
        return Cookies.get(name);
    },

    removeCookie: function(name){
        Cookies.remove(name);
    },

    aJax: function (json) {
        var This = this;
        var opt = {
            dataType: json.dataType || 'json',
            type: json.type || 'post',
            data: json.data || null,
            async: json.async || true
        };
        $.ajax({
            url: This.url + json.url,
            dataType: opt.dataType,
            type: opt.type,
            data: opt.data,
            success: function(code){
                json.success&&json.success(code);
            },
            error: function (obj) {
                This.error(obj);
            }
        });
    },
    error: function(code){
        switch (code.status) {
            case 300:
                return true;
                break;
            case 103:
                alert(code.message)
                location.href = '../page/login.html'
                break;
            default:
                alert(code.message)
        }
    }
};
if (!base.loginInfo.token && base.getPageName() != 'login') {
    window.location.href = '../page/login.html';
}
var navComp = {
    template: '<div class="nav">' +
    '<ul class="menu">' +
    '<li>' +
    '<span class="_baseLi">个人中心</span>' +
    '<ul class="second">' +
    '<li><a href="../page/user.html" :class="{on: pgN == 1}" class="_baseLi"><i class="user-i_02"></i>我的资料</a></li>' +
    '<li><a href="../page/certificate.html" :class="{on: pgN == 2}" class="_baseLi"><i class="certificate-i"></i>我的证件</a></li>' +
    '<li><a href="../page/change.html" :class="{on: pgN == 3}" class="_baseLi"><i class="password-i_02"></i>修改密码</a></li>' +
    '</ul>' +
    '</li>' +
    '<li>' +
    '<span class="_baseLi">练习</span>' +
    '<ul class="second">' +
    '<li><a href="../page/practice.html?type=1" :class="{on: pgN == 4}"class="_baseLi"><i class="practise-i_01"></i>顺序练习</a></li>' +
    '<li><a href="../page/practice.html?type=2" :class="{on: pgN == 5}" class="_baseLi"><i class="practise-i_03"></i>随机练习</a></li>' +
    '<li><a href="../page/practice.html?type=3" :class="{on: pgN == 6}" class="_baseLi"><i class="practise-i_05"></i>错题练习</a></li>' +
    '</ul>' +
    '</li>' +
    '<li>' +
    '<span class="_baseLi">考试</span>' +
    '<ul class="second">' +
    '<li><a href="../page/testCtrl.html" :class="{on: pgN == 7}" class="_baseLi"><i class="test-i"></i>我要考试</a></li>' +
    '</ul>' +
    '</li>' +
    '<li><a href="javascript:void(0)" class="_baseLi" @click="changeMask = !changeMask">切换科目</a></li>' +
    '<li><a href="javascript:void(0)" class="_baseLi" @click="exitLogin()">退出登录</a></li>' +
    '</ul>' +
    '<div class="mask" v-show="changeMask" @click="changeMask = !changeMask"></div>' +
    '<div class="subjects" v-show="changeMask">' +
    '<div class="subjects-head">请选择科目</div>' +
    '<div class="subjects-line" v-for="item in signUpSubjectList"><label><input type="radio" v-model="subjectChecked" :value="item.subjectId" name="subject">{{item.subjectName}}</label></div>' +
    '<div class="btn" @click="changeSubject()">确定</div>' +
    '</div>' +
    '</div>',
    data: function () {
        return {
            changeMask: false,
            signUpSubjectList: [],
            subjectChecked: '',
            pgN: ''
        }
    },
    methods: {
        ctrl: function () {
            this._show = true;
            this.$emit('ctrl')
        },
        getSubjectList: function () {
            var This = this;
            base.aJax({
                url: 'wap/subject/getSubjectList',
                data: base.loginInfo,
                success: function (code) {
                    if(code.status == 300){
                        This.signUpSubjectList = code.data;
                        Cookies.set('signUpSubjectList', JSON.stringify(This.signUpSubjectList));
                        var subjectChecked = Cookies.get('subjectChecked') || code.data[0].subjectId;
                        This.changeSubject(subjectChecked);
                    } else {
                        base.error(code);
                    }
                }
            })
        },
        changeSubject: function (val) {
            if (val) {
                this.subjectChecked = val;
            }
            Cookies.set('subjectChecked', this.subjectChecked);
            this.$emit('subject-change', this.subjectChecked);
            this.changeMask = false;
        },
        exitLogin: function () {
            // 退出登录
            if (confirm('确认要退出吗？')) {
                Cookies.remove('loginInfo');
                location.href = '../page/login.html';
            }
        }
    },
    created: function () {
        var pageName = base.getPageName();
        switch (pageName) {
            case 'user':
                this.pgN = 1;
                break;
            case 'certificate':
                this.pgN = 2;
                break;
            case 'change':
                this.pgN = 3;
                break;
            case 'practice':
                var type = base.getUrl('type');
                if (type == 2) {
                    this.pgN = 5;
                } else if (type == 3) {
                    this.pgN = 6;
                } else {
                    this.pgN = 4
                }
                break;
            case 'testCtrl':
            case 'test':
                this.pgN = 7;
                break;
        }
        Cookies.remove('signUpSubjectList')
        this.signUpSubjectList = JSON.parse(Cookies.get('signUpSubjectList') || '[]');
        if (!this.signUpSubjectList.length) {
            this.getSubjectList();
        } else {
            this.changeSubject(Cookies.get('subjectChecked'));
        }
    }
};
var headerComp = {
    template:
    '<div class="head _baseBgColor">' +
        '<img src="../img/logo2.png" class="logo">' +
            '<h1>安联安全生产培训考试系统</h1>' +
        '<span>第{{loginFrequency}}次登录</span>' +
    '</div>',
    data: function () {
        return {
            loginFrequency: base.loginFrequency
        }
    }
};