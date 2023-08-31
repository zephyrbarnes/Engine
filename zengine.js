class V { constructor(x=0,y=0,z=0,w=1) { this.x = x; this.y = y; this.z = z; this.w = w; }}

class T { constructor(a, b, c, d) { this.V = d ? [a, b, c, d] : [a, b, c]; this.color = 'rgba(0, 150, 255, 0.3)'; }
    *[Symbol.iterator]() { for (let v of this.V) { yield v; }}}

class Cube { constructor(T=new V,S=0, R=new V) { this.S = S; /*Scale*/ this.R = R; /*Rotation*/ this.T = T; /*Coord*/ this.B = [ /*Array of all 8 cube vertices*/
    new V(-1,-1,-1), new V(-1, 1,-1), new V( 1, 1,-1), new V( 1,-1,-1),new V( 1,-1, 1), new V( 1, 1, 1), new V(-1, 1, 1), new V(-1,-1, 1)]; this.F =[ //Face array
        new T(0, 1, 2, 3), /*Front*/ new T(1, 6, 5, 2), /*Right*/ new T(3, 2, 5, 4), /*Above*/
        new T(4, 5, 6, 7), /*Backs*/ new T(7, 0, 3, 4), /*Below*/ new T(0, 7, 6, 1)];/*Lefts*/
}}

class Mesh { constructor(path, T=new V,S=1, R=new V) { this.S = S; this.R = R; this.T = T;
    this.B = []; this.F = []; this.path = path; this.populate(); }
    populate() { loadTextFile(this.path).then( txt => { if (txt !== null) {
        var vNum = []; const lines = txt.split("\n");
        for(let vecLine of lines) { let yarn = vecLine.split(" ");
            if(yarn[0] == "v") { this.B.push(new V(parseFloat(yarn[1]),parseFloat(yarn[2]),parseFloat(yarn[3]))); }
            else if(yarn[0] == "f") { for(let i=1; i < yarn.length; i++) { vNum.push(parseFloat(yarn[i])-1); }
                this.F.push(new T(...vNum));
                vNum = [];
            }
        }
    }});}
}

class Worlds { constructor(S = new V(1,1,1), R = new V, T = new V) { this.S = S, this.R = R, this.T = T; this.M = this.updateMatrix(); this.objects = []; }
    updateMatrix() {
        const scale = scaleMatrix(this.S.x,this.S.y,this.S.z);
        const xAxis = matrix_matrix(xAxisRotate(this.R.x),scale);
        const zAxis = matrix_matrix(zAxisRotate(this.R.z),xAxis);
        const yAxis = matrix_matrix(yAxisRotate(this.R.y),zAxis);
        const trans = matrix_matrix(translateMatrix(this.T.x,this.T.y,this.T.z),yAxis,);
        return trans;
    }
}

class Camera { constructor(rate, T=new V,R = new V) { this.rate = rate; this.T = T; this.R = R;
    this.P = new V(0,0,1,0); this.D = matrix_vector(this.P,yAxisRotate(this.R.y)); this.S = multiplyV(this.P, this.rate); this.U = new V(0,1,0,0); }
    rerate(rate) { this.rate = rate; this.S = multiplyV(this.D, this.rate); }
    update() { var
        rotate = yAxisRotate(this.R.y);
		this.D = matrix_vector(this.P, rotate);
		this.P = addVector(this.T, this.D);
    }
}
async function loadTextFile(fl) { try{ const rt = await fetch(fl); if(!rt.ok) { throw new Error(); } const txt = await rt.text(); return txt;}catch(er){ console.error(er); return null; }}

