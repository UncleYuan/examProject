var React = require('react');
var Loading = require('/components/Loading');
require('/lib/jquery');

var TypeExam = React.createClass({
    getInitialState:function() {
        return {
            loading:true,
            SimulationData:[],   
            FormalData:[]
        };
    },
    componentWillMount:function() {
        var _this=this;
        var SimulationData=[];
        var FormalData=[];
        $.post('/index.php?g=Yixue&m=Api&a=getAnswerSheet',{type:1},function(data){
            SimulationData=data.data?data.data:[];
            $.post('/index.php?g=Yixue&m=Api&a=getAnswerSheet',{type:2},function(res){
                FormalData=res.data?res.data:[];
                _this.setState({FormalData:FormalData,SimulationData:SimulationData,loading:false})
            },'json')  
        },'json')
    },
    goUrl:function(url){
        location.href="/index.php?a=exam&id="+url
    },
    render: function () {
        if(this.state.loading){
            return (<Loading />);
        }
        return (
                <div>
                    <div className="white-bg p10 mb15">
                        <div className="ub ub-ac ub-pb">

                            <div className="tit-arrow relative-bg">
                                模拟考试
                            </div>
                            <a href="/index.php?a=testList" className="desalt-color ">
                                更多
                            </a>
                        </div>
                        <div className="box-list pt5 pb15 ">
                        {this.state.SimulationData.map(function(obj,idx){
                            return(
                                <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac">
                                    <div className="ub-f1 fs14">{obj.title}</div>
                                    <div className="">
                                        <a href="javascript:;" onClick={this.goUrl.bind(this,obj.t_id)} className="btn assist-btn fs11">开始考试</a>
                                    </div>
                                </div>
                            );
                        },this)}  
                        </div>
                    </div>
                    <div className="white-bg p10">
                        <div className="ub ub-ac ub-pb">
                            <div className="tit-arrow base-bg">
                                正式考试
                            </div>
                            <a href="/index.php?a=formalList" className="desalt-color ">
                                更多
                            </a>
                        </div>
                        <div className="box-list pt5 pb15">
                         {this.state.FormalData.map(function(obj,idx){
                            return(
                            <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac">
                                    <div className="ub-f1 fs14">{obj.title}</div>
                                    <div className="">
                                        <a href="javascript:;" onClick={this.goUrl.bind(this,obj.t_id)} className="btn assist-btn fs11">开始考试</a>
                                    </div>
                                </div>
                             );
                        },this)}  
                            
                            
                        </div>
                    </div>
                </div>
                
        );        
    }
});

module.exports = TypeExam;