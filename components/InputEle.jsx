/** 
* @fileOverview react input组件封装 
* @author <a href="">pan</a> 
* @version 0.1 
*/ 
/** 
* @author pan 

* @description react input组件封装  
* @since version 0.1 
* @param  Props {String} value         input组件的值,从外部传入可直接表单回填 
* @param  Props {String} title         标题 
* @param  Props {String} name          input组件的name 
* @param  Props {String} type          input组件的类型目前支持  input,textarea,select,hidden
* @param  Props {String} optionsArr    type为select时渲染的节点数据[{tit:'',val:''}]
* @param  Props {Function} onValChange 从外部传入事件，当value改变时调用，可向外部传参
* @param  Props {Bool} ispwd           type为input时,为true则为密码表单
* @param  Props {String} title         标题 
*/ 

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
        onValChange:false,
        ispwd:false
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

    if(this.props.onValChange)this.props.onValChange(event.target.value);
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
  
    if(this.props.onValChange)this.props.onValChange(event.target.value);
  },
  selectChang:function(){
     this.setState({value:event.target.value});
     if(this.props.onValChange)this.props.onValChange(event.target.value);
  },
  typeHtml:{
    input:function(o){
      var type=o.props.ispwd?"password":"text";
      return  <input type={type}  ref="textInput" value={o.state.value} onChange={o.change} placeholder={o.props.placeholder} className="problem-input" name={o.props.name} />;
    },
    textarea:function(o){
      return  <textarea ref="textInput" value={o.state.value} onChange={o.textareaChange} placeholder={o.props.placeholder} className="problem-input" name={o.props.name} ></textarea>;
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
          return (
            <div className="problem-box">
              <h6 className="problem-tit">{this.props.title}</h6>
              {this.typeHtml[this.props.type](this)}
            </div>
            
          );
      }else{
        return (<input type="hidden"   value={this.state.value}  name={this.props.name} />);
      }
    }
});

module.exports = InputEle;