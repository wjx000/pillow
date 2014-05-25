    function Sprite(cfg){
        var that = this;
        that.frame = 0;
        that.paused = false;
        that.loop = true;
        that.offset = {
            x:0,
            y:0
        },
        Sprite.sup.call(that,cfg);
        Util.merge(that,cfg);
        that.init();
    }
    var proto = {
        init:function(){
            var that = this;
            that.xs = that.size.width/that.width;
            that.ys = that.size.height/that.height;
        },
        pause:function(){
            var that = this;
            that.paused = true;
        },
        play:function(){
            var that = this;
            that.paused = false;
        },
        next:function(){
            var that = this;
            !that.paused && that.frame ++;
        },
        prev:function(){
            var that = this;
            !that.paused && !!that.frame && that.frame --;
        },
        to:function(index){
            var that = this;
            that.frame = that.paused? that.frame: index;
        },
        getCurrentFrame:function(){
            var that = this;
            var x = that.frame%that.xs;
            var y = parseInt(that.frame/that.xs);
            if(!x && y == that.ys){
                if(that.loop){
                    that.frame = 0;
                }else{
                    that.paused = true;
                }
            }
            return {
                x:x*that.width + that.offset.x,
                y:y*that.height + that.offset.y
            };
        },
        hitTest:function(){
            return true;
        }
    };
    Util.augment(Sprite,proto);
    Util.inherit(Sprite,Img);
    exports.Sprite = Sprite;
