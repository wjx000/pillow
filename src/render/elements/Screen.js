    function Screen(cfg){
        var that = this;
        Screen.sup.call(that,cfg);
        Util.merge(that,cfg);
        that.init();
    }
    var proto = {
        init:function(){
            var that = this;
            that.target = Util.$(that.container);
            if(that.target){
                that.context = that.target.getContext("2d");
                that.canvas = that.context.canvas;
                that.canvas.width = that.width||that.canvas.width;
                that.canvas.height = that.height||that.canvas.height;
            }else{
                Util.log('init error');
                return;
            }
        },
        run:function(){
            var that = this;
            this.render(that.context);
        },
        hitTest:function(){
            return true;
        }
    }
    Util.augment(Screen,proto);
    Util.inherit(Screen,RenderObjectModel);
    exports.Screen = Screen;
