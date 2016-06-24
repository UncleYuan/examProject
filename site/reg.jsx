var React = require('react');



require('/lib/jquery');


var LoginForm = React.createClass({
	getInitialState:function(){
	    return {
	    	uname:'',
	    	password:'',
	    	name:'',
	    	department:'',
	    	password:'',
	    	pwd:'',
	    	isPhone:true
	    };
	},
	componentWillMount:function(){
		var _this=this;
		
	},
	goSub:function(e){
		var _this=this;
		this.setState({goSubing:"正在注册中..."});
		$.post('/index.php?g=Yixue&m=Public&a=reg',$('#form').serialize(),function(data){
			alert(data.info);
			_this.setState({goSubing:false});
			if(data.code=="SUCCESS"){
				location.href="/"
			}
		},'json')

	},
	inputChange:function(name,event){
		var setVal={};
		setVal[name]=event.target.value;

		this.setState(setVal)
		//console.log(event,name)
	},
	onBlurUname:function(){
		if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.state.uname))){
			this.setState({isPhone:false});
		}else{
			this.setState({isPhone:true});
		}
	},
	goToGetPsw:function(){
		location.href='/index.php?g=Member&m=Public&a=getpwd';
	},
    render: function () {
    	var showStyle=this.state.isPhone?{"display":"none"}:{"display":"block"}
	        return (
	        	<form id="form" method="post" className="" action="">
	                <div className="">
	                    <div className="ub ub-ac login-input white-bg mb10">
	                        <div className=" uinput ub ub-ac ub-fh">
	                            <div className="mt10 mb10 w65 pr10 pl10 tr ubr1 fuzzy-border">手机号</div>
	                            <input  placeholder="请输入您的手机号"  value={this.state.uname} onChange={this.inputChange.bind(this,"uname")} onBlur={this.onBlurUname} name='phone' type="text" className="ub-f1 fs16 p5 umw4" style={{"outlineStyle":"none"}} />
	                        </div>
	                        <i  style={{"display": "none"}} className="icon-qingchu mr05 fs24 iconfont pos-right-clean base-color"></i>
	                    </div>
	                    <div style={showStyle} className="mb15 ml15 mr15 contrary-color fs11 " >您的输入的手机号码不正确，请重新输入</div>
	                    <div className="ub ub-ac login-input white-bg mb10">
	                        <div className=" uinput ub ub-ac ub-fh">
	                            <div className="mt10 mb10 w65 pr10 pl10 tr ubr1 fuzzy-border">用户名</div>
	                            <input  placeholder="请输入您的用户名"  value={this.state.name} onChange={this.inputChange.bind(this,"name")}  name='name' type="text" className="ub-f1 fs16 p5 umw4" style={{"outlineStyle":"none"}} />
	                        </div>
	                        <i  style={{"display": "none"}} className="icon-qingchu mr05 fs24 iconfont pos-right-clean base-color"></i>
	                    </div>
	                    <div className="ub ub-ac login-input white-bg mb10">
	                        <div className=" uinput ub ub-ac ub-fh">
	                            <div className="mt10 mb10 w65 pr10 pl10 tr ubr1 fuzzy-border">部门</div>
	                            <input  placeholder="请输入您的部门"  value={this.state.department} onChange={this.inputChange.bind(this,"department")}  name='department' type="text" className="ub-f1 fs16 p5 umw4" style={{"outlineStyle":"none"}} />
	                        </div>
	                        <i  style={{"display": "none"}} className="icon-qingchu mr05 fs24 iconfont pos-right-clean base-color"></i>
	                    </div>
	                    
	                    <div className="ub ub-ac login-input  white-bg  mb10">
	                        <div className=" uinput ub-ac ub ub-fh">
	                            <div className="mt10 mb10 w65 pr10 pl10 tr ubr1 fuzzy-border">密码</div>
	                            <input placeholder="请输入您的密码" value={this.state.password}  name='password' type="password" onChange={this.inputChange.bind(this,"password")}  className="umw4 fs16 p5  ub-f1" style={{"outlineStyle":"none"}} />
	                        </div>
	                        <i  style={{"display": "none"}}  className="icon-qingchu  mr05 fs24 iconfont pos-right-clean base-color"></i>
	                    </div>
	                    <div className="ub ub-ac login-input  white-bg  mb10">
	                        <div className=" uinput ub-ac ub ub-fh">
	                            <div className="mt10 mb10 w65 pr10 pl10 tr ubr1 fuzzy-border">重复密码</div>
	                            <input placeholder="请再次输入您的密码" value={this.state.pwd}  name='pwd' type="password" onChange={this.inputChange.bind(this,"pwd")}  className="umw4 fs16 p5  ub-f1" style={{"outlineStyle":"none"}} />
	                        </div>
	                        <i  style={{"display": "none"}}  className="icon-qingchu  mr05 fs24 iconfont pos-right-clean base-color"></i>
	                    </div>
	                </div>
	                <div className="ub ub-ver ">
	                    <div className=" ub ub-pb fs12  ml10 mr10 mb15 mt5">
	                    	<div onClick={this.goToLogin} className="contrary-color  " >
	                            已有账户？立即登陆
	                        </div>
	                        <div onClick={this.goToGetPsw} className="desalt-color  " >
	                            忘记密码？
	                        </div>
	                    </div>
	                    <div className="ml30 mr30">
	                        <a className="btn ub ub-ac  fs16 ub-pc uc-a1 base-btn" onClick={this.goSub}>{this.state.goSubing||"注册"}</a>
	                    </div>
	                </div>
	            </form>
	        );
        }
});

	React.render(
		<LoginForm />,
	  	document.getElementById('loginForm')
	);	
	