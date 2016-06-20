var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var InputEle = require('/components/InputEle');
var GetMsgCode = require('components/GetMsgCode');
var Modal = require('/components/Modal');
var RenderForm = require('components/RenderForm');
var Loading = require('components/Loading');
require('/lib/jquery');
var usernameForm={
    "fullname": {
      "field": "fullname",
      "name": "我的商户名称",
      "remark": "36最多个字符个汉字",
      "required": "1",
      "type": "input",
      "length": "200"
    },
    "code": {
      "field": "code",
      "name": "请输入您的短信验证码",
      "remark": "36最多个字符个汉字",
      "required": "1",
      "type": "codeInput",
      "data":{
        "phone":"",
        "type":"change"
      },
      "length": "200"
    },
    "logo": {
      "field": "logo",
      "name": "LOGO推荐使用1:1比例图片图片",
      "remark": "主要作为分享图片和广告logo",
      "required": "1",
      "type": "images",
      "size": "5M",
      "ratio": "1:1",
      "count":"1",
      "expect_height": "200",
      "expect_width": "200"
    }
}

var pswForm={
    "phone": {
      "field": "phone",
      "name": "您的手机号码",
      "remark": "36最多个字符个汉字",
      "required": "1",
      "type": "input",
      "defaultValue":"",
      "length": "200"
    },
    "password": {
      "field": "password",
      "name": "设置我的登陆密码",
      "remark": "36最多个字符个汉字",
      "required": "1",
      "type": "password",
      "length": "200"
    },
    "code": {
      "field": "code",
      "name": "请输入您的短信验证码",
      "remark": "36最多个字符个汉字",
      "required": "1",
      "type": "codeInput",
      "data":{
        "phone":"",
        "type":"changePwd"
      },
      "length": "200"
    }
    
}
var payPswForm={
    "phone": {
      "field": "phone",
      "name": "您的手机号码",
      "remark": "36最多个字符个汉字",
      "required": "1",
      "type": "input",
      "defaultValue":"",
      "length": "200"
    },
    "pay_pwd": {
      "field": "pay_pwd",
      "name": "设置我的支付密码",
      "remark": "36最多个字符个汉字",
      "required": "1",
      "type": "password",
      "length": "200"
    },
    "code": {
      "field": "code",
      "name": "请输入您的短信验证码",
      "remark": "36最多个字符个汉字",
      "required": "1",
      "type": "codeInput",
      "data":{
        "phone":"",
        "type":"changePayPwd"
      },
      "length": "200"
    }
    
}

var UserPublicHead = React.createClass({
	getInitialState:function(){
	    return {
	        loading:true,
	        rendData:{},
	        openModal:false,
	        showUpFile1:false,
	        imgList1:[],
	        resData:{}
	    };
	},
    upData:function(){
        var _this=this;
        $.get('/merchant/info',function(data){
            usernameForm.code.data.phone=data.data.phone;
            pswForm.code.data.phone=data.data.phone;
            pswForm.phone.defaultValue=data.data.phone;
            payPswForm.code.data.phone=data.data.phone;
            payPswForm.phone.defaultValue=data.data.phone;
            _this.setState({loading:false,resData:data.data});
        },'json');
    },
    toggleModal:function(str,show){
        PubSub.publish(str,{show:show});
    },

    getUnameCallBack:function(d,r){
        if(r.code=="SUCCESS"){
            location.reload();
        } 
    },
    getPswCallBack:function(d,r){
        if(r.code=="SUCCESS"){
            location.reload();
        } 
    },
    getPayPswCallBack:function(d,r){
        if(r.code=="SUCCESS"){
            location.reload();
        } 
    },
    loginOut:function(){
      $.post('/index.php?m=Member&c=Public&a=logout',function(data){
        alert(data.info);
        if(data.code=="SUCCESS"){
          location.reload();
        }
      },'json')
    },
	componentWillMount:function(){
		this.upData();
	},
    render: function () {
    	if(this.state.loading){
    		return (<div className="cont-wrap mAuto oh white-bg "><Loading /></div>)
    	}else{
	        return (
	        	<div className="cont-wrap user-info mAuto clearfix pt20 pb20 white-bg ">
                    <div className="user-info-left pr30 pl20 pt15  fl">
                        <div className="item-img img1">
                            <img src={this.state.resData.logo} alt="" />
                        </div>
                        <div className="item-img img2">
                            <img src={this.state.resData.logo} alt="" />
                        </div>
                        <div className="item-img img3">
                            <img src={this.state.resData.logo} alt="" />
                        </div>
                        <div className="item-img img4">
                            <img src={this.state.resData.logo} alt="" />
                        </div>
                        <a href="javascript:;"  onClick={this.toggleModal.bind(this,'username',true)} className="btn base-btn fs14 ml15">修改</a>
                    </div>
                    <Modal  ifBindSP="true"  title="修改用户名或头像" name="username" >
                        <RenderForm postUrl="/merchant/info" getSubVal={this.getUnameCallBack} name="username"  rendData={usernameForm} />
                    </Modal>
                    <Modal  ifBindSP="true" name="password" >
                        <RenderForm postUrl="/?m=Member&c=Public&a=change_password" getSubVal={this.getPswCallBack} name="password"  rendData={pswForm} />
                    </Modal>
                    <Modal  ifBindSP="true" name="pay_password" >
                    <RenderForm postUrl="/?m=Member&c=index&a=change_pay_pwd" getSubVal={this.getPayPswCallBack} name="pay_password"  rendData={payPswForm} />
                    </Modal>
                    <div className="user-info-right ubl1 ml15 fl fuzzy-border">
                        <div className="fl w300 pl50">
                            <h4 className="tit mb10 fs18">{this.state.resData.company_name}<a href="javascript:;" onClick={this.loginOut} className="fs12 vm ml15">[退出登录]</a></h4>
                            <div className="fs14 mb10 desalt-color">
                                <div className="inline-block vm w200">账户：{this.state.resData.phone} </div>
                                <a href="javascript:;" onClick={this.toggleModal.bind(this,'username',true)} className="btn base-btn vm p0 pl5 pr5 fs14">修改</a>
                            </div>
                            <div className="fs14 mb10 desalt-color">
                                <div className="inline-block vm w200">密码：{this.state.resData.password}</div>
                                <a href="javascript:;" onClick={this.toggleModal.bind(this,'password',true)} className="btn base-btn vm p0 pl5 pr5 fs14">修改</a>
                            </div>
                            <div className="fs14 mb10 desalt-color">
                                <div className="inline-block vm w200">交易密码：{this.state.resData.pay_password}</div>
                                <a href="javascript:;" onClick={this.toggleModal.bind(this,'pay_password',true)} className="btn vm base-btn p0 pl5 pr5 fs14">修改</a>
                            </div>
                        </div>
                        <div className="fl w150 tc ml50">
                            <div className="desalt-color mt5">账户余额(元)</div>
                            <div className="contrary-color fs24 mt10">{this.state.resData.balance}</div>
                            <div className="mt10">
                                <a href="javascript:;" className="btn assist-btn">充值</a>
                            </div>
                        </div>
                    </div>
                </div>
	        );
        }
    }
});

	React.render(
		<UserPublicHead />,
	  	document.getElementById('UserPublicHead')
	);	
	