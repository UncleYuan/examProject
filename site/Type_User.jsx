var React = require('react');
var Loading = require('/components/Loading');
require('/lib/jquery');
var Tabs = require('/components/Tabs');
var ScrollList = require('/components/ScrollList');

var TypeUser = React.createClass({
    getInitialState:function() {
        return {
            loading:false, 
            rendData:[]
        };
    },
    componentWillMount:function() {
        var _this=this;
        $.post('/index.php?g=Yixue&m=Api&a=getUser',function(data){
            _this.setState({rendData:data.data});
        },'json')
    },
    goUrl:function(){

    },
    getTelFn:function(arr,obj){
        var html=[];
        var goUrl=function (id,state){
            if(state==0){
               location.href="/index.php?a=exam&id="+id; 
           }else{
                location.href="/index.php?a=result&id="+id;
           }
            
        }
        for(var i in arr){
            var typeClass=arr[i].state==0?"contrary":"base";
            html.push(
                <div onClick={goUrl.bind(this,arr[i].t_id,arr[i].state)} className="ubb1 fuzzy-border ub ub-ae p10">
                    <div className="ub-f1">
                        <div className="fs13">
                            {arr[i].title}<span className={typeClass+"-color"}>({arr[i].state==0?"未完成":"已完成"})</span>
                        </div>
                        <div className="desalt-color mt2 fs11">
                            46分钟前
                        </div>
                    </div>
                    <div className="desalt-color fs11">
                        <i className="iconfont icon-youfan"></i>
                    </div>
                </div> 
            );
         }
         return html;
    },
    render: function () {
        if(this.state.loading){
            return (<div className='tc'><Loading /></div>);
        }
        var rendData=this.state.rendData;
        return (
                <div className="ub-f1 ub-ver ub typeUserBox" >
                  
                <div className="white-bg  p10 ub ub-ac user-top">
                    <img src="https://dn-baochoudai.qbox.me/upload/file/borrow/2016/06/5763b0b3769d4.jpg?imageView2/1/w/100/h/100" alt="" className="br_100 left-head" />
                    <div className="ub-f1 ml10">
                        <div className="top-name">
                            <span className="fs21 mr5">{rendData.name}</span>
                            <span className="fs11 desalt-color">微信号：xk12253</span>
                        </div>
                        <div className="fs13">
                            联系方式：{rendData.phone}
                        </div>
                    </div>
                </div>
                <div className="ub-f1 ub ub-ver  white-bg mt10">
                <Tabs btnBoxClass="bg-tab-box" btnClass="bg-tab-btn" >
                    <div title="我的考试" className="pageIn">
                        <ScrollList url="/index.php?g=Yixue&m=Api&a=getExamRoExercise" dataTel={this.getTelFn} postData={{type:1}} />
                    </div>
                    <div title="我的练习"  className="pageIn">
                        <ScrollList url="/index.php?g=Yixue&m=Api&a=getExamRoExercise" dataTel={this.getTelFn} postData={{type:""}} />
                    </div>
                </Tabs>
                
                   
                </div>
                
                </div>
                
        );        
    }
});

module.exports = TypeUser;