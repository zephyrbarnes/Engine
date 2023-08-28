var V = function(x,y,z) { return { x:x||0,y:y||0,z:z||0 }; }
var T = function(a,b,c) { this.color = 'rgba(0, 150, 255, 0.3)'; this.B = [a,b,c]; }
var C = function(S,R,C) { this.S = S||new V; this.R = R||new V; this.C = C||new V; this.B = []; this.F = []; var B = [];
    this.B.push(new V(-1,-1,-1),new V(-1, 1,-1),new V( 1, 1,-1),new V( 1,-1,-1),new V( 1,-1, 1),new V( 1, 1, 1),new V(-1, 1, 1),new V(-1,-1, 1)); B = this.B;
    this.F.push(new T(B[1],B[6],B[5]),new T(B[1],B[5],B[2]),new T(B[0],B[1],B[2]),
                new T(B[0],B[2],B[3]),new T(B[3],B[2],B[5]),new T(B[3],B[5],B[4]),
                new T(B[7],B[0],B[3]),new T(B[7],B[3],B[4]),new T(B[4],B[5],B[6]),
                new T(B[4],B[6],B[7]),new T(B[7],B[6],B[1]),new T(B[7],B[1],B[0]));
}
function pF(n,p) { n = parseFloat(n.toFixed(p)); return n; } function pV(V,p) { V.x = pf(V.x,p); V.y = pF(V.y,p); V.z = pF(V.z,p); }
var cnv = document.getElementById('cnv'), ctx = cnv.getContext('2d');
var cw = cnv.width = window.innerWidth, ch = cnv.height = window.innerHeight;
const c=Math.cos, s=Math.sin, abs=Math.abs, rt=Math.sqrt, π=Math.PI, dg=π/180;
var nie=0.01, far=1, fov=90;
function calcVew() { fov = 1/Math.tan(fov*dg); pF(fov,1); zed = far/(far-nie); pF(zd,1); nie = -nie*zed; pF(nie,1); } calcVew();
function project(V) { var x = V.x*ch*fov/cw, y = V.y*fov, z = V.z*zed + 1, w = nie*V.z; if(w != 0) { x/=w, y/=w, z/=w; } return new V(x,y,z); }