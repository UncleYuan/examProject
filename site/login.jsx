var React = require('react');



require('/lib/jquery');


var LoginForm = React.createClass({
	getInitialState:function(){
	    return {
	    	uname:'',
	    	password:'',
	    	isPhone:true
	    };
	},
	componentWillMount:function(){
		var _this=this;
		
	},
	goSub:function(e){
		var _this=this;
		this.setState({goSubing:"正在登陆中..."});
		$.post('/index.php?g=Yixue&m=Public&a=login',$('#form').serialize(),function(data){
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
	                            <div className="left-icon ubr fuzzy-border"><i className="iconfont fs24  base-color icon-shouji"></i></div>
	                            <input  placeholder="请输入您的手机号"  value={this.state.uname} onChange={this.inputChange.bind(this,"uname")} onBlur={this.onBlurUname} name='phone' type="text" className="ub-f1 fs16 p5 umw4" style={{"outlineStyle":"none"}} />
	                        </div>
	                        <i  style={{"display": "none"}} className="icon-qingchu mr05 fs24 iconfont pos-right-clean base-color"></i>
	                    </div>
	                    <div style={showStyle} className="mb15 ml15 mr15 contrary-color fs11 " >您的输入的手机号码不正确，请重新输入</div>
	                    <div className="ub ub-ac login-input  white-bg  mb10">
	                        <div className=" uinput ub-ac ub ub-fh">
	                            <div className="left-icon  ubr fuzzy-border"><i className="iconfont fs24  base-color icon-mima"></i></div>
	                            <input placeholder="请输入您的密码" value={this.state.password}  name='password' type="password" onChange={this.inputChange.bind(this,"password")}  className="umw4 fs16 p5  ub-f1" style={{"outlineStyle":"none"}} />
	                        </div>
	                        <i  style={{"display": "none"}}  className="icon-qingchu  mr05 fs24 iconfont pos-right-clean base-color"></i>
	                    </div>
	                </div>
	                <div className="ub ub-ver ">
	                    <div className=" ub ub-pb fs12  ml10 mr10 mb15 mt5">
	                    	<div onClick={this.goToGetPsw} className="contrary-color  " >
	                            没有账户？立即注册
	                        </div>
	                        <div onClick={this.goToGetPsw} className="desalt-color  " >
	                            忘记密码？
	                        </div>
	                    </div>
	                    <div className="ml30 mr30">
	                        <a className="btn ub ub-ac  fs16 ub-pc uc-a1 base-btn" onClick={this.goSub}>{this.state.goSubing||"登录"}</a>
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
	