var React = require('react');
React.initializeTouchEvents(true);
var Loading = require('/components/Loading');
var ScrollList = require('/components/ScrollList');

var FormalList = React.createClass({
    getInitialState:function() {
        return {
            loading:false, 
            rendData:[]
        };
    },
    componentWillMount:function() {
      
    },
   
    getTelFn:function(arr,obj){
        var html=[];
        for(var i in arr){
            var typeClass=arr[i].state==0?"contrary":"base";
            html.push(
                <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac" >
                  <div className="ub-f1 fs14" >{arr[i].title}</div>
                  <div className="">
                    <a href={"/index.php?a=exam&id="+arr[i].t_id} className="btn assist-btn fs11">开始考试</a>
                  </div>
                </div> 
            );
         }
         return html;
    },
    goBack:function(){
      history.go(-1);
    },
    render: function () {
        var rendData=this.state.rendData;
        return (
          <div className="ub ub-ver  ub-fv  ">
            <div>
                <div id="header" className="base-bg pt05 headbar ub ub-ac  ub-pc pb05">
                    <div className="head-icon left" >
                        <div className="iconfont icon-zuofan white-color fs21" onTouchEnd={this.goBack}></div>
                    </div>
                    <div className="tc white-color">正式考试</div>
                </div>
            </div>
            <div  className="ub-f1 h40 ">
            <div className="p10">
            <ScrollList url="/index.php?g=Yixue&m=Api&a=getAnswerSheet" dataTel={this.getTelFn} postData={{type:"2"}} />
            </div></div>
          </div>
                
                
        );        
    }
});

  React.render(
    <FormalList />,
      document.getElementById('allWrapBox')
  );  
  