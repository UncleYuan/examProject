var React = require('react');
var Modal = React.createClass({
	getDefaultProps:function(){
	    return {
        show:false,
        title:"新窗口",
        type:"checkbox",
        ifBindSP:true,
        showClass:'fadeInUp'
	    };
	},
  getInitialState: function() {
      return {
          show:this.props.show,
        };
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.show!=this.state.show){
      this.setState({show:nextProps.show});
    }
  },
  componentDidMount: function () {
    if(this.props.ifBindSP&&PubSub){
      this.pubsub_token = PubSub.subscribe(this.props.name, function (evename,stateObj) {
        this.setState(stateObj);
      }.bind(this));
    }
  },
  componentWillUnmount: function () {
    if(this.props.ifBindSP&&PubSub){
      PubSub.unsubscribe(this.pubsub_token);
    }
  },
  closeModal:function(){
    this.setState({show:false});
    if(this.props.closeFn){
      this.props.closeFn();
    }
    if(this.props.onClose){
      this.props.onClose();
    }
  },
  render: function() {
      var style={display:this.state.show?"block":"none"};
      var bgClass=this.state.show?"in":"";
      var modelClass=this.state.show?this.props.showClass:"hide";

      var h=document.body.offsetHeight< document.body.scrollHeight?document.body.scrollHeight:document.body.offsetHeight
      var height={height:h };
      return (
        <div className="modal" style={style}>
            <div className={"modal-backdrop "+bgClass} style={height}></div>
            <div className={"modal-dialog animated "+modelClass} >
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="fs18">{this.props.title}</h4>
                        <div className="bootbox-close-button close"  onClick={this.closeModal}>×</div>
                    </div>
                    <div className="modal-body">
                      {this.props.children}
                    </div>
                </div>
            </div>
        </div>
          )
	}
});

module.exports = Modal;


