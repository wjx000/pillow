    function Graphics(cfg){
        var that = this;
        Graphics.sup.call(that,cfg);
        that.hitType = 'rect';
        that.strokeStyle = '#000';
        that.lineWidth = 1;
        that.fillStyle = 'transparent';
        that.query = [];
        Util.merge(that,cfg);
    }
    var proto = {
        draw:function(){
            var that = this;
            Util.each(that.query,function(data){
                var action = data.action;
                if(that.context[action]){
                    var args = data.args;
                    if(Util.type(args) == 'array' || !args){
                        that.context[action].apply(that.context,args);
                    }else{
                        that.context[action] = that[action];
                    }
                }
            });
        },
        push:function(action,args){
            this.query.push({
                action:action,
                args:args?args:null
            });
            return this;
        },
        beginPath:function(){
            this.push('beginPath');
        },
        closePath:function(){
            this.push('closePath');
        },
        rect:function(x, y, width, height){
            var that = this;
            that.hitType = 'rect';
            that.x = x;
            that.y = y;
            that.width = width;
            that.height = height;
            that.beginPath();
	        that.push('rect',[0, 0, that.width, that.height]);
            that.closePath();
            that.push('fillStyle',that.fillStyle);
            that.push('fill');
            that.push('lineWidth',that.lineWidth);
            that.push('strokeStyle',that.strokeStyle);
            that.push('stroke');
            return that;
        },
        circle:function(x, y, radius){
            var that = this;
            that.push('moveTo',[x + radius,y + radius]);
	        that.push('arc',[x + radius, y + radius, radius, 0, Math.PI * 2, false]);
            that.push('stroke');
            that.closePath();
            return that;
        },
        hitTest:function(x,y){
            var that = this;
            switch(that.hitType){
                case 'rect':
                    return x >= that.x && x<=(that.x+that.width) && y>=that.y && (y<=that.y+that.height);
                    break;
                case 'circle':
                    break;
                case 'polygon':
                    break;
            }
        }
    }
    Util.augment(Graphics,proto);
    Util.inherit(Graphics,RenderObjectModel);
    exports.Graphics = Graphics;
