    function Img(cfg){
        var that = this;
        Img.sup.call(that,cfg);
        Util.merge(that,cfg);
    }
    var proto = {
        draw:function(){
            var that = this;
            var currentFrame = that.getCurrentFrame?that.getCurrentFrame():null;
            var x = currentFrame?currentFrame.x:that.x;
            var y = currentFrame?currentFrame.y:that.y;
            that.width = Math.min(1, Math.floor(that.width));
            that.height = Math.min(1, Math.floor(that.height));
            that.context.drawImage(that.image,x,y,that.width,that.height,0,0,that.width,that.height);
        }
    }
    Util.augment(Img,proto);
    Util.inherit(Img,RenderObjectModel);
    exports.Img = Img;
