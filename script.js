var Bite = function(x,y,z) { return {x:x,y:y,z:z}; }
class Trig { constructor(b1, b2, b3) { this.color = "#ff0000"; this.b = [b1, b2, b3]; }}
class Face { constructor(b1, b2, b3, b4) { this.color = "#ff0000"; this.b = [b1, b2, b3, b4]; }}
class Cube { constructor(x, y, z) { this.cord = new Bite(x,y,z); this.rote = new Bite(x,y,z); this.color;
  this.b = [new Bite( 1, 1, 1), new Bite(-1, 1, 1),
            new Bite(-1,-1, 1), new Bite( 1,-1, 1),
            new Bite( 1,-1,-1), new Bite(-1,-1,-1),
            new Bite(-1, 1,-1), new Bite( 1, 1,-1)];
  this.f = [new Face(this.b[0], this.b[1], this.b[2], this.b[3]),
            new Face(this.b[2], this.b[3], this.b[4], this.b[5]),
            new Face(this.b[4], this.b[5], this.b[6], this.b[7]),
            new Face(this.b[7], this.b[0], this.b[3], this.b[5]),
            new Face(this.b[0], this.b[1], this.b[6], this.b[7]),
            new Face(this.b[1], this.b[2], this.b[5], this.b[6])];
}}

function d(n) { return parseFloat(n.toFixed(2)); }
function Project(f) { var fv = 1/tan(f*dg), fv = d(fv), zd = far/(far-nie), zd = d(zd); return [[ch*fv/cw,0,0,0],[0,fv,0,0],[0,0,zd,1],[0,0,-nie*zd,0]]; }
function Rotates(c,b) { var p = new Bite(0,0,0); }
function multPrj(b) { var p = new Bite(0,0,0), w; var m = Project(fov);
  p.x = b.x*m[0][0] + b.y*m[1][0] + b.z*m[2][0] + m[3][0]; p.x = d(p.x);
  p.y = b.x*m[0][1] + b.y*m[1][1] + b.z*m[2][1] + m[3][1]; p.y = d(p.y);
  p.z = b.x*m[0][2] + b.y*m[1][2] + b.z*m[2][2] + m[3][2]; p.z = d(p.z);
    w = b.x*m[0][3] + b.y*m[1][3] + b.z*m[2][3] + m[3][3]; w = d(w); if(w != 0) { p.x /= w; p.y /= w; p.z /= w; }
    p.x = d(p.x), p.y = d(p.y), p.z = d(p.z); return p;
}
function Line(a) {ctx.beginPath(); ctx.moveTo(a[0].x + cx, a[0].y + cy);
  for (let i = 1; i < a.length; i++) { ctx.lineTo(a[i].x + cx, a[i].y + cy); }
  ctx.lineTo(a[0].x + cx, a[0].y + cy); ctx.closePath();
}
function drawPoly(item, face) { var fake = [];
  for(let p of face.b) { fake.push({ x:p.x, y:p.y, z:p.z }); }
  for(let p of fake) { p.z += 1; }
  for(let i = 0; i < fake.length; i++) { fake[i] = multPrj(face.b[i]); }
  for(let p of fake) { p.x *= 0.5 *cx; p.y *= 0.5 *cy; p.x = d(p.x), p.y = d(p.y); console.log(p);}
  Line(fake); ctx.fillStyle = face.color;
  ctx.stroke(); ctx.fill();
}

function drawObj(item) { for (let i = 0; i < item.f.length; i++) { drawPoly(item, item.f[i]); }}
  

var c = document.getElementById('cnv'), ctx = c.getContext('2d');
var cw = c.width = window.innerWidth, ch = c.height = window.innerHeight, cx = cw/2, cy = ch/2;
ctx.strokeStyle = "#000000"
var cos = Math.cos, sin = Math.sin, tan = Math.tan,
    fov = 70, nie = 0.01, far = 10,
    pi = Math.PI, tu = 2 * pi, dg = tu / 360;
var demoCube = new Cube(0,0,0);
var fuce = new Face(new Bite( 1, 1, 1),new Bite(-1, 1, 1),new Bite(-1,-1, 1),new Bite( 1,-1, 1));

function tick() {
  console.log("tick");
  ctx.clearRect(0,0,cw,ch);
  drawObj(demoCube);
}

var tickID = setInterval(tick,30);
window.addEventListener('beforeunload', function (e) {
  clearInterval(tickID); console.log("close");
});