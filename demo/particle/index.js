(function(global,P){
  var canvas = document.getElementById("canvas");
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var ctx = canvas.getContext("2d");
  var SourceLoader = P.SourceLoader;
  var Timer = P.Timer;
  function position(x, y) {
    return  Math.round(x) - Math.round(y) * WIDTH;
  };
  function randomSpeed(){
    return parseInt(Math.random()*6-2);
  }
  var now;
  var query = [];
  var start = false;
  var loader = new SourceLoader();
  loader.load([{
    id:'avatar',
    src:'avatar.png'
  }]);
  loader.on('success',function(e){
    var source = e['avatar'].image;
    ctx.drawImage(source, 0, 0);
    var cache = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = cache.data;
    var tempData = temp.data;
    var preprocess = function(){
      for(var i=0;i<data.length;i++){
        if(i%4 == 3){
          var x = parseInt(i/4);
          query.push({
            rgba:[data[i-3],data[i-2],data[i-1],data[i]],
            x:x,
            y:-parseInt(x/WIDTH),
            sx:randomSpeed(),
            sy:randomSpeed()
          });
        }
      }
    }
    preprocess();
    var handle = function(){
      if(start){
        return;
      }
      start = true;
      var timer = new Timer(function(){
        for(var i =0;i<query.length;i++){
          var d = query[i];
          d.x += d.sx;
          d.y -= d.sy;
          var pos = position(d.x,d.y);
          tempData[pos*4] = d.rgba[0];
          tempData[pos*4 + 1] = d.rgba[1];
          tempData[pos*4 + 2] = d.rgba[2];
          d.rgba ==0 ? d.rgba =0 : d.rgba[3]--;
          tempData[pos*4 + 3] = d.rgba[3];
        }
        ctx.putImageData(temp, 0, 0);
      });
      timer.start();
    }
    canvas.addEventListener("mouseenter",handle, false);
    setTimeout(function(){
      handle();
    },3000);
  });
})(window,pillow)
