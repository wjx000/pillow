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
