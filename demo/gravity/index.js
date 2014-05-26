/**
 * xudafeng@126.com
 * http://xdf.me/
 */
;(function(global,P){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var WIDTH = canvas.width,
        HEIGHT = canvas.height;
    var Util = P.Util;
    var requestAnimationFrame = P.requestAnimationFrame;
    var Vector2d = P.Vector2d;
    var math = P.Math;
    var Timer = P.Timer;
    var NUMBERS = global.numbers;
    var fps = 60;
    var offset = 90;
    function parseNum(num, places) {
        if (num < 100 && places == 3) {
            num = '0' + num;
        }
        if (num < 10) {
            num = '0' + num;
        }
        return num.toString();
    }
    function time(t) {
        var now = t.getTime();
        var dateDiff = Math.floor((now - new Date(2011, 8, 15).getTime()) / 1000);
        if (dateDiff < 0) {
            return [];
        } else {
            var days = parseNum(Math.floor(dateDiff / 86400), 3);
            var timeRemaining = Math.floor(dateDiff % 86400);
            var hours = parseNum(Math.floor(timeRemaining / 3600), 2);
            var minutes = parseNum(Math.floor((timeRemaining % 3600) / 60), 2);
            var seconds = parseNum(((timeRemaining % 3600) % 60) % 60, 2);
            var values = [days, hours, minutes, seconds].join('').split('');
            var d = values.length ==9 ?3:4;
            values.splice(d, 0, '#');
            values.splice(d+3, 0, '#');
            values.splice(d+6, 0, '#');
            return values;
        }
    }
    function randomColor(){
        return (function(m,s,c){
            return (c ? arguments.callee(m,s,c-1) : '#') +s[m.floor(m.random() * 5)]
        })(Math,'abcdef',5)
    }
    function Controller(){
        this.init();
    }
    function countNotChange(items,handle){
        var num = 0;
        Util.each(items,function(i){
            if(handle(i)){
                num ++;
            }
        });
        return num;
    }
    Controller.prototype = {
        init:function(){
            var that = this;
            that.dropBalls = [];
            that.r = 8;
            that.a = 0.8;
            that.offset = 20;
            that.getTime();
            var timer = new Timer(function(){
                that.render();
            },fps);
            timer.start();
        },
        render:function(){
            var that = this;
            ctx.clearRect(0, 0,WIDTH ,HEIGHT);
            that.draw.apply(this);
        },
        draw:function(){
            var that = this;
            that.drawTime();
            that.drawDropBalls();
            that.calculateDropBalls();
        },
        drawTime:function(){
            var that = this;
            Util.each(that.times,function(v,k){
                if(v == '#'){
                    that.drawPoint(1.5,2,k);
                    that.drawPoint(1.5,4,k);
                }else{
                    Util.each(NUMBERS[v],function(i){
                        i.color = i.color || randomColor();
                        ctx.fillStyle = i.color;
                        that.drawPoint(i.x,i.y,k);
                    });
                }
            });
        },
        drawPoint:function(x,y,k,callback){
            var that = this;
            ctx.beginPath();
            ctx.arc(offset*k + 60 + x * that.offset, offset + y * that.offset, that.r, 0, Math.PI * 2, true);
            callback && callback();
            ctx.closePath();
            ctx.fill();
        },
        getTime:function(){
            var that = this;
            that.times = time(new Date());
        },
        calculateDropBalls:function(k){
            var that = this;
            var newTime = time(new Date());
            if(newTime.toString() == that.times.toString()){
                return;
            }
            Util.each(that.times,function(value,key){
                if(value !='#' && value != newTime[key]){
                    var current = NUMBERS[value];
                    var next = NUMBERS[newTime[key]];
                    Util.each(current,function(v){
                        var result = countNotChange(next,function(i){
                            return i.x == v.x && i.y == v.y;
                        });
                        if (result == 0) {
                            var vector = new Vector2d(v.x,v.y);
                            var x = math.random(1,5);
                                x = x%2 ==0?x:-x;
                            Util.merge(vector,{
                                xv:x,
                                yv:math.random(0,8),
                                color:v.color,
                                k:key
                            });
                            that.dropBalls.push(vector);
                        }
                    });
                }
            });
            that.times = newTime;
            if (that.dropBalls.length > 100) {
                that.dropBalls.shift();
            }
        },
        drawDropBalls:function(){
            var that = this;
            Util.each(that.dropBalls,function(i){
                ctx.beginPath();
                that.drawPoint(i.x,i.y,i.k,function(){
                    ctx.fillStyle = i.color;
                    i.x += i.xv/30;
                    i.y += i.yv/30;
                    i.yv += that.a;
                    if (that.r + offset + i.y*that.offset > HEIGHT) {
                        i.yv *= -.6;
                        i.y = (HEIGHT - that.r - offset)/that.offset;
                    }
                });
                ctx.closePath();
                ctx.fill();
            });
        }
    };
    new Controller();
})(window,pillow);
