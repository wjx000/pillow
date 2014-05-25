/* ================================================================
 * pillow.js v1.0.5
 *
 * a canvas framework
 * Latest build : 2014-05-25 20:37:44
 *
 * 
 * ================================================================
 * Copyright 2013 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

;(function(root,factory){
    'use strict';
    /* amd like aml https://github.com/xudafeng/aml.git */
    if(typeof define === 'function' && define.amd) {
        return define(['exports'], factory);
    }else if(typeof exports !== 'undefined') {
        return factory(exports);
    }else{
    /* browser */
        factory(root['pillow'] || (root['pillow'] = {}));
    }
})(this,function(exports){
    var global = this;

    var Util = {
        create:function(o){
            if (Object.create) {
                return Object.create(o);
            } else {
                var F = function(){};
                F.prototype = o;
                return new F();
            }
        },
        guid:function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        $:function(id){
	        return document.getElementById(id);
        },
        extend:function(){
            var args = this.slice.call(arguments);
            var object = args.shift();
            for (var i = 0, l = args.length; i < l; i++) {
                var props = args[i];
                for (var key in props) {
                    object[key] = props[key];
                }
            }
            return object;
        },
        inherit:function(sub, sup) {
            var temp = sub.prototype;
            sub.prototype = this.create(sup.prototype);
            for(var i in temp) {
                sub.prototype[i] = temp[i];
            }
            sub.prototype.constructor = sub;
            sub.sup = sup;
        },
        augment:function(r,s){
            this.each(s,function(v,k){
                r.prototype[k]= v;
            });
        },
        log:function (l){
            console && (this.type(console.log) == 'function') && console.log(l);
        },
        indexOf:function (arr, val) {
            if (arr.indexOf) {
                return arr.indexOf(val);
            }
            var i, len = arr.length;
            for (i = 0; i < len; i++) {
                if (arr[i] === val) {
                    return i;
                }
            }
            return -1;
        },
        merge:function(r,s){
            for(var i in s){
                r[i] = s[i];
            };
            return r;
        },
        each:function(object, fn) {
            if(!object){
                return;
            }
            for(var i in object){
                if(object.hasOwnProperty(i)){
                    fn.call(this,object[i],i);
                }
            }
            return object;
        },
        pushUnique : function (arr, val) {
            if (this.indexOf(arr, val) === -1) {
                arr.push(val);
                return true;
            }
            return false;
        },
        removeValue : function (arr, val) {
            var index = this.indexOf(arr, val);
            if (index !== -1) {
                return arr.splice(index, 1)[0];
            }
        },
        type:function(c){
            if (c === null || typeof c === "undefined") {
                return String(c);
            } else {
                return Object.prototype.toString.call(c).replace(/\[object |\]/g, '').toLowerCase();
            }
        },
        transpose : function (obj) {
            var transpose = {};
            this.each(obj, function (val, key) {
                transpose[val] = key;
            });
            return transpose;
        },
        slice:Array.prototype.slice,
        requestAnimationFrame : (function () {
            return global.requestAnimationFrame  ||
            global.webkitRequestAnimationFrame ||
            global.mozRequestAnimationFrame    ||
            function(callback){
                global.setTimeout(callback, 1000 / 60);
            };
        })(),
        bind: function (e, handler) {
            if (global.addEventListener) {
                global.addEventListener(e, handler, false);
            } else if (document.attachEvent) {
                document.attachEvent('on' + e, handler);
            }
        }
    };
    exports.Util = exports._ = Util;

    function __emit(type, data) {
        var handlers = Util.slice.call(this.NotifyHash[type]);
        for (var i = 0, l = handlers.length; i < l; i++) {
            var j = Util.extend({}, handlers[i]);
            var scope = (j.scope) ? j.scope : this;
            j.scope = scope;
            j.handler.call(j.scope, data, j);
        }
    };
    function __detach(type) {
        var handlers = this.NotifyHash;
        if (type) {
            delete handlers[type];
        } else {
            this.NotifyHash = {};
        }
    };
    function __bind(key,handle){
        var events = key.split(" ");
        for (var i = 0, l = events.length; i < l; i++) {
            var t = events[i];
            if (!this.NotifyHash[t]) {
                this.NotifyHash[t] = [];
            }
            this.NotifyHash[t].push({
                "handler" : handle,
                "type" : t
            });
        }
    }
    function Notify(){
        this.DataHash = {};
        this.NotifyHash = {};
    };
    Notify.prototype = {
        on : function(arg1,arg2) {
            if(Util.type(arg1) == 'object'){
                for (var j in arg1) {
                    __bind.call(this,j,arg1[j]);
                }
            }else{
                __bind.call(this,arg1,arg2);
            }
            return this;
        },
        emit : function(types, data) {
            var items = types.split(" ");
            for (var i = 0, l = items.length; i < l; i++) {
                var type = items[i];
                if (this.NotifyHash[type]) {
                        __emit.call(this, type, Util.type(data) == 'undefined' ? null : data);
                }
            }
            return this;
        },
        detach : function() {
            __detach.apply(this, arguments);
            return this;
        },
        set:function(id,value){
            this.DataHash[id] = value;
        },
        get:function(id){
            return this.DataHash[id];
        },
        has:function(id){
            return !!this.DataHash[id];
        },
        all:function(){
            return this.DataHash;
        },
        remove:function(id){
            if(this.DataHash[id]){
                delete this.DataHash[id];
            }
        }
    };
    exports.Notify = Notify;

    var noop = function(){};
    var KEYS = {
        A:65,
        B:66,
        C:67,
        D:68,
        E:69,
        F:70,
        G:71,
        H:72,
        I:73,
        J:74,
        K:75,
        L:76,
        M:77,
        N:78,
        O:79,
        P:80,
        Q:81,
        R:82,
        S:83,
        T:84,
        U:85,
        V:86,
        W:87,
        X:88,
        Y:89,
        Z:90,
        ZERO:48,
        ONE:49,
        TWO:50,
        THREE:51,
        FOUR:52,
        FIVE:53,
        SIX:54,
        SEVEN:55,
        EIGHT:56,
        NINE:57,
        F1:112,
        F2:113,
        F3:114,
        F4:115,
        F5:116,
        F6:117,
        F7:118,
        F8:119,
        F9:120,
        F10:121,
        F11:122,
        F12:123,
        LEFT:37,
        UP:38,
        RIGHT:39,
        DOWN:40,
        BACKSPACE:8,
        TAB:9,
        ENTER:13,
        SHIFT:16,
        CTRL:17,
        ALT:18,
        ESC:27,
        SPACE:32
    };
    var _KEYS = Util.transpose(KEYS);

    var keysDown = [];

    function bindOrFire (key, handlerName, opt_handler) {
        if (opt_handler) {
            key[handlerName] = opt_handler;
        } else {
            key[handlerName]();
        }
    }

    function Key (keyCode) {
        this.keyCode = keyCode;
    }
    var proto = {
        _downHandler : noop,
        _upHandler:noop,
        _pressHandler:noop,
        isDown:function () {
            return Util.indexOf(keysDown, this.keyCode) !== -1;
        },
        down:function (opt_handler) {
            bindOrFire(this, '_downHandler', opt_handler);
        },
        up : function (opt_handler) {
            bindOrFire(this, '_upHandler', opt_handler);
        },
        press : function (opt_handler) {
            bindOrFire(this, '_pressHandler', opt_handler);
        },
        unbindDown : function () {
            this._downHandler = noop;
        },
        unbindUp : function () {
            this._upHandler = noop;
        },
        unbindPress : function () {
            this._pressHandler = noop;
        }
    };
    Util.augment(Key,proto);
    var Keyboard = {};
    Keyboard.Key = Key;
    var running = false;
    var proto = {
        simulate : function () {
            var i, len = keysDown.length;
            for (i = 0; i < len; i++) {
                var keyCode = keysDown[i];
                var keyName = _KEYS[keyCode];
                if (keyName) {
                    Keyboard[keyName].down();
                }
            }
        },
        run : function (handler) {
            running = true;
            Util.requestAnimationFrame.call(global, function () {
                if (!running) {
                    return;
                }
                Keyboard.run(handler);
                handler();
            });
        },
        stop : function () {
            running = false;
        }
    }
    Util.extend(Keyboard,proto);
    Util.each(KEYS, function (keyCode, keyName) {
        Keyboard[keyName] = new Key(keyCode);
    });
    Util.bind('keydown', function (evt) {
        var keyCode = evt.keyCode;
        var keyName = _KEYS[keyCode];
        var isNew = Util.pushUnique(keysDown, keyCode);
        if (isNew && Keyboard[keyName]) {
            Keyboard[keyName].press();
        }
    });
    Util.bind('keyup', function (evt) {
        var keyCode = Util.removeValue(keysDown, evt.keyCode);
        var keyName = _KEYS[keyCode];
        if (keyName) {
            Keyboard[keyName].up();
        }
    });
    Util.bind('blur', function (evt) {
        keysDown.length = 0;
    });
    exports.Keyboard = Keyboard;

    function getOffset(element){
        var x=0,y=0;
        var offsetParent = element;
        while (offsetParent != null && offsetParent != document.body){
            x += offsetParent.offsetLeft;
            y += offsetParent.offsetTop;
            offsetParent = offsetParent.offsetParent;
        }
        return {x:x, y:y};
    }
    function Mouse(cfg){
        var that = this;
        that.types = "ontouch" in window ? ["touchstart", "touchmove", "touchend"] : ["mousedown","mousemove","mouseup"];
        that.element = document;
        Util.merge(that,cfg);
        this.bind();
    }
    var proto = {
        bind:function(){
            var that = this;
            that.element = that.screen.target;
            that.offset = getOffset(that.element);
            Util.each(that.types,function(i){
                that.element.addEventListener(i,function(e){
                    e.preventDefault();
                    var x = e.changedTouches?e.changedTouches[0].pageX:e.pageX;
                    var y = e.changedTouches?e.changedTouches[0].pageY:e.pageY;
                    that.screen.dispatch(i,x - that.offset.x,y - that.offset.y);
                });
            });
        }
    };
    Util.augment(Mouse,proto);
    exports.Mouse = Mouse;

    function RenderObject(){
        var that = this;
        RenderObject.sup.call(that);
        that.x = 0;
        that.y = 0;
        that.width = 0;
        that.height = 0;
        that.alpha = 1;
        that.scaleX = 1;
        that.scaleY = 1;
        that.rotation = 0;
        that.angle = 0;
        that.visible = true;
        that.event = true;
        that.parent = null;
        that.context = null;
        that.debug = false;
    }
    var proto = {
        _draw:function(context){
            var that = this;
            if(!that.visible){
                return;
            }
            that.context = that.context||context;
            that.update();
            that.context.save();
            that.context.exportsAlpha = that.alpha;
            that.context.translate(that.x,that.y);
            that.context.rotate(that.rotation*Math.PI/180);
            that.context.scale(that.scaleX,that.scaleY);
            that.draw();
            Util.each(that.children,function(current){
                current._draw(that.context);
            });
            that.context.restore();
        },
        _debug:function(context){
            var that = this;
            that.context = that.context || context;
            that.draw();
            Util.each(that.children,function(current){
                current._debug(that.context);
            });
        },
        draw:function(){},
        update:function(){
            var that = this;
            that.handle = that.handle || arguments[0]
            that.handle && that.handle();
        },
        clear:function(x, y, width, height){
            this.context.clearRect(x, y, width, height);
        }
    }
    Util.augment(RenderObject,proto);
    Util.inherit(RenderObject,Notify);
    exports.RenderObject = RenderObject;

    function RenderObjectModel(cfg){
        var that = this;
        RenderObjectModel.sup.call(that,cfg);
        that.children = [];
        that.parent = null;
        Util.merge(that,cfg);
    }
    var proto = {
        render:function(context){
            var that = this;
            that.clear(0,0,that.width,that.height);
            that._draw(that.context);
            //that._debug(context);
        },
        append:function(node){
            var that = this;
            node.parent = that;
            that.children[that.children.length] = node;
        },
        removeChildren:function(index){
            this.children[index] && this.children.splice(index,1);
        },
        removeAllChildren:function(){
            this.children = [];
        },
        traversal:function(callback){
            var node = this,
                current,
                parent,
                children,
                i,
                nodes = Util.type(node) == 'array'? node.slice(0).reverse() : [node],
                parents = [];
            if (Util.type(nodes[0]) === 'undefined' && nodes.length === 1) {
                return;
            }
            for (i = nodes.length-1; i >= 0; i--){
                parents.push(null);
            }
            while (nodes.length > 0) {
                current = nodes.pop();
                parent = parents.pop();
                callback(current);
                children = (current && current['children'])? current['children'] : [];
                for (i = children.length-1; i >= 0; i--) {
                    nodes.push(children[i]);
                    parents.push(current);
                }
            }
        },
        dispatch:function(type,x,y){
            var that = this;
            var children = that.children;
            var i = children.length;
            var _x = x - that.x;
            var _y = y - that.y;
            that.emit(type);
            while(i--){
                var child = children[i];
                if(child.hitTest(_x, _y)){
                    child.dispatch(type,_x,_y);
                    return;
			    }
            }
        }
    };
    Util.augment(RenderObjectModel,proto);
    Util.inherit(RenderObjectModel,RenderObject);
    exports.RenderObjectModel = RenderObjectModel;

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
            that.context.drawImage(that.image,x,y,that.width,that.height,0,0,that.width,that.height);
        }
    }
    Util.augment(Img,proto);
    Util.inherit(Img,RenderObjectModel);
    exports.Img = Img;

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

    function Collision(cg){
        /**
         *点和矩形间的碰撞
        **/	
        this.col_Point_Rect=function(pointX,pointY,rectObj){
            return (pointX>rectObj.x&&pointX<rectObj.right||pointY>rectObj.y&&pointY<rectObj.bottom);
        }
        /**
         *矩形和矩形间的碰撞
        **/	
        this.col_Between_Rects=function(rectObjA,rectObjB){
            return ((rectObjA.right>rectObjB.x&&rectObjA.right<rectObjB.right||rectObjA.x>rectObjB.x&&rectObjA.x<rectObjB.right)&&(rectObjA.bottom>rectObjB.y&&rectObjA.bottom<rectObjB.bottom||rectObjA.y<rectObjB.bottom&&rectObjA.bottom>rectObjB.y));
        }
        /**
         *点和圆形间的碰撞
        **/	
        this.col_Point_Circle=function(pointX,pointY,circleObj){
            return(Math.pow((pointX-circleObj.x),2)+Math.pow((pointY-circleObj.y),2)<Math.pow(circleObj.r,2));
        }
        /**
         *圆形和圆形间的碰撞
        **/	
        this.col_between_Circles=function(circleObjA,circleObjB){
            return(Math.pow((circleObjA.x-circleObjB.x),2)+Math.pow((circleObjA.y-circleObjB.y),2)<Math.pow((circleObjA.r+circleObjB).r,2));
        }
    };
    exports.Collision = Collision;

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


    function Map(cfg){
        var that = this;
        that.cache = true;
        that.lock = false;
        that.source = {};
        Map.sup.call(that,cfg);
        Util.merge(that,cfg);
        that.init();
    }
    var proto = {
        init:function(){
            var that = this;
        },
        clearCache:function(){
            var that = this;
            that.lock = false;
        },
        draw:function(){
            var that = this;
            if(that.lock){
                that.context.drawImage(images[j].src,images[j].x,images[j].y,that.size.width,that.size.height,that.size.width*y,that.size.height*x,that.size.width,that.size.height);
                return;
            }
            var images = that.resource;
            Util.each(that.matrix,function(i,x){
                Util.each(i,function(j,y){
                    that.context.drawImage(images[j].image,0,0,that.size.width,that.size.height,that.size.width*y,that.size.height*x,that.size.width,that.size.height);
                });
            });
            that.mapCache = {};
            if(that.cache){
                that.lock = true;
            }
        }
    };
    Util.augment(Map,proto);
    Util.inherit(Map,RenderObjectModel);
    exports.Map = Map;

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

    var Matrix = Array;
    var proto = {
        copy : function () {
            return [
                this[0],
                this[1],
                this[2],
                this[3]
            ];
        },
        multiplyScalar : function (s) {
            return [
                this[0] * s,
                this[1] * s,
                this[2] * s,
                this[3] * s || 0
            ];
        },
        subtract : function (p) {
            return [
                this[0] - p[0],
                this[1] - p[1],
                this[2] - p[2],
                this[3] - p[3]
            ];
        },
        add : function (p) {
            return [
                this[0] + p[0],
                this[1] + p[1],
                this[2] + p[2],
                this[3] + p[3]
            ];
        },
        applyMatrix : function (m) {
            var px = this[0], py = this[1], pz = this[2], pw = this[3];
            this[0] = px * m[0] + py * m[4] + pz * m[8] +  pw * m[12];
            this[1] = px * m[1] + py * m[5] + pz * m[9] +  pw * m[13];
            this[2] = px * m[2] + py * m[6] + pz * m[10] + pw * m[14];
            this[3] = px * m[3] + py * m[7] + pz * m[11] + pw * m[15];
            return this;
        },
        multiplyMatrix : function (m) {
            var px = this[0], py = this[1], pz = this[2], pw = this[3];
            return [
                px * m[0] + py * m[4] + pz * m[8] +  pw * m[12],
                px * m[1] + py * m[5] + pz * m[9] +  pw * m[13],
                px * m[2] + py * m[6] + pz * m[10] + pw * m[14],
                px * m[3] + py * m[7] + pz * m[11] + pw * m[15]
            ];
        },crossProduct : function (p) {
            return [
                this[1] * p[2] - this[2] * p[1], 
                this[2] * p[0] - this[0] * p[2],
                this[0] * p[1] - this[1] * p[0],
                0
            ];
        },
        dotProduct : function (p) {
            return (
                this[0] * p[0] +
                this[1] * p[1] +
                this[2] * p[2] +
                (this[3] || 0) * (p[3] || 0)
            );
        },
        normalize : function () {
            var n = Math.sqrt(
                this[0] * this[0] +
                this[1] * this[1] +
                this[2] * this[2] +
                this[3] * this[3]
            );
            this[0] /= n;
            this[1] /= n;
            this[2] /= n;
            this[3] /= n;
            return this;
        },
        rotateXYZ : function (angleX, angleY, angleZ) {
            var cw = Math.cos(angleX),
                sw = Math.sin(angleX),
                cy = Math.cos(angleY),
                sy = Math.sin(angleY),
                ck = angleZ ? Math.cos(angleZ) : 1,
                sk = angleZ ? Math.sin(angleZ) : 0;
            return [
                 cy*ck,		 cw*sk+sw*sy*ck,		sw*sk-cw*sy*ck,		0,
                -cy*sk,		 cw*ck-sw*sy*sk,		sw*ck+cw*sy*sk,		0,
                 sy,		-sw*cy,					cw*cy,				0,
                 0,			 0,						0,					1
            ];
        },
        multiply : function (m) {
            var m1XX = this[0],		m1XY = this[1],		m1XZ = this[2],		m1XW = this[3],
                m1YX = this[4],		m1YY = this[5],		m1YZ = this[6],		m1YW = this[7],
                m1ZX = this[8],		m1ZY = this[9],		m1ZZ = this[10],	m1ZW = this[11],
                m1WX = this[12],	m1WY = this[13],	m1WZ = this[14],	m1WW = this[15],
                m2XX = m[0],		m2XY = m[1],		m2XZ = m[2],		m2XW = m[3],
                m2YX = m[4],		m2YY = m[5],		m2YZ = m[6],		m2YW = m[7],
                m2ZX = m[8],		m2ZY = m[9],		m2ZZ = m[10],		m2ZW = m[11],
                m2WX = m[12],		m2WY = m[13],		m2WZ = m[14],		m2WW = m[15];
            return [
                m1XX * m2XX + m1XY * m2YX + m1XZ * m2ZX + m1XW * m2WX,
                m1XX * m2XY + m1XY * m2YY + m1XZ * m2ZY + m1XW * m2WY,
                m1XX * m2XZ + m1XY * m2YZ + m1XZ * m2ZZ + m1XW * m2WZ,
                m1XX * m2XW + m1XY * m2YW + m1XZ * m2ZW + m1XW * m2WW,
                m1YX * m2XX + m1YY * m2YX + m1YZ * m2ZX + m1YW * m2WX,
                m1YX * m2XY + m1YY * m2YY + m1YZ * m2ZY + m1YW * m2WY,
                m1YX * m2XZ + m1YY * m2YZ + m1YZ * m2ZZ + m1YW * m2WZ,
                m1YX * m2XW + m1YY * m2YW + m1YZ * m2ZW + m1YW * m2WW,
                m1ZX * m2XX + m1ZY * m2YX + m1ZZ * m2ZX + m1ZW * m2WX,
                m1ZX * m2XY + m1ZY * m2YY + m1ZZ * m2ZY + m1ZW * m2WY,
                m1ZX * m2XZ + m1ZY * m2YZ + m1ZZ * m2ZZ + m1ZW * m2WZ,
                m1ZX * m2XW + m1ZY * m2YW + m1ZZ * m2ZW + m1ZW * m2WW,
                m1WX * m2XX + m1WY * m2YX + m1WZ * m2ZX + m1WW * m2WX,
                m1WX * m2XY + m1WY * m2YY + m1WZ * m2ZY + m1WW * m2WY,
                m1WX * m2XZ + m1WY * m2YZ + m1WZ * m2ZZ + m1WW * m2WZ,
                m1WX * m2XW + m1WY * m2YW + m1WZ * m2ZW + m1WW * m2WW
            ];
        },
        inverse : function (m) {
            var a00 = m[0],  a01 = m[1],  a02 = m[2],  a03 = m[3],
                a10 = m[4],  a11 = m[5],  a12 = m[6],  a13 = m[7],
                a20 = m[8],  a21 = m[9],  a22 = m[10], a23 = m[11],
                a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15],
                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,
                // Calculate the determinant
                det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) return this;
            det = 1.0 / det;
            return [
                (a11 * b11 - a12 * b10 + a13 * b09) * det,
                (a02 * b10 - a01 * b11 - a03 * b09) * det,
                (a31 * b05 - a32 * b04 + a33 * b03) * det,
                (a22 * b04 - a21 * b05 - a23 * b03) * det,
                (a12 * b08 - a10 * b11 - a13 * b07) * det,
                (a00 * b11 - a02 * b08 + a03 * b07) * det,
                (a32 * b02 - a30 * b05 - a33 * b01) * det,
                (a20 * b05 - a22 * b02 + a23 * b01) * det,
                (a10 * b10 - a11 * b08 + a13 * b06) * det,
                (a01 * b08 - a00 * b10 - a03 * b06) * det,
                (a30 * b04 - a31 * b02 + a33 * b00) * det,
                (a21 * b02 - a20 * b04 - a23 * b00) * det,
                (a11 * b07 - a10 * b09 - a12 * b06) * det,
                (a00 * b09 - a01 * b07 + a02 * b06) * det,
                (a31 * b01 - a30 * b03 - a32 * b00) * det,
                (a20 * b03 - a21 * b01 + a22 * b00) * det
            ];
        },
        viewMatrix : function (u, v, n, r) {
            return [
                u[0],	v[0],	n[0],	0,
                u[1],	v[1],	n[1],	0,
                u[2],	v[2],	n[2],	0,
                - (
                    r[0] * u[0] +
                    r[1] * u[1] +
                    r[2] * u[2] +
                    r[3] * u[3]
                ),
                - (
                    r[0] * v[0] +
                    r[1] * v[1] +
                    r[2] * v[2] +
                    r[3] * v[3]
                ),
                - (
                    r[0] * n[0] +
                    r[1] * n[1] +
                    r[2] * n[2] +
                    r[3] * n[3]
                ), 1
            ];
        },
        perspective : function (distance) {
            return [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1,-1 / distance,	//	set the perspective factor to 1 / distance to the picture plane
                0, 0, 0, 1
            ];
        },
        definePlane : function () {
            var sum = [0,0,0,0];
            for (
                var i = 0, last = this.length - 1;
                i < this.length;
                last = i, i++
            ) {
                var A = this[last];		//	assumes counter-clockwise points order
                var B = this[i];
                sum[0] += (A[1] - B[1]) * (A[2] + B[2]);
                sum[1] += (A[2] - B[2]) * (A[0] + B[0]);
                sum[2] += (A[0] - B[0]) * (A[1] + B[1]);
            }
            sum.normalize();
            var p = this[0];
            return [
                sum[0],
                sum[1],
                sum[2],
                - (
                    sum[0] * p[0] +
                    sum[1] * p[1] +
                    sum[2] * p[2] +
                    sum[3] * p[3]
                )
            ];
        },
        identity : function() {
            return [	// identity matrix
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        },
        scale : function (x, y, z) {
            return this.multiply(
                [
                    x, 0, 0, 0,
                    0, y, 0, 0,
                    0, 0, z, 0,
                    0, 0, 0, 1
                ]
            );
        },
        translate : function (x, y, z) {
            return this.multiply(
                [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    x, y, z, 1
                ]
            );
        },rotateX : function (angle) {
            angle = angle * (Math.PI / 180);
            var c = Math.cos(angle),
                s = Math.sin(angle);
            return this.multiply(
                [
                    1, 0, 0, 0,
                    0, c, s, 0,
                    0,-s, c, 0,
                    0, 0, 0, 1
                ]
            );
        },
        rotateY : function (angle) {
            angle = angle * (Math.PI / 180);
            var c = Math.cos(angle),
            s = Math.sin(angle);
            return this.multiply(
                [
                    c, 0,-s, 0,
                    0, 1, 0, 0,
                    s, 0, c, 0,
                    0, 0, 0, 1
                ]
            );
        },
        rotateZ : function (angle) {
            angle = angle * (Math.PI / 180);
            var c = Math.cos(angle),
            s = Math.sin(angle);
            return this.multiply(
                [
                    c,-s, 0, 0,
                    s, c, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ]
            );
        }
    };
    Util.augment(Matrix,proto);
    exports.Matrix = Matrix;

    function Particle(){
        
    }
    exports.Particle = Particle;

    var Physics = {
    };
    exports.Physics = Physics;


    function SourceLoader(cfg){
        var that = this;
        that.hash = {};
        SourceLoader.sup.call(that,cfg);
        Util.merge(that,cfg);
    }
    var proto = {
        load:function(query){
            var that = this;
            that.num = 0;
            that.query = query;
            Util.each(that.query,function(i){
                that.imageLoader(i);
            });
        },
        imageLoader:function(item){
            var that = this;
            var image = new Image();
            image.crossOrigin = '*';
            image.onload = function(){
                that.hash[item.id] = {
                    image:image,
                    width:image.width,
                    height:image.height
                };
                that.num ++;
                if(that.num == that.getSize()){
                    that.emit('success',that.hash);
                }
            }
            image.src = item.src;
        },
        getSize:function(){
            return this.query.length;
        }
    };
    Util.augment(SourceLoader,proto);
    Util.inherit(SourceLoader,Notify);
    exports.SourceLoader = SourceLoader;

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

    var Tween = {
        swing:function(t) {
            return ( -Math.cos(t * PI) / 2 ) + 0.5;
        },
        easeNone: function (t) {
            return t;
        },
        easeIn: function (t) {
            return t * t;
        },
        easeOut: function (t) {
            return ( 2 - t) * t;
        },
        easeBoth: function (t) {
            return (t *= 2) < 1 ?
                .5 * t * t :
                .5 * (1 - (--t) * (t - 2));
        },
        easeInStrong: function (t) {
            return t * t * t * t;
        },
        easeOutStrong: function (t) {
            return 1 - (--t) * t * t * t;
        },
        easeBothStrong: function (t) {
            return (t *= 2) < 1 ?
                .5 * t * t * t * t :
                .5 * (2 - (t -= 2) * t * t * t);
        },
        elasticIn: function (t) {
            var p = .3, s = p / 4;
            if (t === 0 || t === 1) return t;
            return -(pow(2, 10 * (t -= 1)) * sin((t - s) * (2 * PI) / p));
        },
        elasticOut: function (t) {
            var p = .3, s = p / 4;
            if (t === 0 || t === 1) return t;
            return pow(2, -10 * t) * sin((t - s) * (2 * PI) / p) + 1;
        },
        elasticBoth: function (t) {
            var p = .45, s = p / 4;
            if (t === 0 || (t *= 2) === 2) return t;
            if (t < 1) {
                return -.5 * (pow(2, 10 * (t -= 1)) *
                        sin((t - s) * (2 * PI) / p));
            }
            return pow(2, -10 * (t -= 1)) *
                sin((t - s) * (2 * PI) / p) * .5 + 1;
        },
        backIn: function (t) {
            if (t === 1) t -= .001;
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
        },
        backOut: function (t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
        },
        backBoth: function (t) {
            if ((t *= 2 ) < 1) {
                return .5 * (t * t * (((BACK_CONST *= (1.525)) + 1) * t - BACK_CONST));
            }
            return .5 * ((t -= 2) * t * (((BACK_CONST *= (1.525)) + 1) * t + BACK_CONST) + 2);
        },
        bounceIn: function (t) {
            return 1 - Tween.bounceOut(1 - t);
        },
        bounceOut: function (t) {
            var s = 7.5625, r;
            if (t < (1 / 2.75)) {
                r = s * t * t;
            }
            else if (t < (2 / 2.75)) {
                r = s * (t -= (1.5 / 2.75)) * t + .75;
            }
            else if (t < (2.5 / 2.75)) {
                r = s * (t -= (2.25 / 2.75)) * t + .9375;
            }
            else {
                r = s * (t -= (2.625 / 2.75)) * t + .984375;
            }
            return r;
        }
    };
    exports.Tween = Tween;

    function Vector2d(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    var proto = {
        initialize: function(x, y) {
            this.x = x;
            this.y = y;
        },
        set: function(other) {
            this.x = other.x;
            this.y = other.y;
            return this;
        },
        setArray: function(arr) {
            this.x = arr[0];
            this.y = arr[1];
            return this;
        },
        setCoords: function(x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        get: function() {
            return new Vector2d(this.x, this.y);
        },
        mag: function() {
            return Math.sqrt(this.x*this.x + this.y*this.y);
        },
        add: function(other) {
            this.x += other.x;
            this.y += other.y;
            return this;
        },
        addArray: function(arr) {
            this.x += arr[0];
            this.y += arr[1];
            return this;
        },
        addCoords: function(x, y) {
            this.x += x;
            this.y += y;
            return this;
        },
        sub: function(other) {
            this.x -= other.x;
            this.y -= other.y;
            return this;
        },
        subArray: function(arr) {
            this.x -= arr[0];
            this.y -= arr[1];
            return this;
        },
        subCoords: function(x, y) {
            this.x -= x;
            this.y -= y;
            return this;
        },
        mult: function(n) {
            this.x *= n;
            this.y *= n;
            return this;
        },
        scale: function(n) {
            this.mult(n);
            return this;
        },
        multVec: function(other) {
            this.x *= other.x;
            this.y *= other.y;
            return this;
        },
        div: function(n) {
            this.x /= n;
            this.y /= n;
            return this;
        },
        divVec: function(other) {
            this.x /= other.x;
            this.y /= other.y;
            return this;
        },
        dist: function(other) {
            var dx = this.x - other.x;
            var dy = this.y - other.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        dot: function(other) {
            return this.x * other.x + this.y * other.y;
        },
        dotCoords: function(x, y) {
            return this.x * x + this.y + y
        },
        normalize: function() {
            var m = this.mag();
            if (m != 0 && m != 1) {
                this.div(m);
            }
            return this;
        },
        limit: function(max) {
            if (this.mag() > max) {
                this.normalize();
                this.mult(max);
            }
            return this;
        },
        heading2d: function() {
          var angle = Math.atan2(-y, x);
          return -1 * angle;
        },
        rotate: function(rads) {
            var s = Math.sin(rads);
            var c = Math.cos(rads);
            var xrot = (c * this.x) - (s * this.y);
            this.y = (s * this.x) + (c * this.y);
            this.x = xrot;
            return this;
        },
        angle: function(other) {
            return Math.acos(this.dot(other) / (this.mag() * other.mag()));
        },
        normal: function() {
            var temp = this.vector.x;
            this.x = -this.vector.y;
            this.y = temp;
            return this;
        },
        random: function(mag) {
            this.x = Math.random();
            this.y = Math.random();
            if (mag) this.scale(mag);
            return this;
        },
        zero: function() {
            this.x = 0;
            this.y = 0;
        },
        equals: function(other) {
            return this.x === other.x && this.y === other.y
        },
        toString: function() {
            return "[" + this.x + "," + this.y + "]";
        }
    };
    Util.augment(Vector2d,proto);
    Vector2d.add = function(one, other) {
        var vec = new Vector2d();
        vec.setCoords(one.x + other.x, one.y + other.y);
        return vec;
    }
    Vector2d.sub = function(one, other) {
        var vec = new Vector2d();
        vec.setCoords(one.x - other.x, one.y - other.y);
        return vec;
    }
    Vector2d.dist = function(one, other) {
        var dx = one.x - other.x;
        var dy = one.y - other.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
    Vector2d.random = function(mag) {
        var vec = new Vector2d(Math.random(), Math.random());
        if (mag) vec.scale(mag);
        return vec;
    }
    Vector2d.mult = function(one, scalar) {
        var vec = new Vector2d(one.x, one.y);
        vec.x *= scalar;
        vec.y *= scalar
        return vec;
    }
    Vector2d.normal = function(vec) {
        return new Vector2d(-vec.y, vec.x);
    }
    Vector2d.normalize = function(vec) {
        var v = new Vector2d(vec.x, vec.y);
        var m = v.mag();
        if (m != 0 && m != 1) {
            v.div(m);
        }
        return v;
    }
    Vector2d.componentVector = function(vec, directionVec) {
        directionVec.normalize();
        directionVec.mult(vec.dot(directionVec));
        return directionVec;
    }
    exports.Vector2d = Vector2d;

    exports.version = "1.0.5";
});
/* vim: set sw=4 ts=4 et tw=80 : */
