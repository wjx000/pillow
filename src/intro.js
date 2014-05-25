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
