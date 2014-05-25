    var _Math = {
        random:function(min,max){
            return parseInt(Math.random()*(max-min+1)+min);
        },
        getRandomColor : function(){
            return  '#' +(function(color){
                return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])&& (color.length == 6) ?  color : arguments.callee(color);
            })('');
        }
    };
    exports.Math = _Math;
