const f = false;
class keyHandler {
  keyState = {
                     87: f, /*W KEY*/
    65: f, /*A KEY*/ 83: f, /*S KEY*/ 68: f, /*D KEY*/
    32: f, /*SPACE*/					38: f, /*ABOVE*/
    37: f, /*LEFTS*/ 40: f, /*BELOW*/ 39: f, /*RIGHT*/
    13: f  /*ENTER*/
  };
  pass(e, isPressed) { if (e.which in this.keyState) { this.keyState[e.which] = isPressed; e.preventDefault(); } }
  key(keyCode) { return this.keyState[keyCode]; }
}

document.addEventListener('keydown', (e) => keyH.pass(e, true));
document.addEventListener('keyup', (e) => keyH.pass(e, false));

//var keyH = new keyHandler(), key = keyH.keyState;
cnv.addEventListener("mousemove", function(e) {
  var deltaX = e.clientX - prevMouseX;
  var deltaY = e.clientY - prevMouseY;
  prevMouseX = e.pageX;
  prevMouseY = e.pageY;
  cam.r.y += deltaX * rotateSpeed;
  cam.r.x += deltaY * rotateSpeed;

  cam.r.x = Math.max(Math.min(cam.r.x, 90), -90);
});
var moveSpeed = 0.1, rotateSpeed = 0.5;
var prevMouseX = 0, prevMouseY = 0;


function keysCheck() {
  if (!key[87] && key[83] || key[87] && !key[83]) {
    if (key[87]) cam.c.z += moveSpeed;
    if (key[83]) cam.c.z -= moveSpeed;
  }
  if (!key[65] && key[68] || key[65] && !key[68]) {
    if (key[65]) cam.c.x -= moveSpeed;
    if (key[68]) cam.c.x += moveSpeed;
  }
}