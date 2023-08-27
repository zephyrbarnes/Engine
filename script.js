var Bite = function(x,y,z,w) { return {x:x,y:y,z:z,w:w}; }

class Trig { constructor(b1, b2, b3) { this.color = "#ff0000"; this.b = [b1, b2, b3]; }}

class Face { constructor(b1, b2, b3, b4) { this.color = 'rgba(0, 150, 255, 0.3)'; this.b = [b1, b2, b3, b4]; }}

class Cube { constructor(x, y, z) { this.cord = new Bite(x,y,z,0); this.rote = new Bite(0,0,0,0); this.color;
  this.b = [new Bite(-1,-1, 1, 1),new Bite(-1,-1,-1, 1),new Bite( 1,-1,-1, 1),new Bite( 1,-1, 1, 1),
            new Bite( 1, 1, 1, 1),new Bite( 1, 1,-1, 1),new Bite(-1, 1,-1, 1),new Bite(-1, 1, 1, 1)];
  this.f = [new Face(this.b[0], this.b[1], this.b[2], this.b[3]),
            new Face(this.b[3], this.b[2], this.b[5], this.b[4]),
            new Face(this.b[4], this.b[5], this.b[6], this.b[7]),
            new Face(this.b[7], this.b[6], this.b[1], this.b[0]),
            new Face(this.b[7], this.b[0], this.b[3], this.b[4]),
            new Face(this.b[1], this.b[6], this.b[5], this.b[2])];
}}

function d(n) { return parseFloat(n.toFixed(3)); }
function Rotates(b, r) { var x = r.x * dg, y = r.y * dg, z = r.z * dg;
  var c = cos, s = sin, cx = c(x), cy = c(y), cz = c(z), sx = s(x), sy = s(y), sz = s(z);
  let a = [[ cz*cy,-sz*cx + cz*sy*sx, sz*sx + cz*sy*cx, 0],
           [ sz*cy, cz*cx + sz*sy*sx,-cz*sx + sz*sy*cx, 0],
           [  -sy ,      cy*sx      ,      cy*cx      , 0],
           [   0  ,        0        ,        0        , 1]];
  return multBit(b, a);
}

function multBit(b,a) {
  let rX = b.x*a[0][0] + b.y*a[0][1] + b.z*a[0][2] + b.w*a[0][3];
  let rY = b.x*a[1][0] + b.y*a[1][1] + b.z*a[1][2] + b.w*a[1][3];
  let rZ = b.x*a[2][0] + b.y*a[2][1] + b.z*a[2][2] + b.w*a[2][3];
  let rW = b.x*a[3][0] + b.y*a[3][1] + b.z*a[3][2] + b.w*a[3][3];
  return new Bite(rX,rY,rZ,rW);
}
function multPrj(b) { var p = new Bite(0,0,0), w; var m = proj;
  x = b.x*m[0][0] + b.y*m[1][0] + b.z*m[2][0] + m[3][0]; x = d(x);
  y = b.x*m[0][1] + b.y*m[1][1] + b.z*m[2][1] + m[3][1]; y = d(y);
  z = b.x*m[0][2] + b.y*m[1][2] + b.z*m[2][2] + m[3][2]; z = d(z);
    w = b.x*m[0][3] + b.y*m[1][3] + b.z*m[2][3] + m[3][3]; w = d(w); if(w != 0) { x /= w; y /= w; z /= w; }
    p.x = d(x), p.y = d(y), p.z = d(z), p.w = w; return p;
}
function Project(f) { var fv = 1/tan(f*dg), fv = d(fv), zd = far/(far-nie), zd = d(zd); return [[ch*fv/cw,0,0,0],[0,fv,0,0],[0,0,zd,1],[0,0,-nie*zd,0]]; }
function drawPoly(t, face) { var f = [];
  for(let p of face.b) { f.push({ x:p.x, y:p.y, z:p.z, w:p.w }); }
  for(let i = 0; i < f.length; i++) {
    f[i] = Rotates(f[i],t.rote);
    f[i].x += t.cord.x; f[i].y += t.cord.y; f[i].z += t.cord.z;
    f[i] = multPrj(f[i]);
    f[i].x *= cx; f[i].y *= cy;
    f[i].x = d(f[i].x), f[i].y = d(f[i].y); }
  Line(f); ctx.fillStyle = face.color;
  ctx.stroke(); ctx.fill();
}

function Line(a) {ctx.beginPath(); ctx.moveTo(a[0].x + cx, a[0].y + cy);
  for (let i = 0; i < a.length; i++) { ctx.lineTo(a[i].x + cx, a[i].y + cy); }
  ctx.lineTo(a[0].x + cx, a[0].y + cy); ctx.closePath();
}

function drawObj(item) {
  for(let i = 0; i < item.f.length; i++) { drawPoly(item, item.f[i]); }
}

var c = document.getElementById('cnv'), ctx = c.getContext('2d');
var cw = c.width = window.innerWidth, ch = c.height = window.innerHeight, cx = cw/2, cy = ch/2;
ctx.strokeStyle = "#000000"
var cos = Math.cos, sin = Math.sin, tan = Math.tan,
    pi = Math.PI, tu = 2 * pi, dg = pi / 180;
    fov = 70, nie = 0.01, far = 10, proj = Project(fov);
var demoCube = new Cube(0,0,5);

function tick() {
  console.log("tick");
  proj = Project(fov);
  ctx.clearRect(0,0,cw,ch);
  demoCube.rote.y ++;
  drawObj(demoCube);
}

var tickID = setInterval(tick,30);
window.addEventListener('beforeunload', function (e) {
  clearInterval(tickID); console.log("close");
});