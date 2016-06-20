var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var Tabs = require('/components/Tabs');

var Loading = require('/components/Loading');

require('/lib/jquery');

var titArr=[
    <div ><i className="iconfont vm mr5 fs18 icon-icon04 base-color"></i>考试</div>,
    <div ><i className="iconfont  vm mr5 fs18 icon-tikumoren base-color"></i>题库</div>,
    <div ><i className="iconfont  vm mr5 fs18 icon-yonghu base-color"></i>我的</div>
]

var TabBox = React.createClass({
    render: function () {
        return (
            <Tabs>
                <div title={titArr[0]}>
                    <div className="white-bg p10 mb15">
                        <div className="">
                            <div className="tit-arrow relative-bg">
                                模拟考试
                            </div>
                        </div>
                        <div className="box-list pt15 pb15 ">
                            <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac">
                                <div className="ub-f1 fs14">2011年护士执业资格考试</div>
                                <div className="">
                                    <a href="javascript:;" className="btn assist-btn fs11">开始考试</a>
                                </div>
                            </div>
                            <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac">
                                <div className="ub-f1 fs14">2011年护士执业资格考试</div>
                                <div className="">
                                    <a href="javascript:;" className="btn assist-btn fs11">开始考试</a>
                                </div>
                            </div>
                            <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac">
                                <div className="ub-f1 fs14">2011年护士执业资格考试</div>
                                <div className="">
                                    <a href="javascript:;" className="btn assist-btn fs11">开始考试</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="white-bg p10">
                        <div className="pt10">
                            <div className="tit-arrow base-bg">
                                正式考试
                            </div>
                        </div>
                        <div className="box-list pt15 pb15">
                            <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac">
                                <div className="ub-f1 fs14">2011年护士执业资格考试</div>
                                <div className="">
                                    <a href="javascript:;" className="btn assist-btn fs11">开始考试</a>
                                </div>
                            </div>
                            <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac">
                                <div className="ub-f1 fs14">2011年护士执业资格考试</div>
                                <div className="">
                                    <a href="javascript:;" className="btn assist-btn fs11">开始考试</a>
                                </div>
                            </div>
                            <div className="ubb1 fuzzy-border pt10 pb10  ub ub-ac">
                                <div className="ub-f1 fs14">2011年护士执业资格考试</div>
                                <div className="">
                                    <a href="javascript:;" className="btn assist-btn fs11">开始考试</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div title={titArr[1]} className="tj p10 white-bg">
                    <div className="exam-item-box">
                        <img src="http://box.kancloud.cn/cover_2016-05-31_574d55d2a3e9_800x1068.png?imageMogr2/thumbnail/173x131!/interlace/1/quality/100" alt="" className="top-img" />
                        <div className="bottom-txt">web性能优化</div>
                    </div>
                    {" "}
                    <div className="exam-item-box">
                        <img src="http://box.kancloud.cn/cover_2016-05-31_574d55d2a3e9_800x1068.png?imageMogr2/thumbnail/173x131!/interlace/1/quality/100" alt="" className="top-img" />
                        <div className="bottom-txt">web性能优化</div>
                    </div>
                    {" "}
                    <div className="exam-item-box">
                        <img src="http://box.kancloud.cn/cover_2016-05-31_574d55d2a3e9_800x1068.png?imageMogr2/thumbnail/173x131!/interlace/1/quality/100" alt="" className="top-img" />
                        <div className="bottom-txt">web性能优化</div>
                    </div>
                    {" "}
                    <div className="exam-item-box">
                        <img src="http://box.kancloud.cn/cover_2016-05-31_574d55d2a3e9_800x1068.png?imageMogr2/thumbnail/173x131!/interlace/1/quality/100" alt="" className="top-img" />
                        <div className="bottom-txt">web性能优化</div>
                    </div>
                    {" "}
                    <div className="exam-item-box">
                        <img src="http://box.kancloud.cn/cover_2016-05-31_574d55d2a3e9_800x1068.png?imageMogr2/thumbnail/173x131!/interlace/1/quality/100" alt="" className="top-img" />
                        <div className="bottom-txt">web性能优化</div>
                    </div>
                    {" "}
                </div>
                <div title={titArr[2]}>
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
                    <div className="ub bg-tab-box tc fs14">
                        <div className="ub-f1 bg-tab-btn active">我的考试</div>
                        <div className="ub-f1 bg-tab-btn">我的练习</div>
                    </div>
                    <div className="">
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
                </div>
                </div>
            </Tabs>
        );        
    }
});



React.render((
 <TabBox />
), document.getElementById('TabWrap'))
