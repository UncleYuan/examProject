var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var Modal = require('/components/Modal');
var Loading = require('/components/Loading');
var RenderForm = require('components/RenderForm');
var Pager = require('components/Pager');
require('/lib/jquery');
var addMoneyFormJson={
    "id": {
      "field": "id",
      "name": "我的商户名称",
      "type": "hidden"
    },
    "amount": {
      "field": "amount",
      "name": "我要添加的金额(元)",
      "type": "input",
    }
}
var minHeight={"min-height":'1px'}
var ListYouMi = React.createClass({
	getInitialState:function(){
	    return {
	        loading:true,
	        rendData:{},
	        page:{
                all_num:0,
                all_page_num:0,
                sel_index:1
            }
	    };
	},
    upData:function(idx){
        var _this=this;
        var postData=idx?{page:idx,status:this.state.status}:{page:this.state.page.sel_index,status:this.state.status};
        $.get('/index.php?m=Assets&a=assets_log',postData,function(data){
            if (data.code=="SUCCESS") {
                _this.setState({loading:false,addMoneyData:addMoneyFormJson,rendData:data.data,page:data.page});
            }else if(data.code=="NO_DATA"){
                _this.setState({loading:false,addMoneyData:addMoneyFormJson,rendData:[],page:{all_num:0,all_page_num:0,sel_index:1}});
            }
        },'json');
    },
	componentWillMount:function(){
		this.upData();
	},
    getAddMoneyCallBack:function(id){
        PubSub.publish("addMoneyModal",{show:false});
        this.upData();
    },
    openAddMoneyModal:function(id){
        var addMoneyData=this.state.addMoneyData;
        addMoneyData.id.defaultValue=id;
        PubSub.publish("addMoneyModal",{show:true});
        this.setState({addMoneyData:addMoneyData});
    },
    pageChange:function(idx){
        this.upData(idx);
    },
    render: function () {
    	if(this.state.loading){
    		return (<div className=" white-bg mAuto  tc"><Loading /></div>)
    	}else{

	        return (
	        	<div className="table ">
                    <div className="pt10 pb10 pl15 fs14 pr15 desalt-color ubb1 fuzzy-border clearfix">
                        <div className="w120 tl fl">资金类型</div>  
                        <div className="w300 fl">备注</div>
                        <div className="w150 tr fl">操作金额</div>  
                        <div className="w200 tr fl">操作时间</div> 
                        <div className="w200 tr fl">可用余额</div> 
                    </div>
                    {this.state.rendData.map(function (obj,i) {
                        return (
                            <div className="pt10 pb10 pl15 fs14 pr15 ubb1  desalt-color fuzzy-border clearfix">  
                                <div className="w120 orange-color tl fl" style={minHeight} >{obj.code_name}</div>  
                                <div className="w300 fl" style={minHeight}>{obj.remark}</div>
                                <div className="w150 tr fl" style={minHeight}>{obj.type_name}<span className="base-color">{obj.amount}</span>元</div>  
                                <div className="w200 tr fl" style={minHeight}>{obj.format_add_time}</div> 
                                <div className="w200 tr fl" style={minHeight}><span className="base-color">{obj.balance}</span>元</div> 
                            </div>
                        );
                    },this)}
                    <Pager setSelIdx={this.pageChange} sel_index={this.state.page.sel_index} all_page_num={this.state.page.all_page_num} all_num={this.state.page.all_num} />
                    </div>
	        );
        }
    }
});

module.exports = ListYouMi;
