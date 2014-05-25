    function Text(cfg){
        var that = this;
        Text.sup.call(that,cfg);
        that.x = 0;
        that.y = 0;
        that.text = "";
	    that.font = "12px arial";
	    that.color = "#000";
        Util.merge(that,cfg)
    }
    var proto = {
        draw:function(){
            var that = this;
            that.context.fillStyle = that.color;
            that.context.font=that.font;
            that.context.fillText(that.text, that.x, that.y);
        }
    };
    Util.augment(Text,proto);
    Util.inherit(Text,RenderObjectModel);
    exports.Text = Text;
