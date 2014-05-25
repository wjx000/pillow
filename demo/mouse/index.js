/**
 * xudafeng@126.com
 * http://xdf.me/
 */
;(function(global,P){
    var Util = P.Util;
    var Notify = P.Notify;
    var Screen = P.Screen;
    var Timer = P.Timer;
    var fps = 60;
    var Graphics = P.Graphics;
    var FPS = P.FPS
    var Mouse = P.Mouse;
    var math = P.Math;
    function MouseEventDetector(){
        var that = this;
        that.init();
    }
    function createGraphics(screen){
        var x = math.random(10,250);
        var y = math.random(10,250);
        var width = 100;
        var height = 100;
        var rect = new Graphics({
            fillStyle:'#333'
        });
        rect.rect(x,y,width,height);
        rect.on('mousemove',function(e){
            this.fillStyle = 'green';
        });
        screen.append(rect);
    }
    var proto = {
        init:function(){
            var that = this;
            that.initScreen();
            that.addMods();
            //that.initFps();
            that.bind();
            that.start();
        },
        addMods:function(){
            var that = this;
            for(var i=0;i<10;i++){
                createGraphics(that.screen);
            }
            var rect = new Graphics({
                fillStyle:'red'
            });
            rect.rect(10,10,50,50);
            rect.on('mousemove',function(e){
                this.fillStyle = 'white';
            });
            that.screen.children[that.screen.children.length-1].append(rect);
        },
        initScreen:function(){
            var that = this;
            that.screen = new Screen({
                container:'screen',
                width:800,
                height:400,
                x:0,
                y:0
            });
        },
        initFps:function(){
            var that = this;
            var fps = new FPS({
                x:380,
                y: 10,
                color:'red'
            });
            that.screen.append(fps);
        },
        bind:function(){
            var that = this;
            new Mouse({
                screen:that.screen
            });
        },
        start:function(){
            var that = this;
            var timer = window.timer = new Timer(that.screen);
            timer.start();
            //timer.pause();
        }
    };
    Util.augment(MouseEventDetector,proto);
    new MouseEventDetector();
})(window,pillow);
