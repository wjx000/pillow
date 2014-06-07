//old demo need pillow
;(function(global,P){
  var Timer = P.Timer;
  /* static */
  var WIDTH = 800;
  var HEIGHT = 600;
  var BACKGROUND_WIDTH = 2418;
  var canvas, ctx;
  var backgroundImage1;
  var backgroundImage2;
  var offsetX1 = 0;
  var offsetX2;
  var background1 = 'background_1.png';
  var background2 = 'background_2.png';
  var player1_pic = 'sprite.png';
  var player1;
  var dialog = true;
  var Loop = true;
  var LoopY = 1;
  var pos = 0;
  var backgroundSound2;
  var shadow;
  var jumped;
  var isFirst = true;
  var background;
  var back = background1;
  function spriteClass(cfg){
    this.image = cfg.image;
    this.offsetX = cfg.offsetX;
    this.offsetY = cfg.offsetY;
    this.width = cfg.width;
    this.height = cfg.height;
    this.NumX = cfg.NumX-1;
    this.NumY = cfg.NumY-1;
    this.loop = cfg.loop;
    this.x = 0;
    this.y = 0;
  }
  spriteClass.prototype = {
    jump:function(){
      var that = this;
      if(that.x == that.NumX){
        if(that.y == that.NumY){
          if(that.loop){
            that.x = 0;
            that.y = 0;
          }
        }else {
          that.x = 0;
          that.y++;
        }
      }else {
        that.x++;
      }
    }
  };
  var player1_pic_obj = new Image();
  player1_pic_obj.src = player1_pic;
  player1_pic_obj.onload = function() {}
  player1_pic_obj.onerror = function() {
    console.log('Error');
  }
  function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  function drawShadow(){
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.fillStyle='rgba(100, 100, 0, 0.2)';
    ctx.fillRect(0, 0,  ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle="rgba(100, 100, 100, 0)";
    ctx.rect(0, 0,  ctx.canvas.width, ctx.canvas.height);
    ctx.stroke();
  }
  function drawScene() {
    clear();
    if(isFirst){
      offsetX1 += 1;
      if(offsetX1 == BACKGROUND_WIDTH - WIDTH){
        isFirst = false;
        offsetX2 = BACKGROUND_WIDTH/2 - WIDTH;
      }
      ctx.drawImage(backgroundImage1,offsetX1, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
    }else{
      background = back == background1?backgroundImage2:backgroundImage1;
      offsetX2 += 1;
      if(offsetX2 == BACKGROUND_WIDTH - WIDTH){
        offsetX2 = BACKGROUND_WIDTH/2 - WIDTH;
        back = back == background1?background2:background1;
      }
      ctx.drawImage(background,offsetX2, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
    }
    drawDialog();
    drawPlayer();
    drawPlayerJump();
    if(shadow){
      drawShadow();
    }
  }
  function drawDialog(){
    if(!dialog){
      return;
    }
    drawText();
    var _w = 400,
        _h = 250,
        _x = WIDTH/2-_w/2,
        _y = HEIGHT/2-_h/2;
    ctx.beginPath();
    ctx.lineWidth=20;
    ctx.fillStyle='rgba(209, 209, 209, 0.4)';
    ctx.fillRect(_x,_y,_w,_h);
    ctx.strokeStyle="rgba(100, 100, 100, 0.6)";
    ctx.rect(_x,_y,_w,_h);
    ctx.stroke();
  }
  function Player(cfg){
    this.image = cfg.image;
    this.width = cfg.width;
    this.height = cfg.height;
  }
  var player1Arr = [[83,114,49,101,125.5,99.5,49,101],[259,113.33333333333334,50,103,123,98.5,50,103],[434.6666666666667,114,53,101,120.5,99.5,53,101],[610.3333333333334,114,56,101,118,99.5,56,101]];
  var player1Jump = [[77,348.6666666666667,67,85,116.5,107.5,67,85],[270.3333333333333,312.6666666666667,37,105,131.5,97.5,37,105],[430.3333333333333,284,58,130,121,85,58,130],[599.3333333333334,261,74,123,113,88.5,74,123]];
  var j = 0;
  function drawPlayer(){
    if(shadow){
      return;
    }
    if(j == player1Arr.length-1){
      j = 0;
    }else{
      j ++;
    }
    var arr = player1Arr[j];
    ctx.drawImage(player1_pic_obj, arr[0],arr[1],arr[2],arr[3],arr[4]+10,arr[5]+200,arr[6],arr[7]);
  }
  function drawPlayerJump(){
    if(jumped){
      var arr = player1Jump[player1Jump.length-1];
      ctx.drawImage(player1_pic_obj, arr[0],arr[1],arr[2],arr[3],arr[4]+10,arr[5]+200,arr[6],arr[7]);
      return;
    }
    if(shadow){
      if(j == player1Jump.length-1){
        j = 0;
      }else{
        j ++;
      }
      var arr = player1Jump[j];
      ctx.drawImage(player1_pic_obj, arr[0],arr[1],arr[2],arr[3],arr[4]+10,arr[5]+200,arr[6],arr[7]);
      jumped = true;
    }
  }
  function drawText(){
    var _w = 400,
        _h = 250,
        _x = WIDTH/2-_w/2 +30,
        _y = HEIGHT/2-_h/2 + 130;
    ctx.font="30px Verdana";
    var gradient=ctx.createLinearGradient(0,0,20,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("1.0","black");
    ctx.fillStyle=gradient;
    ctx.fillText('click',_x,_y);
  }
  // init
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  backgroundImage1 = new Image();
  backgroundImage1.src = background1;
  backgroundImage1.onload = function() {}
  backgroundImage1.onerror = function() {
    console.log('Error');
  }
  backgroundImage2 = new Image();
  backgroundImage2.src = background2;
  backgroundImage2.onload = function() {}
  backgroundImage2.onerror = function() {
    console.log('Error');
  }
  plater1Audio = new Audio('player1.wav');
  plater1Audio.volume = 1;
  plater1Audio.addEventListener('ended', function(e) {
    backgroundSound2.play();
  }, false);
  canvas.addEventListener('click', function(e) {
    e.preventDefault()
    dialog = !dialog;
  shadow = true;
  Loop = false;
  plater1Audio.play();
  backgroundSound.pause();
  })
  backgroundSound = new Audio('background.mp3');
  backgroundSound.volume = 0.4;
  backgroundSound.addEventListener('ended', function(e) {
    this.currentTime = 0;
    this.play();
  }, false);
  backgroundSound2 = new Audio('background.wav');
  backgroundSound2.volume = 1;
  backgroundSound2.addEventListener('ended', function(e) {
    this.currentTime = 0;
    this.play();
  }, false);
  backgroundSound.play();
  var timer = new Timer(function(){
    drawScene();
  });
  timer.start();
})(window, pillow)
