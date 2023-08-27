var Bite = function(x,y,z,w) { return {x:x||0,y:y||0,z:z||0,w:w||0}; }

class Trig { constructor(b1, b2, b3) { this.color = "#ff0000"; this.b = [b1, b2, b3]; }}
class Face { constructor(b1, b2, b3, b4) { this.color = 'rgba(0, 150, 255, 0.3)'; this.b = [b1, b2, b3, b4]; }}
class Cube { constructor(x, y, z) { this.c = new Bite(x,y,z); this.r = new Bite(); this.s = new Bite(); this.color;
  this.b = [new Bite(-1,-1,-1, 1),new Bite(-1, 1,-1, 1),new Bite( 1, 1,-1, 1),new Bite( 1,-1,-1, 1),
            new Bite( 1,-1, 1, 1),new Bite( 1, 1, 1, 1),new Bite(-1, 1, 1, 1),new Bite(-1,-1, 1, 1)];
  this.f = [new Face(this.b[0], this.b[1], this.b[2], this.b[3]), /*Front*/ new Face(this.b[1], this.b[6], this.b[5], this.b[2]), /*Right*/
            new Face(this.b[3], this.b[2], this.b[5], this.b[4]), /*Above*/ new Face(this.b[4], this.b[5], this.b[6], this.b[7]), /*Backs*/
            new Face(this.b[7], this.b[0], this.b[3], this.b[4]), /*Below*/ new Face(this.b[7], this.b[6], this.b[1], this.b[0])];/*Lefts*/
}}
class Camera { constructor(c,r) {this.c = c; this.r = r; }}
function d(n,d) { n = parseFloat(n.toFixed(d)); return n; }
function db(n,p) { n.x = d(n.x,p); n.y = d(n.y,p); n.z = d(n.z,p); return n; }
function Rotates(b,r) {
  const [x,y,z] = [r.x*dg,r.y*dg,r.z*dg], [cx,cy,cz,sx,sy,sz] = [c(x),c(y),c(z),s(x),s(y),s(z)];
  let a = [[cz*cy,-sz*cx + cz*sy*sx, sz*sx + cz*sy*cx, 0],[sz*cy, cz*cx + sz*sy*sx,-cz*sx + sz*sy*cx, 0],[-sy , cy*sx, cy*cx, 0],[0, 0, 0, 1]];
  return multBit(b, a);
}
function multBit(b,a) {
  var r = [0,0,0,0];
  for(let i=0; i < 4; i++) { r[i] = b.x*a[i][0] + b.y*a[i][1] + b.z*a[i][2] + b.w*a[i][3]; d(r[i],2); } r[3] = abs(r[3]);
  return new Bite(r[0], r[1], r[2], r[3]);
}
function Project(f) { var fv = 1/tan(f*dg); d(fv,2); zd = far/(far-nie); d(zd,2); return [[ch*fv/cw,0,0,0],[0,fv,0,0],[0,0,zd,1],[0,0,-nie*zd,0]]; }
function multPrj(b,m) { var p = multBit(b,m); if(p.w != 0) { p.x /= p.w; p.y /= p.w; p.z /= p.w; } db(p,2); return p; }
function Translt(b,p) { b.x += p.x, b.y += p.y, b.z += p.z; return b; }
function Normals(f) {
  const [n1,n2,n3] = [f[0],f[1],f[2]],
        [v1,v2,v3,v4,v5,v6] = [n2.y-n1.y,n3.z-n2.z,n2.z-n1.z,n3.y-n2.y,n3.x-n2.x,n2.x-n1.x];
  var nl = new Bite(v1*v2 - v3*v4, v3*v5 - v6*v2, v6*v4 - v1*v5);
  n = nl.x*nl.x + nl.y*nl.y + nl.z*nl.z; if(n < 1e-2) return new Bite();
  n = rt(n); nl.x/=n, nl.y/=n, nl.z/=n; db(nl,2); return nl;
}
function drawPoly(t, face) {
  var f = [];
  for(let p of face.b) { f.push({ x:p.x, y:p.y, z:p.z, w:p.w }); }
  var fl = f.length;
  for(let i = 0; i < fl; i++) { f[i] = Rotates(f[i],t.r); f[i] = Translt(f[i],t.c); }
  var cm = Translt(f[0],new Bite(-cam.c.x,-cam.c.y,-cam.c.z)), nl = Normals(f); nf = nl.x*cm.x + nl.y*cm.y + nl.z*cm.z;
  if(nf < 0) { for(let i = 0; i < fl; i++) {
      f[i] = multPrj(f[i],proj);
      f[i].x *= cx/10; f[i].y *= cy/10;
      d(f[i].x,2), d(f[i].y,2);
    }
  Line(f); ctx.fillStyle = face.color;
  ctx.stroke(); ctx.fill();
  }
}

function Line(a) {ctx.beginPath();
  ctx.moveTo(a[0].x + cx, a[0].y + cy);
  for (let i = 0; i < a.length; i++) { ctx.lineTo(a[i].x + cx, a[i].y + cy); }
  ctx.lineTo(a[0].x + cx, a[0].y + cy); ctx.closePath();
}

function drawObj(item) { for(let i = 0; i < item.f.length; i++) { drawPoly(item, item.f[i]); }}

var cnv = document.getElementById('cnv'), ctx = cnv.getContext('2d');
var cw = cnv.width = window.innerWidth, ch = cnv.height = window.innerHeight, cx = cw/2, cy = ch/2;
ctx.strokeStyle = "#000000"
var c = Math.cos, s = Math.sin, tan = Math.tan, abs = Math.abs, rt = Math.sqrt,
    pi = Math.PI, tu = 2 * pi, dg = pi / 180;
    fov = 70, nie = 0.01, far = 100;
var proj = Project(fov);
var demoCube = new Cube(0,0,10);
var cam = new Camera(new Bite(), new Bite());

function tick() {
  console.log("tick");
  ctx.clearRect(0,0,cw,ch);
  demoCube.r.x ++; demoCube.r.y ++;
  drawObj(demoCube);
}

var tickID = setInterval(tick,30);
window.addEventListener('beforeunload', function (e) {
  clearInterval(tickID); console.log("close");
});