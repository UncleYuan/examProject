var React = require('react');
var Loading = require('/components/Loading');
var ScrollList = require('/components/ScrollList');
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
}
var FormalList = React.createClass({
    getInitialState:function() {
        return {
            loading:false, 
            rendData:[]
        };
    },
    componentWillMount:function() {
      
    },
    goUrl:function(id){
      location.href="/index.php?a=exam&id="+id;
    },
    getTelFn:function(arr,obj){
        var html=[];
        for(var i in arr){
            var typeClass=arr[i].state==0?"contrary":"base";
            html.push(
              <div className="exam-item-box" onClick={this.goUrl.bind(this,arr[i].t_id)}>
                <div className="top-img fs20"><p className="p20">{arr[i].title}</p></div>
                <div className="bottom-txt">开始考试</div>
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
                        <div className="iconfont icon-zuofan white-color fs21" onClick={this.goBack}></div>
                    </div>
                    <div className="tc white-color">题库</div>
                </div>
            </div>
            <div  className="ub-f1 h40 ">
            <div className="p10">
            <ScrollList url="/index.php?g=Yixue&m=Api&a=getAnswerSheet" dataTel={this.getTelFn} postData={{column_id:getQueryString("id")}} />
            </div></div>
          </div>
                
                
        );        
    }
});

  React.render(
    <FormalList />,
      document.getElementById('allWrapBox')
  );  
  