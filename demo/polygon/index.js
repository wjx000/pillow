;(function(global, P){
  var Timer = P.Timer;
  var canvas,ctx;
  var circles = [];
  var selected;
  //static
  var WIDTH = 800;
  var HEIGHT = 600;
  var COUNT = 5;
  var RADIUS = 15;

  //constructor
  function Circle(x, y, r){
    this.x = x;
    this.y = y;
    this.radius = r;
  }
  function drawCircle(ctx, x, y, r) {
    if(!arguments[3]){
      var r = 10;
    }
    ctx.fillStyle = '#eee';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
  function drawHover(){
    for (var i=0; i<circles.length; i++) {
      drawCircle(ctx, circles[i].x, circles[i].y);
    }
  }
  function clear() {
    ctx.clearRect(0, 0,WIDTH,HEIGHT);
  }
  function updateScence(){
    clear();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 0, 0.6)';
    ctx.moveTo(circles[0].x, circles[0].y);
    for (var i=0; i<circles.length; i++) {
      ctx.lineTo(circles[i].x, circles[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(110, 110, 110, 0.2)';
    ctx.stroke();
    drawHover();
  }

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  //draw
  for (var i=0; i<COUNT; i++) {
    var x = Math.random()*WIDTH;
    var y = Math.random()*HEIGHT;
    circles.push(new Circle(x,y,RADIUS));
  }
  //bindEvent
  canvas.addEventListener('mousedown', function(e){
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    for (var i=0; i<circles.length; i++) {
      var circleX = circles[i].x;
      var circleY = circles[i].y;
      var radius = circles[i].radius;
      if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
        selected = i;
        break;
      }
    }
  }, false);
  canvas.addEventListener('mousemove', function(e) {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    if (selected) {
      var radius = circles[selected].radius;
      circles[selected] = new Circle(mouseX, mouseY,radius);
    }
  });
  canvas.addEventListener('mouseup', function(e) {
    selected = null;
  });
  var timer = new Timer(function(){
    updateScence();
  });
  timer.start();
})(window, pillow);
