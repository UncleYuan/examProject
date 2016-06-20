var React = require('react');
require('/lib/es5-shim');
require('/lib/es5-sham');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var InputEle = require('/components/InputEle');
var CheckRadio = require('/components/CheckRadio');
var SelUpImg = require('/components/SelUpImg');
var SetMobileCont = require('/components/SetMobileCont');
var Modal = require('/components/Modal');
var InputPosition = require('/components/InputPosition');
require('/lib/jquery');


var res={};



var FormDemo = React.createClass({
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
	componentWillMount:function(){
		var _this=this;
		$.get('/text.json',function(data){
			_this.setState({loading:false,resData:data.data});

		},'json')
		
	},
	goSub:function(e){
		e.preventDefault();
		console.log($('#form').serialize());
	},
	openModal:function(){
		this.setState({openModal:true});
	},
	openUpFile1:function(){
		this.setState({showUpFile1:true});
	},
	asw:function(i){

	},
	getImg1:function(data){
		this.setState({imgList1:data});
	},
	getFormHtml:function(res){
		
		var rendHtml=[];
		var _this=this;
		var n=0;
		
		for(var i in res){

			n++;
			var newSelFields=res[i];
			var newArr=this.getComponents(newSelFields,i,n);
			rendHtml=rendHtml.concat(newArr)
		}
		return rendHtml;
	},
	setTab:function(value,arr){

		var newData=this.state.resData;
		newData[arr].defaultValue=value;
		this.setState({resData:newData})
	},
	getComponents:function(newSelFields,i,n){
		var rendHtml=[];
		if(newSelFields.type=="input"||newSelFields.type=="textarea"){
				rendHtml.push(
					<InputEle key={i} value={newSelFields.defaultValue} type={newSelFields.type} ref={newSelFields.field} title={n+"."+newSelFields.name} name={'field'+newSelFields.field} />
				);
			}else if(newSelFields.type=="video"){
				rendHtml.push(
					<InputEle key={i} value={newSelFields.defaultValue} type="input" ref={newSelFields.field} title={n+"."+newSelFields.name} name={'field'+newSelFields.field} />
				);
			}else if(newSelFields.type=="radio"||newSelFields.type=="checkbox"){
				var options=newSelFields.options;
				var newArr=[];
				for(var x in options){
					newArr.push({tit:options[x].name,val:options[x].value})
				}
				rendHtml.push(
				<CheckRadio key={i} value={newSelFields.defaultValue} ref={newSelFields.field}  optionsArr={newArr}  type={newSelFields.type} title={n+"."+newSelFields.name}   name={'field'+newSelFields.field} />
				);
			}else if(newSelFields.type=="tab"){
				var options=newSelFields.options;
				var newArr=[];
				for(var x in options){
					newArr.push({tit:options[x].name,val:options[x].value})
				}
				rendHtml.push(
				<CheckRadio callBack={this.setTab} selStr={i} key={i} value={newSelFields.defaultValue} ref={newSelFields.field} inline="true"  optionsArr={newArr}  type="radio" title={n+"."+newSelFields.name}   name={'field'+newSelFields.field} />
				);
				var  newArr=[]
				for(var h in newSelFields.options){
					for(var x in newSelFields.options[h].child){
					    var thisShow=newSelFields.defaultValue==h?'block':'none';
						newArr.push(<div style={{display:thisShow}}>{this.getComponents(newSelFields.options[h].child[x],newSelFields.name,newSelFields.name)}</div>);
					}
				}
				rendHtml=rendHtml.concat(newArr);
			}else if(newSelFields.type=="images"){
				rendHtml.push(
					<SelUpImg key={i} value={newSelFields.defaultValue} ref={newSelFields.field} title={n+"."+newSelFields.name}  name={'field'+newSelFields.field} />
				);
			}else if(newSelFields.type=="image_text"){
				rendHtml.push(
					<SetMobileCont  key={i} value={newSelFields.defaultValue} ref={newSelFields.field} title={n+"."+newSelFields.name}  name={'field'+newSelFields.field}/>
				);
			}else if(newSelFields.type=="position"){
				rendHtml.push(
					<InputPosition value={newSelFields.defaultValue} key={i} ref={newSelFields.field}  title={n+"."+newSelFields.name}   name={'field'+newSelFields.field} />
				);
			}

			return rendHtml;

	},
    render: function () {
    	if(this.state.loading){
    		return (<div className="cont-wrap white-bg  mt30 mAuto  tc"><img src="/bcd/images/loading.gif" /></div>)
    	}else{

    		var html=this.getFormHtml(this.state.resData);
	        return (
	        	<div className="cont-wrap white-bg  mt30 mb50 mAuto  ">
	        	<div className=" tc pt50">
		            <ul className="breadcrumbs">
		                <li className="item"><a href="" className="active">1、选择广告类型</a></li>
		                <li className="item"><a href="" className="active">2、编辑广告内容</a></li>
		                <li className="item"><a href="">3、定向红包设置</a></li>
		
		            </ul>
		        </div>
	        		<div className="p30">
		        	<form  id="form">
			      		{html}	
			          
			            <div className="tc pt30 pb30">
						    <button onClick={this.goSub} className="ajax-btn w200 base-btn btn">
						        保存
						    </button>
					    </div>
					</form>
					</div>
				</div>
	        );
        }
    }
});
	
	React.render(
		<FormDemo />,
	  	document.getElementById('box')
	);	
	