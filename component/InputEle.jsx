var React = require('react');
var InputEle = React.createClass({
	getDefaultProps:function(){
	    return {
	    	value:"",
        title:"",
        name:"",
        type:"input",
        labelClass:"floating-label",
        optionsArr:[],
        valChange:false,
        placeholder:'',
        ispwd:false,
        abs:true
	    };
	},
  getInitialState: function() {
      return {
          inputEd:false,
          value:this.props.value,
          textareaHeight:false
        };
    },
  componentWillMount:function(){
    if(this.props.type=="select"){
      this.setState({value:this.props.optionsArr[0].val});
    }
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.value!=this.props.value){
      this.setState({value:nextProps.value});
    }
  },
  getStateProps:function(){
    if(this.props.getStateProps){
      this.props.getStateProps()
    }
  },
  change:function(){

    this.setState({value:this.refs.textInput.value||event.target.value});
    if(this.props.valChange){
      this.props.valChange(this.refs.textInput.value||event.target.value)
    }
  },
  firstHeight:0,
  textareaChange:function(event){
    var tH=this.state.textareaHeight;
    if(this.firstHeight==0){
      this.firstHeight=event.target.offsetHeight;
    }
    event.target.style.height=this.firstHeight+'px';
    tH=event.target.scrollHeight;
    event.target.style.height=tH+'px';
    this.setState({value:event.target.value});
    if(this.props.valChange){
      this.props.valChange(event.target.value)
    }
  },
  selectChang:function(){
     this.setState({value:event.target.value});
  },
  typeHtml:{
    input:function(o){
      var type=o.props.ispwd?"password":"text";
      return  <input type={type}  ref="textInput" value={o.state.value} onChange={o.change} placeholder={o.props.placeholder} className="item-input" name={o.props.name} />;
    },
    textarea:function(o){
      return  <textarea ref="textInput" value={o.state.value} onChange={o.textareaChange} placeholder={o.props.placeholder} className="item-input" name={o.props.name} ></textarea>;
    },
    select:function(o){
      return  <select name={o.props.name}  className="not-empty-state" onChange={o.selectChang}>
                {o.props.optionsArr.map(function (obj,i) {
                  return(
                    <option value={obj.val}>{obj.tit}</option>
                  );
                })}
              </select>;
    }
  },
	
  	render: function() {
      if(this.props.type!="hidden"){
          var value = this.state.value;
          var cn=value?"form-item focus":"form-item";
          cn=this.props.abs?cn+" form-item-abs":cn;
          var labelClass="item-tit "+this.props.labelClass;
    	    return (
            <div className={cn}>
              <div className="item-input-box">
                  <div className={labelClass}>{this.props.title}</div>
                  {this.typeHtml[this.props.type](this)}
                  <div className="input-bottom-line"></div>
              </div>
            </div>
    	    );
    	}else{
        return (<input type="hidden"   value={this.state.value}  name={this.props.name} />);
      }
    }
});

module.exports = InputEle;