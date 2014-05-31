/*dafeng 随意demo*/
;(function(global,P){
  var m = [];
    m.push('http://gtms01.alicdn.com/tps/i1/T1gV5KFEJjXXb96jso-290-290.jpg');
    m.push('https://avatars3.githubusercontent.com/u/1011681?s=290');
  var SourceLoader = P.SourceLoader;
  var Util = P.Util;
  var math = P.Math;
  var Img = m[math.random(0,1)];
  var col = 3;
  var elm = Util.$('puzzle');
  var width = elm.width;
  var img;
  var ctx = elm.getContext('2d');
  var row = width/col;
  var pos1 = {
    x:0,
    y:0
  };
  var pos2 = {
    x:0,
    y:0
  };
  var query = new Array(col);
  var old = new Array(col);
  elm.addEventListener("mousemove", function (e) {
    var target = e.target;
    pos1.x = Math.floor((e.pageX - target.offsetLeft)/row);
    pos1.y = Math.floor((e.pageY - target.offsetTop)/row);
  });
  elm.addEventListener("click", function () {
    check();
  });
  function check(){
    var distance = Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
    if (distance == 1) {
      updatePosition(pos2, pos1);
      updateStage();
    }
  }
  function clear(){
    ctx.clearRect(0, 0, width, width);
  }
  function updateStage() {
    clear();
    for (var i = 0; i < col; i++) {
      for (var j = 0; j < col; j++) {
        var x = query[i][j].x;
        var y = query[i][j].y;
        if (i != pos2.x || j != pos2.y ) {
          ctx.drawImage(img, x * row, y * row, row, row,i * row, j * row, row, row);
        }
      }
    }
  }
  function updatePosition(offset1, offset2) {
    query[offset1.x][offset1.y].x = query[offset2.x][offset2.y].x;
    query[offset1.x][offset1.y].y = query[offset2.x][offset2.y].y;
    query[offset2.x][offset2.y].x = col - 1;
    query[offset2.x][offset2.y].y = col - 1;
    offset1.x = offset2.x;
    offset1.y = offset2.y;
  }
  function init(source) {
    img = source;
    for (var i = 0; i < col; i++) {
      query[i] = new Array(col);
      old[i] = new Array(col);
      for (var j = 0; j < col; j++) {
        query[i][j] = {};
        query[i][j].x = col-1-i;
        query[i][j].y = col-1-j;
        old[i][j] = {};
        old[i][j].x = i;
        old[i][j].y = j;
      }
    }
    pos2.x = query[col-1][col-1].x;
    pos2.y = query[col-1][col-1].y;
    updateStage();
  }
  var loader = new SourceLoader();
  loader.load([{
    id:'puzzle',
    src:Img
  }]);
  loader.on('success',function(i){
    init(i['puzzle'].image);
  });
})(window,pillow)
