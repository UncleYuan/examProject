var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var Modal = require('/components/Modal');
var RenderForm = require('components/RenderForm');
var Loading = require('components/Loading');
var ReactRouter = require('lib/ReactRouter');
var Router=ReactRouter.Router;
var Route=ReactRouter.Route;
var Link=ReactRouter.Link;
var IndexRoute=ReactRouter.IndexRoute;
var Redirect=ReactRouter.Redirect;
var browserHistory=ReactRouter.browserHistory;
require('/lib/jquery');

var step2RendData=false;

var content_id=false;

var AddFormBox = React.createClass({
    render: function () {
        var pathname = this.props.location.pathname;
        var sta=pathname.indexOf('step');
        var stepNum=pathname.substring(sta+4,sta+5);
        return (
            <div className="cont-wrap white-bg   mb50 pb50 mAuto  ">
                <div className=" tc pt50">
                    <ul className="breadcrumbs">
                      
                        <li className="item">
                            <Link className={stepNum>=1?"active":""} to="/step1">1、编辑广告内容</Link>
                        </li>
                        <li className="item">
                            <Link className={stepNum>=2?"active":""} to="/step2">2、定向红包设置</Link>
                        </li>
                    </ul>
                </div>
                <div className="pl30 pr30">
                    {React.cloneElement(this.props.children || <div/>, { key: pathname })}
                </div>
            </div>
        );        
    }
});




var  Step2= React.createClass({
   getInitialState:function(){
        return {
           loading:true,
           step2RendData:{}
        };
    },

    componentWillMount:function(){

        if(step2RendData){
            this.setState({step2RendData:step2RendData,loading:false})
        }else if(this.props.params.id){
            this.getStep2Data(this.props.params.id)
        }else{
            this.getStep2Data();
        }
    },
    getStep2Data:function(id){
        var _this=this;
        var goData=id?{content_id:id}:{}
        $.get('/merchant/ad/type_field/capital',goData,function(data){
            content_id=id;
            _this.setState({step2RendData:data.data,loading:false})
        },'json')
    },
    getStep2CallBack:function(d){
        var _this=this;
        if(this.props.params.id){
           d.push({name:"content_id",value:this.props.params.id})
        }

        $.post('/merchant/ad/2',d,function(data){
            alert(data.info)
            if(data.code=="SUCCESS"){
                content_id=data.data.content_id;
                location.hash="/step2" 
            }

        },'json')
    },
    render: function() {
        if(this.state.loading){
            return (<div className="white-bg mAuto  tc"><Loading/></div>)
        }
        return (
            <div><RenderForm liNum={false} getSubVal={this.getStep2CallBack} name="step2"  rendData={this.state.step2RendData} /></div>
        )
    }
})
var  Step3= React.createClass({
    getInitialState:function(){
        return {
           loading:true,
           step3RendData:{}
        };
    },
    componentWillMount:function(){
        if(content_id){
           this.getStep3RendData() 
        }else{
          location.hash="/step1"
        }
        
    },
    getStep3RendData:function(){
        var _this=this;
        $.get('/merchant/index/bonus_field',function(data){
            data.data.content_id={
              "field": "content_id",
              "name": "content_id",
              "defaultValue":content_id,
              "type": "hidden"
            }
            _this.setState({loading:false,step3RendData:data.data});
        },'json');
    },
    getStep3CallBack:function(d){
        var _this=this;
        $.post('/merchant/ad/3',d,function(data){
            alert(data.info)
            if(data.code=="SUCCESS"){
                location.href="/index.php?m=Merchant&c=Index&a=index#/zhuanchang";
            }
        },'json')
    },
    render: function() {
        if(this.state.loading){
            return (<div className="cont-wrap white-bg mAuto  tc"><Loading/></div>)
        }
        return (
            <div><div><RenderForm liNum={false} getSubVal={this.getStep3CallBack} name="step3"  rendData={this.state.step3RendData} /></div></div>
        )
    }
})




React.render((
 <Router location="hash">
    <Route path="/" component={AddFormBox}>
      <IndexRoute component={Step2}/>
      <Route path="/Step1" component={Step2}/>
      <Route path="/Step1/:id" component={Step2}/>
      <Route path="/Step2" component={Step3}/>  
    </Route>
  </Router>
), document.getElementById('AddFormBox'))
