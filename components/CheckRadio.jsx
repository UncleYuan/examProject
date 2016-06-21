/** 
* @fileOverview react checkbox组件封装 
* @author <a href="">pan</a> 
* @version 0.1 
*/ 
/** 
* @author pan 

* @description react checkbox组件封装  
* @since version 0.1 
* @param  Props {String} value         checkbox组件的值,从外部传入可直接表单回填 
* @param  Props {String} title         标题 
* @param  Props {String} name          checkbox组件的name 
* @param  Props {String} type          checkbox组件的类型目前支持  radio,checkbox
* @param  Props {Array} optionsArr     渲染的选项数据[{title:'',value:''}]
* @param  Props {Function} onSelEnd    从外部传入事件，当value改变时调用，可向外部传参
* @param  Props {Array} chooseArr      选中的选项的数组
* @param  Props {Number} selLen        设置多选时最多可选择的个数
*/ 




var React = require('react');
indexOf = function(arr,val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
};
removeArr = function(arr,val) {
  var index = indexOf(arr,val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
var CheckRadio = React.createClass({
  getDefaultProps:function(){
      return {
        value:"",
        title:"",
        optionsArr:[],
        chooseArr:[],
        selLen:1000,
        name:"",
        type:"checkbox",
      };
  },
  getInitialState: function() {
      return {
          chooseArr:this.props.chooseArr
        };
    },
  componentWillMount:function(){
    
    if(this.props.value||this.props.value===""){
      var chooseArr=(this.props.value+"").split(',');
      chooseArr=chooseArr[0]?chooseArr:[];
      this.setState({chooseArr:chooseArr,value:this.props.value});
    }

  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.value!=this.props.value){
      var chooseArr=(nextProps.value+"").split(',');
      chooseArr=chooseArr[0]?chooseArr:[];
      this.setState({chooseArr:chooseArr,value:nextProps.value});
    }
  },
  chooseReset:function(value){

    var arr=this.props.optionsArr;
      for(var i in arr){
        if(arr[i].val==value){

          this.chooseRadio(i);
          return;
        }
      }
  },
  chooseCheckBox:function(i){
    
    var chooseVal=this.props.optionsArr[i].value;
    var stateArr=this.state.chooseArr;
    var idx=indexOf(stateArr,chooseVal);
    if(idx<0){
      if(this.props.selLen<=stateArr.length) stateArr.shift();
      stateArr.push(chooseVal)
    }else{
      stateArr=removeArr(this.state.chooseArr,chooseVal);
    }

    this.setState({chooseArr:stateArr,value:stateArr.join(',')});
    if(this.props.onSelEnd)this.props.onSelEnd(stateArr.join(','),stateArr);
  },
  chooseRadio:function(i){
    var chooseVal=this.props.optionsArr[i].value;
    var stateArr=this.state.chooseArr;
    var idx=indexOf(stateArr,chooseVal);
    var setVal="";
    if(idx<0){
      setVal=chooseVal;
      setArr=[chooseVal];
    }else{
      setVal="";
      setArr=[];
    }

    this.setState({chooseArr:setArr,value:setVal});
    if(this.props.onSelEnd)this.props.onSelEnd(setVal,setArr);
  },
  
  getHtml:function(type){
    return this.props.optionsArr.map(function (obj,i) {
          var turnClass="iconfont";
          var addClass=type=="checkbox"?"multi":"single";
          var fnName=type=="checkbox"?"chooseCheckBox":"chooseRadio";
          var selClass=indexOf(this.state.chooseArr,obj.value)>=0?"checked":"";
          return (
            <li key={i} onClick={this[fnName].bind(this,i)} className={"problem-li ub ub-at "+selClass}>
                <i className={"option-idx "+addClass}>{obj.value}</i><p className="option-txt ub-f1">{obj.name}</p>
            </li>
            )
    },this);
  },
  render: function() {

      var value = this.state.chooseArr.join(',');

      return (
        <div className="problem-box" >
            <h6 className="problem-tit">{this.props.title}</h6>
              <input type="hidden" name={this.props.name}  value={value} />
              <ul className="problem-ul">
                
                   {this.getHtml(this.props.type)}
              </ul>
      </div>
      );
  }
});
module.exports = CheckRadio;


