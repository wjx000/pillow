    function Timer(target,fps){
        var that = this;
        that.count = 0;
        that.target = target;
        that.paused = false;
        that.init();
    }
    Timer.prototype = {
        init:function(){
            var that = this;
            that.run = function(){
                if(!that.paused){
                    that.target.run ? that.target.run():that.target();
                }
                Util.requestAnimationFrame.call(global,function(){
                    that.run();
                });
            }
        },
        start:function(){
            var that = this;
            that.run();
        },
        pause:function(){
            this.paused = true;
        },
        go:function(){
            this.paused = false;
        },
        fps:function(){
            var that = this;
        }
    };
    exports.Timer = Timer;
