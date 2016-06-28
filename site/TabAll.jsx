var React = require('react');
React.initializeTouchEvents(true);
var Loading = require('components/Loading');
var YouMi = require('site/ListYouMi');
var ZhuanChang = require('site/ListZhuanChang');
var MiShuo = require('site/ListMiShuo');
var HuaMi = require('site/ListHuaMi');
var ZhangHu = require('site/ListZhangHu');
var ReactRouter = require('lib/ReactRouter');

var Router=ReactRouter.Router;
var Route=ReactRouter.Route;
var Link=ReactRouter.Link;
var IndexRoute=ReactRouter.IndexRoute;
var Redirect=ReactRouter.Redirect;
var browserHistory=ReactRouter.browserHistory;
require('/lib/jquery');


if(!location.hash) location.hash="/youmi"

var TableAllBox = React.createClass({
    render: function () {
        var pathname = this.props.location.pathname;

        return (
            <div className=" ">
                <div className="tab-head clearfix tc">
                    <Link activeClassName="active" to="/youmi" className="tab-btn tab-w5">进店有米广告</Link>
                    <Link activeClassName="active" to="/zhuanchang" className="tab-btn tab-w5">专场广告</Link>
                    <Link activeClassName="active" to="/mishuo" className="tab-btn tab-w5">米说广告</Link>
                    <Link activeClassName="active" to="/huami" className="tab-btn tab-w5">入驻花米</Link>
                    <Link activeClassName="active" to="/zhanghu" className="tab-btn tab-w5">账户中心</Link>
                </div>
                <div className="tab-cont ubl1 ubr1 ubb1   white-bg fuzzy-border   ">
                    <div className="tab-box clearfix p15 active " >
                        {React.cloneElement(this.props.children || <div/>, { key: pathname })}
                    </div>
                </div>
            </div>
        );        
    }
});


React.render((
 <Router location="hash">
    <Route path="/" component={TableAllBox}>
      <IndexRoute component={YouMi}/>
      <Route path="/youmi" component={YouMi}/>
      <Route path="/zhuanchang" component={ZhuanChang}/>
      <Route path="/mishuo" component={MiShuo}/>
      <Route path="/huami" component={HuaMi}/>  
      <Route path="/zhanghu" component={ZhangHu}/>  
    </Route>
  </Router>
), document.getElementById('tableAllBox'))