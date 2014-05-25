    var fps = 60;
    var realFps = 0;
    function FPS(cfg){
        var that = this;
        that.width = 100;
        that.height = 50;
        Util.merge(that,cfg);
        that.init();
    }
    var proto = {
        init:function(){
            var that = this;
            setInterval(function(){
                fps = realFps;
                realFps = 0;
            },1000);
            that.fps = new Text({
                text:that.text||'fps:'+fps,
                width:that.width,
                height:that.height,
                x:that.x,
                y:that.y,
                color:that.color
            });
            that.fps.update(function(){
                realFps ++;
                this.text = 'fps:' + fps;
            });
        },
        lock:function(){
            var that = this;
            if(that.inited){
                return;
            }
            that.parent.append(that.fps);
            that.inited = true;
        },
        draw:function(){
            var that = this;
            that.lock();
        }
    };
    Util.augment(FPS,proto);
    exports.FPS = FPS;