var scaleMatrix = function(x=1,y=1,z=1) { return [[x,0,0,0],[0,y,0,0],[0,0,z,0],[0,0,0,1]]; };
var xAxisRotate = function(a) { a = a*dg; return [[1,0,0,0],[0,c(a),s(a),0],[0,-s(a),c(a),0],[0,0,0,1]]; }
var yAxisRotate = function(a) { a = a*dg; return [[c(a),0,s(a),0],[0,1,0,0],[-s(a),0,c(a),0],[0,0,0,1]]; }
var zAxisRotate = function(a) { a = a*dg; return [[c(a),s(a),0,0],[-s(a),c(a),0,0],[0,0,1,0],[0,0,0,1]]; }
var translateMatrix = function(x,y,z) { return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[x,y,z,1]]; }
var empty = function() { return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; }

function addVector(v,a) { const x = pF(v.x + a.x), y = pF(v.y + a.y), z = pF(v.z + a.z), w = pF(v.w + a.w); return new V(x,y,z,w); }
function subVector(v,s) { const x = pF(v.x - s.x), y = pF(v.y - s.y), z = pF(v.z - s.z), w = pF(v.w - s.w); return new V(x,y,z,w); }
function multiplyV(v,g) { if(g.type != V) { if(g === 0) { g=1; } return new V(v.x*g,v.y*g,v.z*g); }else{ return new V(v.x*g.x,v.y*g.y,v.z*g.z); }}
function crossProduct(v,u) { return new V(v.y*u.z - v.z*u.y,v.z*u.x - v.x*u.z,v.x*u.y - v.y*u.x, v.w*u.w - v.w*u.w); }
function dotProduct(v,b) { return v.x*b.x + v.y*b.y + v.z*b.z; }
function pF(n) { return parseFloat(n.toFixed(4)); }


var projectMatrix = function() { let r = ch/cw, z = f/(f-n), w = -n*z, fdg = (1/tan(fov*dg))/w;
    return [[fdg*r*cw/100,0,0,0],[0,fdg*ch/100,0,0],[0,0,z,1],[0,0,w,1]];
}

var pointAtMatrix = function() {
    var fd = subVector(addVector(camera.T,camera.P),camera.T);
        fd = normalize(fd,fd.w), a = multiplyV(fd,dotProduct(camera.U,fd));
    var ud = subVector(camera.U,a), ud = normalize(ud), rd = crossProduct(ud,fd);
    return m = [[rd.x,rd.y,rd.z,0],[ud.x,ud.y,ud.z,0],[fd.x,fd.y,fd.z,0],[camera.T.x,camera.T.y,camera.T.z,1]];
}

function quickInverse(m) {
    return [[m[0][0],m[1][0],m[2][0],0],[m[0][1],m[1][1],m[2][1],0],[m[0][2],m[1][2],m[2][2],0],
    [-((m[3][0]*m[0][0])+(m[3][1]*m[0][1])+(m[3][2]*m[0][2])),-((m[3][0]*m[1][0])+(m[3][1]*m[1][1])+(m[3][2]*m[1][2])),-((m[3][0]*m[2][0])+(m[3][1]*m[2][1])+(m[3][2]*m[2][2])),1]];
}


function matrix_vector(v,m) { var r = [0,0,0,0];
    for (let i = 0; i < 4; i++) { r[i] = v.x*m[i][0] + v.y*m[i][1] + v.z*m[i][2] + v.w*m[i][3]; r[i] = pF(r[i]); } r[3] = abs(r[3]);
    return new V(r[0],r[1],r[2],r[3]);
}

function matrix_matrix(m,n) { let r = new empty();
    for(let i = 0; i < 4; i++) { for(let j = 0; j < 4; j++) { r[j][i] = m[j][0]*n[0][i] + m[j][1]*n[1][i] + m[j][2]*n[2][i] + m[j][3]*n[3][i]; }}
    return r;
}

function normalFace(f) { const [a,b,c] = [f[0],f[1],f[2]], [v1,v2,v3,v4,v5,v6] = [b.y-a.y, c.z-b.z, b.z-a.z, c.y-b.y, c.x-b.x, b.x-a.x];
    return new V(v1*v2-v3*v4,v3*v5-v6*v2,v6*v4-v1*v5); } /*Generates the normalization vectors of a face based on order of its points*/

