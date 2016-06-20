var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var Modal = require('/components/Modal');
var Loading = require('/components/Loading');
var RenderForm = require('components/RenderForm');
var Switchery = require('components/Switchery');
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

var ListYouMi = React.createClass({
	getInitialState:function(){
	    return {
	        loading:true,
	        rendData:{},
	        status:1,
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
        $.get('/merchant/Ad/list/mishuo',postData,function(data){
            if(data.code=="SUCCESS"){
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
    pageChange:function(idx){
        this.upData(idx)
    },
    openAddMoneyModal:function(id){
        var addMoneyData=this.state.addMoneyData;
        addMoneyData.id.defaultValue=id;
        PubSub.publish("addMoneyModal",{show:true});
        this.setState({addMoneyData:addMoneyData});
    },
    setStatus:function(status){
        var page=this.state.page;
        page.sel_index=1;
        this.setState({status:status,page:page});
        var _this=this;
        setTimeout(function(){
            _this.upData();
        },50)

    },
    turnShow:function(id,status){
        var _this=this;

        var status=status==1?2:1;
        var rendData=_this.state.rendData;
        $.post('/merchant/Ad/update',{id:id,status:status},function(data){
            if(data.code=="SUCCESS"){
                for(var i in rendData){
                    if(rendData[i].id==id){
                        rendData[i].status=status;
                        rendData[i].status_name=status==1?"已上线":"已下线";
                        _this.setState({rendData:rendData});
                        alert('修改成功，更新到'+rendData[i].status_name+"列表");
                        _this.upData();
                    }
                }
            }else {
                alert(data.info);
            }
        },'json')        
    },
    render: function () {
    	if(this.state.loading){
    		return (<div className=" white-bg mAuto  tc"><Loading /></div>)
    	}else{
            var typeSelClass1=this.state.status==1?"base-btn":"";
            var typeSelClass2=this.state.status==2?"base-btn":"";
	        return (
	        	<div className="hb-box-wrap">
                    <div className="pb20 pt20 mb15 ubb1 fuzzy-border">
                         <a className={"btn mr10 "+typeSelClass1} onClick={this.setStatus.bind(this,1)} >已上线</a>
                         <a className={"btn "+typeSelClass2} onClick={this.setStatus.bind(this,2)} >未上线</a>
                         <a href="/index.php?m=Merchant&a=add_ad&type=AddFormBoxMiShuo#/step1" className="btn fr base-btn">添加广告</a>
                    </div>
                    
                    <Modal name="addMoneyModal">
                         <RenderForm postUrl="/merchant/add_money" liNum={false} getSubVal={this.getAddMoneyCallBack} name="addMoneyForm"  rendData={this.state.addMoneyData} />
                    </Modal>
                    {this.state.rendData.map(function (obj,i) {
                        return (<div key={i} className="hb-item ubb1 fuzzy-border mb15 pb20">
                            <div className="clearfix ">
                                <div className="fr tc mt50 mr20">
                                    <div className="fs18 desalt-color">红包金额</div>
                                    <div className="fs24 mt10 contrary-color mr5">￥{obj.bonus_amount} </div>
                                    <a href="javascript:;" onClick={this.openAddMoneyModal.bind(this,obj.id)} className="base-btn btn mt10">加红包</a>
                                </div>
                                <div className="hb-left-img fl">
                                    <a href={"/index.php?m=Merchant&a=add_ad&type=AddFormBoxMiShuo#/step1/"+obj.id}><img src={obj.image} alt="" /></a>
                                </div>
                                {console.log(obj)}
                                <div className="fl w630 mt30 ml30">
                                    <a href={"/index.php?m=Merchant&a=add_ad&type=AddFormBoxMiShuo#/step1/"+obj.id} className="hb-item-tit fs24 mb10">{obj.title}</a>
                                    <p className="hb-item-info desalt-color mt5 mb15">广告简介：{obj.description}</p>
                                    <div className="hb-item-bottom mb15">
                                        <div className="inline-block ml10 mr10 vm" onClick={this.turnShow.bind(this,obj.id,obj.status)}>
                                        <Switchery show={obj.status==1?true:false}/></div>
                                        <div className="inline-block desalt-color vm">{obj.status_name}</div>
                                    </div>
                                    <div className="desalt-color">页面展现: {obj.views}  次</div>
                                </div>
                            </div>
                        </div>);
                    },this)}
                    <Pager setSelIdx={this.pageChange} sel_index={this.state.page.sel_index} all_page_num={this.state.page.all_page_num} all_num={this.state.page.all_num} />
                    </div>
	        );
        }
    }
});

module.exports = ListYouMi;
