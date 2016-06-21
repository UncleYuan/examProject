var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var Modal = require('/components/Modal');

var Loading = require('components/Loading');
var InputEle = require('components/InputEle');
var CheckRadio = require('components/CheckRadio');
var ReactRouter = require('lib/ReactRouter');
var Router=ReactRouter.Router;
var Route=ReactRouter.Route;
var Link=ReactRouter.Link;
var IndexRoute=ReactRouter.IndexRoute;
var Redirect=ReactRouter.Redirect;
var browserHistory=ReactRouter.browserHistory;
require('/lib/jquery');
indexOf = function(arr,val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
};
removeArr = function(arr,val) {
  var index = indexOf(arr,val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
}
function JSONLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function getJSONbyIdx(obj,idx) {
    var i=0;
    for (key in obj) {
        if(i==idx){
            
            return key;
        }else{
          i++;
        }
    }
};
function getJSONIdx(obj,k) {
    var i=0;
    for (key in obj) {
        if(k==key){
          return i;
        }else{
          i++;
        }
    }
};





var AllWrapBox = React.createClass({
    getInitialState:function(){
        return {
           loading:true,
           rendData:[],
           residue_time:false,
           ing:false,
           idx:false,
           noIdxVal:false
        };
    },
    componentWillMount:function(){
        
        this.getExamData();
    },
    timer:null,
    overTimeFn:function(){
      var residue_time=this.state.residue_time;
      residue_time--;
      this.setState({residue_time:residue_time})
    },
    getExamData:function(){
        var _this=this;
        $.post('/index.php?g=Yixue&m=Api&a=getTopic',{t_id:getQueryString('id')},function(data){
            if(_this.props.location.pathname=="/"){
                location.hash="/problem/"+getJSONbyIdx(data.data.content,0);
            }
            _this.setState({rendData:data.data.content,loading:false,residue_time:data.data.residue_time,ing:true});
            _this.timer=setInterval(function(){
                _this.overTimeFn();
            },1000);
        },'json')
    },
    onSetVal:function(val,arr){
      var data=this.state.rendData;
      if(data[this.state.idx].t_type=="checkbox"&&data[this.state.idx].checkbox_count==0){       
        data[this.state.idx].value=val;
        this.setState({rendData:data,nowIdxVal:val});
        var _this=this;
        setTimeout(function(){
          _this.goPrevNext(1);
        },500)
      }else{
        this.setState({nowIdxVal:val});     
      }

    },
    goSetVal:function(){
      var data=this.state.rendData;
      data[this.state.idx].value=this.state.nowIdxVal;
      this.setState({rendData:data});
      var _this=this;
        setTimeout(function(){
          _this.goPrevNext(1);   
        },500)
    },
    goPrevNext:function(num){
      var indexNum=getJSONIdx(this.state.rendData,this.props.params.idx);
      this.goIdx(indexNum+num);
    },
    goIdx:function(idx){
      var data=this.state.rendData;
      var nextId=getJSONbyIdx(data,idx);
      if(nextId){
        location.hash="/problem/"+nextId;
      }
    },
    onSetIdx:function(idx){
      this.setState({idx:idx})
    },
    goSubAll:function(){

    },
    render: function () {
        var pathname = this.props.location.pathname;
        if(this.state.loading){
            return(<Loading />)
        }
        var timer=[];
        var rendData=this.state.rendData;
        var idx=this.props.params.idx;
        if(this.state.residue_time){
          timer.push(<div key="0" className=" white-color fs11" >
            {parseInt(this.state.residue_time/60)}分{parseInt(this.state.residue_time%60)}秒
          </div>)
        }
        var prevBtnShow=getJSONIdx(rendData,idx)<=0?"none":"block";
        var nextBtnShow=getJSONIdx(rendData,idx)>=JSONLength(rendData)-1?"none":"block";
        var goSaveBtn=rendData[idx].t_type!="checkbox"||rendData[idx].checkbox_count!=0?<div onClick={this.goSetVal} className="base-btn btn block fs13 m30">保存此题答案</div>:"";
        return (
            <div className="ub ub-ver uinn-a3 ub-fv  ">
                <div className="base-bg  pt05 headbar ub ub-ac  ub-pc pb05">
                    <div className="head-icon left">
                        <div className="iconfont icon-zuofan white-color fs20" onclick="location.href='/'"></div>
                    </div>
                    <div className="tc white-color">试题一览({getJSONIdx(rendData,this.props.params.idx)+1}/{JSONLength(rendData)})</div>
                    <div className="head-icon right" >
                        {timer}
                    </div>
                </div>
                <div style={{"display":"none"}} className="alert-modal">
                  <div className="alert-dialog">
                    <div className="cont-up">
                      <div className="head">标题</div>
                      <div className="cont">内容</div>
                    </div>
                    <div className="btn-group">
                      <span className="btn">取消</span>
                      <span className="btn assist-btn">确定</span>
                    </div>
                  </div>
                </div>
                <div className="ub-f1 h40 overflow-y-auto">
                    <div className="page  p15 ">
                      {React.cloneElement(this.props.children || " ", { key: pathname,rendData:this.state.rendData,onSetVal:this.onSetVal,onSetIdx:this.onSetIdx })}
                      {goSaveBtn}
                    </div>
                </div>
                <div className="ub ub-pb p10 tr">
                          <span className="btn fs11" onClick={this.goPrevNext.bind(this,-1)} style={{"display":prevBtnShow}}>上一题</span>
                           {" "}
                          <span className="btn fs11" onClick={this.goPrevNext.bind(this,1)} style={{"display":nextBtnShow}}>下一题</span>
                        </div>
                <div className="fixed-btn-group ub tc">
                  
                    <div className="ub-f1 bottom-btn active-base">
                        暂停
                    </div>
                    <div className="ub-f1 bottom-btn base-color" onClick={this.goSubAll}>
                        提交
                    </div>
                </div>
            </div>

        );        
    }
});



var  ProblemBox= React.createClass({
    getDefaultProps:function() {
        return {
            rendData:{},  
        };
    },
    getInitialState:function(){
        return {
           loading:true,
           rendData:this.props.rendData,
           idx:this.props.params.idx
        };
    },
    componentWillMount:function(){

       this.props.onSetIdx(this.props.params.idx)
    },
    onSelEnd:function(val,arr){
      this.props.onSetVal(val,arr)
    },  
    render: function() {
       var data=this.state.rendData;
       var idx=this.state.idx;
       var html=[];
       if(data[idx].t_type=="checkbox"){
          html.push(
            <CheckRadio title={data[idx].topic} value={data[idx].value||""} type={parseInt(data[idx].checkbox_count)==0?"radio":"checkbox"} optionsArr={data[idx].options} onSelEnd={this.onSelEnd} />      
          );

       }else if(data[idx].t_type=="text"){
          html.push(
            <InputEle  title={data[idx].topic} value={data[idx].value||""} type="textarea" onValChange={this.onSelEnd}/>
          )
       }
        return (
          <div>{html}</div>
        )
    }
})




React.render((
 <Router location="hash">
    <Route path="/" component={AllWrapBox}>
      <IndexRoute component={ProblemBox}/>
      <Route path="/problem/:idx" component={ProblemBox}/> 
    </Route>
  </Router>
), document.getElementById('allWrapBox'))
