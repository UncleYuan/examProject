var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var Tabs = require('/components/Tabs');

var Loading = require('/components/Loading');
var TypeExam = require('/site/Type_exam');
var TypeExamAllList=require('/site/Type_ExamAllList');
var TypeUser=require('/site/Type_User');

var ReactRouter = require('lib/ReactRouter');
var Router=ReactRouter.Router;
var Route=ReactRouter.Route;
var Link=ReactRouter.Link;
var IndexRoute=ReactRouter.IndexRoute;
var Redirect=ReactRouter.Redirect;
var browserHistory=ReactRouter.browserHistory;

require('/lib/jquery');

var titArr=[
    <div ><i className="iconfont vm mr5 fs18 icon-icon04 base-color"></i>考试</div>,
    <div ><i className="iconfont  vm mr5 fs18 icon-tikumoren base-color"></i>题库</div>,
    <div ><i className="iconfont  vm mr5 fs18 icon-yonghu base-color"></i>我的</div>
]

var TabBox = React.createClass({
    btnClass:"ub-f1 top-tab-btn ",
    render: function () {
        var pathname = this.props.location.pathname;
        var sta=pathname.indexOf('step');
        var stepNum=pathname.substring(sta+4,sta+5);
        return (
            <div className="tabWrap ub ub-ver ub-fv" >
                <div className="white-bg  tabHead">
                  <div className="ub tc fs14 top-tab-box" >
                    
                    <Link className={pathname=="/TypeExam"||pathname=="/"?this.btnClass+'active':this.btnClass}  to="/TypeExam">
                        <i className="iconfont vm mr5 fs18 icon-icon04 base-color" ></i>
                        <span >考试</span>
                    </Link>
                   
                    <Link className={pathname=="/TypeExamAllList"?this.btnClass+'active':this.btnClass}  to="/TypeExamAllList">
                        <i className="iconfont  vm mr5 fs18 icon-tikumoren base-color" ></i>
                        <span >题库</span>
                    </Link>
                    <Link className={pathname=="/TypeUser"?this.btnClass+'active':this.btnClass}  to="/TypeUser">
                        <i className="iconfont  vm mr5 fs18 icon-yonghu base-color" ></i>
                        <span >我的</span>
                    </Link>
                  </div>
                </div>
                <div className="mt10 ub-f1 h10" >
                {React.cloneElement(this.props.children || <div/>, { key: pathname })}
                </div>
                 
            </div>
        );        
    }
});



React.render((
  <Router location="hash">
    <Route path="/" component={TabBox}>
      <IndexRoute component={TypeExam}/>
      <Route path="/TypeExam" component={TypeExam}/>
      <Route path="/TypeExamAllList" component={TypeExamAllList}/>
      <Route path="/TypeUser" component={TypeUser}/>
    </Route>
 </Router>
), document.getElementById('TabWrap'))
