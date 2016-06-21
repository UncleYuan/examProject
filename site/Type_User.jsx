var React = require('react');
var Loading = require('/components/Loading');
require('/lib/jquery');
var Tabs = require('/components/Tabs');
var TypeUser = React.createClass({
    getInitialState:function() {
        return {
            loading:false, 
            rendData:[]
        };
    },
    componentWillMount:function() {
        var _this=this;
       
    },
    goUrl:function(){

    },
    render: function () {
        if(this.state.loading){
            return (<div className='tc'><Loading /></div>);
        }
        return (
                <div className="" >
                  
                <div className="white-bg p10 ub ub-ac user-top">
                    <img src="https://dn-baochoudai.qbox.me/upload/file/borrow/2016/06/5763b0b3769d4.jpg?imageView2/1/w/100/h/100" alt="" className="br_100 left-head" />
                    <div className="ub-f1 ml10">
                        <div className="top-name">
                            <span className="fs21 mr5">凌俊熙</span>
                            <span className="fs11 desalt-color">微信号：xk12253</span>
                        </div>
                        <div className="fs13">
                            联系方式：13525544147
                        </div>
                    </div>
                </div>
                <div className=" white-bg mt10">
                <Tabs btnBoxClass="bg-tab-box" btnClass="bg-tab-btn" >
                    <div title="我的考试">
                        
                        <div className="ubb1 fuzzy-border ub ub-ae p10">
                            <div className="ub-f1">
                                <div className="fs13">
                                    考试<span className="base-color">(护士执业资格考试)</span>
                                </div>
                                <div className="desalt-color mt2 fs11">
                                    未完成
                                </div>
                            </div>
                            <div className="desalt-color fs11">
                                46分钟前
                            </div>
                        </div>
                        <div className="ubb1 fuzzy-border ub ub-ae p10">
                            <div className="ub-f1">
                                <div className="fs13">
                                    考试<span className="base-color">(护士执业资格考试)</span>
                                </div>
                                <div className="desalt-color mt2 fs11">
                                    未完成
                                </div>
                            </div>
                            <div className="desalt-color fs11">
                                46分钟前
                            </div>
                        </div>
                        <div className="ubb1 fuzzy-border ub ub-ae p10">
                            <div className="ub-f1">
                                <div className="fs13">
                                    123考试<span className="base-color">(护士执业资格考试)</span>
                                </div>
                                <div className="desalt-color mt2 fs11">
                                    未完成
                                </div>
                            </div>
                            <div className="desalt-color fs11">
                                46分钟前
                            </div>
                        </div>
                    
                    </div>
                    <div title="我的练习" >
                        
                        <div className="ubb1 fuzzy-border ub ub-ae p10">
                            <div className="ub-f1">
                                <div className="fs13">
                                    考试<span className="base-color">(护士执业资格考试)</span>
                                </div>
                                <div className="desalt-color mt2 fs11">
                                    未完成
                                </div>
                            </div>
                            <div className="desalt-color fs11">
                                46分钟前
                            </div>
                        </div>
                        <div className="ubb1 fuzzy-border ub ub-ae p10">
                            <div className="ub-f1">
                                <div className="fs13">
                                    考试<span className="base-color">(护士执业资格考试)</span>
                                </div>
                                <div className="desalt-color mt2 fs11">
                                    未完成
                                </div>
                            </div>
                            <div className="desalt-color fs11">
                                46分钟前
                            </div>
                        </div>
                        <div className="ubb1 fuzzy-border ub ub-ae p10">
                            <div className="ub-f1">
                                <div className="fs13">
                                    考试<span className="base-color">(护士执业资格考试)</span>
                                </div>
                                <div className="desalt-color mt2 fs11">
                                    未完成
                                </div>
                            </div>
                            <div className="desalt-color fs11">
                                46分钟前
                            </div>
                        </div>
                    
                    </div>
                    
                </Tabs>
                
                   
                </div>
                
                </div>
                
        );        
    }
});

module.exports = TypeUser;