var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var Modal = require('/components/Modal');

var Loading = require('components/Loading');
var InputEle = require('components/InputEle');
var CheckRadio = require('components/CheckRadio');
var AlertModal = require('components/AlertModal');
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



/** 
* @fileOverview react 考试做题核心组件封装 
* @author <a href="">pan</a> 
* @version 0.1 
*/ 
/** 
* @author pan 

* @description react 考试做题组件封装  
* @since version 0.1 
* @param  State {Bool} loading         初次加载完成的状态
* @param  State {Json} rendData        所有试题的内容，包括已经填写的答案
* @param  State {Bool} ing             是否在考试中
* @param  State {Number} idx           对应当前所在的试题的id
* @param  State {Bool} showExamModal   是否显示当前考试的状态弹窗

*/ 

var AllWrapBox = React.createClass({
    getInitialState:function(){
        return {
           loading:true,
           rendData:[],
           residue_time:false,
           now_time:(new Date).valueOf(),
           ing:false,
           idx:false,
           old:false,
           showExamModal:false,
           overTimeSub:false
        };
    },
    componentWillMount:function(){
        
        this.getExamData();
    },
    timer:null,
    overTimeFn:function(){ //倒计时

      if((new Date).valueOf()>=parseInt(this.state.residue_time+"000")){
        clearInterval(this.timer);
        this.setState({showExamModal:true,overTimeSub:true})
        this.goSubAsw();
      }else{
        this.setState({now_time:(new Date).valueOf()})
      }
     
    },
    getExamData:function(){ //获取所有试题数据
        var _this=this;
        $.post('/index.php?g=Yixue&m=Api&a=getTopic',{t_id:getQueryString('id')},function(data){
            var old=false;
            var showExamModal=_this.state.showExamModal;
            var ing=_this.state.ing;
            if(data.data.Answer){
              for(var a in data.data.Answer){
                data.data.content[a].value=data.data.Answer[a];
              }
              location.hash="/problem/"+data.data.suspend_topic_id;
              old=true;
              showExamModal=true;
              ing=true;
            }else if(_this.props.location.pathname=="/"){
                location.hash="/problem/"+getJSONbyIdx(data.data.content,0);//首次进入自动跳转到第一题
            }
            if(!ing){
              _this.timer=setInterval(function(){
                  _this.overTimeFn();
              },1000);
            }
            
            _this.setState({rendData:data.data.content,loading:false,residue_time:data.data.residue_time,ing:!ing,old:old,showExamModal:showExamModal});
            
        },'json')
    },
    onSetVal:function(val,arr){ //当子组件设置value值时执行的回调
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
    goSetVal:function(){  // 保存当前题目答案，在多选和填空时
      var data=this.state.rendData;

      data[this.state.idx].value=this.state.nowIdxVal;
      this.setState({rendData:data});
      var _this=this;
        setTimeout(function(){
          _this.goPrevNext(1);   
        },500)
    },
    completedNum:function(){ // 统计完成的题目
      var rendData=this.state.rendData;
      var x=0;
      for(var i in rendData){
        if(rendData[i].value){
          x++;
        }
      }
      return x;
    },
    goPrevNext:function(num){ //跳转上一题或下一题 传 1 或 -1
      var indexNum=getJSONIdx(this.state.rendData,this.props.params.idx);
      this.goIdx(indexNum+num);
    },
    goIdx:function(idx){  //跳转到对应的题目 ，idx 对应第几题
      var data=this.state.rendData;

      var nextId=getJSONbyIdx(data,idx);
      if(nextId){
        location.hash="/problem/"+nextId;
      }
    },
    onSetIdx:function(idx){   //从子组件设置父组件 idx

      this.setState({idx:idx,nowIdxVal:''})
    },
    ModalBtnConf:function(){
      var _this=this;
      return [  //设置弹窗的底部按钮
        {txt:"继续答题",onCli:function(closeFn){
      
            if(!_this.state.ing){
              $.post('/index.php?g=Yixue&m=Api&a=open',{t_id:getQueryString('id')},function(data){
                _this.setState({showExamModal:false,ing:true,old:false})
                _this.timer=setInterval(function(){
                  _this.overTimeFn();
                },1000);
              },'json')
              
            }else{
              _this.setState({showExamModal:false})
            }
        }
        },
        {type:"warning",txt:"提交试卷",onCli:function(closeFn){
          _this.goSubAsw(function(){
            closeFn();
          })
         
          
        }}
      ]
    }, 
    goSubAsw:function(cb){
      var _this=this;
      $.post('/index.php?g=Yixue&m=Api&a=submitAnswer',{t_id:getQueryString('id'),answer:this.getAllAswStr()},function(data){
            var text=_this.state.overTimeSub?"考试时间结束，":"";
            alert(text+"已经为您提交试卷");
            if(data.code=="SUCCESS"){
              if(cb)cb();
              location.href="/index.php?a=result&id="+getQueryString('id');
            }  
          },'json')
    },
    openExamModal:function(){ //打开弹窗
      this.setState({showExamModal:true})
    },
    modalOnclose:function(){ //关闭弹窗
      this.setState({showExamModal:false})
    },
    getAllAswStr:function(){
      var rendData=this.state.rendData;
      var newJson={};
      for(var i in rendData){
        newJson[i]=typeof(rendData[i].value)=="undefined"?"":rendData[i].value;
      }
      return JSON.stringify(newJson);
    },
    getProDetailHtml:function(){ //获取 所有题的 下标的 html
      var html=[];
      var rendData=this.state.rendData;
      var x=0;
      for(var i in rendData){
        x++;
        var idxClass=rendData[i].value?"completed":"";
        html.push(<li key={i} onClick={this.modalGoIdx.bind(this,x-1)} className={idxClass}>{x}</li>);
      }
      return html;
    },
    modalGoIdx:function(i){ //从窗口点击下标 跳转到对应的题目
      this.goIdx(i);
      this.modalOnclose();
    },
    allAsw:{}, //所有答案String
    setAsw:function(){ //将 this.state.rendData转化为所有的答案的 json字符串
      var data=this.state.rendData;
      var newJson={};
      for(var i in data){
        newJson[i]=data[i].value?data[i].value:"";
      }
      this.allAsw=JSON.stringify(newJson);
    },
    pause:function(){
      var _this=this;
      $.post('/index.php?g=Yixue&m=Api&a=suspend',{t_id:getQueryString('id'),answer:this.getAllAswStr(),suspend_topic_id:this.state.idx,residue_time:this.state.residue_time},function(data){
        alert("暂停成功");
        if(data.code=="SUCCESS"){
          _this.setState({showExamModal:true,ing:false})
          clearInterval(_this.timer);
        }  
      },'json')
    },
    goIndex:function(){
      location.href="/"
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

          var timeLong=this.state.residue_time+"000"-this.state.now_time;
          timer.push(<div key="0" className=" white-color fs11" >
            {parseInt(timeLong/60000)}分{parseInt(timeLong%60000/1000)}秒
          </div>)
        }
        var prevBtnShow=getJSONIdx(rendData,idx)<=0?"none":"block";
        var nextBtnShow=getJSONIdx(rendData,idx)>=JSONLength(rendData)-1?"none":"block";
        var goSaveBtn=rendData[idx].t_type!="checkbox"||rendData[idx].checkbox_count!=0?<div onClick={this.goSetVal} className="base-btn btn block fs13 m30">保存此题答案</div>:"";
        var completedNum=this.completedNum();
        var allNum=JSONLength(rendData);
        this.setAsw();
        return (
            <div className="ub ub-ver uinn-a3 ub-fv  ">
                <div className="base-bg  pt05 headbar ub ub-ac  ub-pc pb05">
                  <div className="head-icon left">
                    <div className="iconfont icon-zuofan white-color fs20" onClick={this.goIndex}></div>
                  </div>
                  <div onClick={this.openExamModal} className="tc white-color">
                    试题一览({getJSONIdx(rendData,this.props.params.idx)+1}/{allNum})
                  </div>
                  <div className="head-icon right" >
                    {timer}
                  </div>  
                </div>
                <AlertModal title="答题状况" name="ExamModal" show={this.state.showExamModal} onClose={this.modalOnclose} btnOptions={this.ModalBtnConf()} >
                    <div  className="tl">
                      <div className="contrary-color">{this.state.old?"您上次暂停的记录已保存，请继续答题":""}</div>
                      <div className="contrary-color">{this.state.ing?"":"您当前已经暂停"}</div>
                      共计<span className="contrary-color">{allNum}</span>题，
                      已经完成<span className="contrary-color">{completedNum}</span>题,
                      还剩<span className="contrary-color">{allNum-completedNum}</span>题未做答
                      <span className="desalt-light-color">(点击下方按钮可跳转对应的题目)</span>
                      
                    </div>
                    <ul className="tj pro-detail mt10 mb10">
                      {this.getProDetailHtml()}
                    </ul>
                </AlertModal>
           
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
                  
                    <div className="ub-f1 bottom-btn active-base" onClick={this.pause}>
                        暂停
                    </div>
                    <div className="ub-f1 bottom-btn base-color" onClick={this.openExamModal}>
                        交卷
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
            <CheckRadio key={idx} title={data[idx].topic} value={data[idx].value||""} type={parseInt(data[idx].checkbox_count)==0?"radio":"checkbox"} optionsArr={data[idx].options} onSelEnd={this.onSelEnd} />      
          );

       }else if(data[idx].t_type=="text"){
          html.push(
            <InputEle  key={idx} title={data[idx].topic} value={data[idx].value||""} type="textarea" onValChange={this.onSelEnd}/>
          )
       }
        return (
          <div key={idx}>{html}</div>
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
