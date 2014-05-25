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
