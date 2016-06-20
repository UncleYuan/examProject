function drawProcessNew() {  
    // 选出页面上所有class为process的canvas元素,然后迭代每一个元素画图(这里用Jquery的选择器选的)
    var width=100
        var text =25;
        
        var process = parseInt(text);  
       
            // 一个canvas标签  
        var canvas = document.getElementById('item');  
        console.log(canvas)
            // 拿到绘图上下文,目前只支持"2d"  
        var context = canvas.getContext('2d');  
    // 将绘图区域清空,如果是第一次在这个画布上画图,画布上没有东西,这步就不需要了  
        context.clearRect(0, 0,width,width);  
          
    // ***开始画一个灰色的圆  
        context.beginPath();  
            // 坐标移动到圆心
        context.moveTo(width/2,width/2);  
            // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
        context.arc(width/2,width/2,width/2.1, 0, Math.PI * 2, false);  
        context.closePath();  
            // 填充颜色  
        context.fillStyle = '#ddd';  
        context.fill();  
            // ***灰色的圆画完  
         
        context.beginPath();  
        context.moveTo(width/2,width/2);  
        context.arc(width/2,width/2,width/2.3, 0, Math.PI * 2, true);  
        context.closePath();  
        context.fillStyle = 'rgba(255,255,255,1)';  
        context.fill();   
         
        // 画进度  
        context.beginPath();  
        // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
        context.moveTo(width/2,width/2);  
        // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
        context.arc(width/2,width/2,width/2, 0, Math.PI * 2 * process / 100, false); 
   
        context.closePath();  
        context.fillStyle = '#ffc400';  
        context.fill();  
  
        // 画内部空白  
        context.beginPath();  
        context.moveTo(width/2,width/2);  
        context.arc(width/2,width/2,width/2.5, 0, Math.PI * 2, true);  
        context.closePath();  
        context.fillStyle = 'rgba(255,255,255,1)';  
        context.fill();  
          
  
          
        //在中间写字  
        var numB=3.5;
        context.font = "bold "+width/numB+"px Arial";  
        context.fillStyle = '#33cc99';  
        context.textAlign = 'center';  
        context.textBaseline = 'middle';  
        context.moveTo(width/2,width/2); 
        var bigNum=text==100?2.4:2.25;
        context.fillText(text,width/bigNum,width/2.5);  
        
        context.font =width/numB/1.5+"px Arial";  
        var fu=text==100?1.4:1.5;
        context.fillText("%",width/fu,width/2.4);  
        
        // var stateText=$(context.canvas).attr("data-text");
        
        // context.font = width/numB/1.6+"px Arial";  
        // context.fillStyle = '#bbb';  
        // context.textAlign = 'center';  
        // context.textBaseline = 'middle';  
        // context.moveTo(width/2,width/2);  
        // context.fillText(stateText,width/2,width/1.6);
        //$(this).attr('data-load','yes');  
}


drawProcessNew()