const fs = false, tr = true;
class keyHandler {
  keyState = {
                      87: fs, /*W KEY*/
    65: fs, /*A KEY*/ 83: fs, /*S KEY*/ 68: fs, /*D KEY*/
    32: fs, /*SPACE*/					38: fs, /*ABOVE*/
    37: fs, /*LEFTS*/ 40: fs, /*BELOW*/ 39: fs, /*RIGHT*/
    13: fs  /*ENTER*/
  };
  pass(e, isPressed) { if (e.which in this.keyState) { this.keyState[e.which] = isPressed; e.preventDefault(); } }
  key(keyCode) { return this.keyState[keyCode]; }
}

document.addEventListener('keydown', (e) => keyH.pass(e, true));
document.addEventListener('keyup', (e) => keyH.pass(e, false));

var keyH = new keyHandler(), key = keyH.keyState;
cv.addEventListener("mousemove", function(e) {
  var deltaX = e.clientX - prevMouseX;
  var deltaY = e.clientY - prevMouseY;
  //camera.R.y += deltaX * rotateSpeed;
  //camera.R.x += deltaY * rotateSpeed;

  //camera.R.x = Math.max(Math.min(camera.R.x, 90), -90);
});
var moveSpeed = 2, rotateSpeed = 0.5;
var prevMouseX = 0, prevMouseY = 0;


function keysCheck() {
  if (!key[87] && key[83] || key[87] && !key[83]) {a
    if (key[87]) camera.T = addVector(camera.T, camera.S);
    if (key[83]) camera.T = subVector(camera.T, camera.S);
  }
  if (!key[65] && key[68] || key[65] && !key[68]) {
    if (key[65]) camera.R.y -= 0.001;
    if (key[68]) camera.R.y += 0.001;
  }
}