var React = require('react');
var Loading = require('/components/Loading');
require('/lib/jquery');

var TypeExam = React.createClass({
    getInitialState:function() {
        return {
            loading:true, 
            rendData:[]
        };
    },
    componentWillMount:function() {
        var _this=this;
        $.post('/index.php?g=Yixue&m=Api&a=getColumn',function(res){

            _this.setState({rendData:res.data?res.data:[],loading:false})
        },'json')  
    },
    goUrl:function(id){
        location.href="/index.php?a=questionsList&id="+id
    },
    render: function () {
        if(this.state.loading){
            return (<div className='tc'><Loading /></div>);
        }
        return (
                <div className="p10" >
                        {this.state.rendData.map(function(obj,idx){
                            return(
                                <div className="btn base-btn mb10 block" onClick={this.goUrl.bind(this,obj.id)}>{obj.title}</div>
                            );
                        },this)}  
                </div>
                
        );        
    }
});
//asdsa
module.exports = TypeExam;