function normalize(v) { const n = rt(dotProduct(v,v)); return normalVector(v,n); } /*Utility used in faceNormal*/

function normalVector(v,n) { if(n < 1e-3) {return new V; }else{ const x = pF(v.x/n), y = pF(v.y/n), z = pF(v.z/n); return new V(x,y,z); }}

function drawFace(f) {
    ctx.beginPath();
    ctx.moveTo(f[0].x + cw/2, f[0].y + ch/2);
    for (let i = 1; i < f.length; i++) { ctx.lineTo(f[i].x + cw/2, f[i].y + ch/2); }
    ctx.lineTo(f[0].x + cw/2, f[0].y + ch/2); ctx.closePath();
}

function drawPoly(v,face) {
    const f = []; for (let p of face.V) { const i = p; f.push({ x:v[i].x, y:v[i].y, z:v[i].z, w:v[i].w }); }
    let cm = subVector(f[0], camera.T); let nl = normalize(normalFace(f)), nf = dotProduct(nl,cm);
    const point = quickInverse(pointAtMatrix());
    if (nf < 0) {
        let gi = dotProduct(nl, lit); f.rgba = `rgba(0, ${parseFloat((gi*150).toFixed(0))}, ${parseFloat((gi*255).toFixed(0))}, 1)`;
        var depth = 0; for(let v of f) { depth+=abs(v.z); } depth/=f.length; f.depth = parseFloat(depth.toFixed(4));
        for(let i=0; i < f.length; i++) {
            f[i] = matrix_vector(f[i],point);
            f[i] = matrix_vector(f[i],projectMatrix());
        }
        toDraw.push(f);
    }
}

function drawObjs(item) { var vs = transforms(item);
    for (let i = 0; i < item.F.length; i++) { drawPoly(vs, item.F[i]); }
    toDraw.sort((a, b) => b.depth - a.depth);
    for(let face of toDraw) {
        drawFace(face);
        ctx.strokeStyle = face.rgba;
        ctx.fillStyle = face.rgba;
        ctx.stroke(); ctx.fill();
    } toDraw = [];
}

function transforms(item) {
    const scale = matrix_matrix(scaleMatrix(item.S.x,item.S.y,item.S.z),world.M);
    const xAxis = matrix_matrix(xAxisRotate(item.R.x),scale), yAxis = matrix_matrix(yAxisRotate(item.R.y),xAxis), zAxis = matrix_matrix(zAxisRotate(item.R.z),yAxis);
    const trans = matrix_matrix(translateMatrix(item.T.x,item.T.y,item.T.z),zAxis);
    const b = []; for (let v of item.B) { b.push({x:v.x,y:v.y,z:v.z,w:v.w}); } camera.update();
    for(let i=0; i < b.length; i++) { b[i] = matrix_vector(b[i],trans); b[i] = subVector(b[i],camera.T);}
    return b;
}

function render(objs) { for(let o of objs) { drawObjs(o); }}

const cv = document.getElementById('cv'), ctx = cv.getContext('2d'), cw = cv.width = window.innerWidth, ch = cv.height = window.innerHeight;
const c=Math.cos, s=Math.sin, tan=Math.tan, abs=Math.abs, rt=Math.sqrt, pi=Math.PI, dg=pi/180;
var n=0.01, f=10, fov=70, dbug = fs;
var toDraw = [];
var world = new Worlds();
var camera = new Camera(1, new V(0,0,0,0),new V(0,0,0,0));
var origin = new Mesh("origin_axis.obj", new V(0,0,0),1,new V(0,0,0)); world.objects.push(origin);
var body = new Mesh("reduced.obj", new V(0,0,0)); world.objects.push(body);
var lit = new V(0,0,-1); normalVector(lit);

function tick() {
    ctx.clearRect(0, 0, cw, ch);
    keysCheck();
    body.R.x++; body.R.y++;
    render(world.objects);
}
var tid = setInterval(tick, 30);
window.addEventListener('beforeunload', function(e) { clearInterval(tid); });