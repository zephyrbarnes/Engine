class V { constructor(x=0,y=0,z=0,w=1) { this.x = x; this.y = y; this.z = z; this.w = w; }}

class T { constructor(a, b, c, d) { this.V = d ? [a, b, c, d] : [a, b, c]; this.color = 'rgba(0, 150, 255, 0.3)'; }
    *[Symbol.iterator]() { for (let v of this.V) { yield v; }}}

class Cube { constructor(C=new V(),S=0, R=new V()) { this.S = S; /*Scale*/ this.R = R; /*Rotation*/ this.C = C; /*Coord*/ this.B = [ /*Array of all 8 cube vertices*/
    new V(-1,-1,-1), new V(-1, 1,-1), new V( 1, 1,-1), new V( 1,-1,-1),new V( 1,-1, 1), new V( 1, 1, 1), new V(-1, 1, 1), new V(-1,-1, 1)]; this.F =[ //Face array
        new T(0, 1, 2, 3), /*Front*/ new T(1, 6, 5, 2), /*Right*/ new T(3, 2, 5, 4), /*Above*/
        new T(4, 5, 6, 7), /*Backs*/ new T(7, 0, 3, 4), /*Below*/ new T(0, 7, 6, 1)];/*Lefts*/ objs.push(this);
}}

class Mesh { constructor(path, C=new V(),S=0, R=new V()) { this.S = S; this.R = R; this.C = C;
    this.B = []; this.F = []; this.path = path; this.populate(); objs.push(this); }
    populate() { loadTextFile(this.path).then( txt => { if (txt !== null) {
        var vNum = []; const lines = txt.split("\n");
        for(let line of lines) { let yarn = line.split(" ");
            if(yarn[0] == "v") { this.B.push(new V(parseFloat(yarn[1]),parseFloat(yarn[2]),parseFloat(yarn[3]))); }
            else if(yarn[0] == "f") { for(let i=1; i < yarn.length; i++) { vNum.push(parseFloat(yarn[i])-1); }
                this.F.push(new T(...vNum));
                vNum = [];
            }
        }
    }});}
}

class View { constructor(C=new V(),R=new V()) { this.C = C; this.R = R; }} /*Camera/View class*/

async function loadTextFile(fl) {
    try { const rt = await fetch(fl); if(!rt.ok) { throw new Error(); } const txt = await rt.text(); return txt;}
    catch(er) { console.error(er); return null; }
}

function pF(n) { return parseFloat(n.toFixed(4)); } /*Restrict the precision of a value,
Considering having the precision alterable depending on camera rotation speed,
might reintegrate into use, could improve efficiency if it becomes necessary*/

function dotProd(v,b) { return v.x*b.x + v.y*b.y + v.z*b.z; } /*Its the dot product...*/

function calcVew() { fov = 1/tan(fov*dg); zed = far/(far-nie); } /*Used for initial calculation of view parameters and if actively altered*/

function fNormal(f) { const [a,b,c] = [f[0],f[1],f[2]], [v1,v2,v3,v4,v5,v6] = [b.y-a.y, c.z-b.z, b.z-a.z, c.y-b.y, c.x-b.x, b.x-a.x];
    return normals(new V(v1*v2-v3*v4,v3*v5-v6*v2,v6*v4-v1*v5)); } /*Generates the normalization vectors of a face based on order of its points*/

function normals(v) { const n = rt(dotProd(v,v)); return subFunc(v,n); } /*Utility used in faceNormal*/

function subFunc(v,n) { if(n < 1e-3) {return new V(); }else{ const x = pF(v.x/n), y = pF(v.y/n), z = pF(v.z/n); return new V(x,y,z); }} /*Utility used in faceNormal,
I believe both normals and subFunc are not actually used in anything else currently, I was trying to parse multi use to reduce code, but no luck.*/

function scaling(v,g) { if(g.type != V) { if(g == 0) { g = 1; } return new V(v.x*g, v.y*g, v.z*g); }else{ return new V(v.x*g.x, v.y*g.y, v.z*g.z); }}

function rotates(v,r) { const [x,y,z] = [r.x*dg, r.y*dg, r.z*dg], [cx,cy,cz,sx,sy,sz] = [c(x), c(y), c(z), s(x), s(y), s(z)];
    const [vysx, vycx, vzcx, czsy, szsy] = [(v.y*sx), (v.y*cx), (v.z*cx), (cz*sy), (sz*sy)]; /*Filler const for reduction*/
    const rX = v.x*(cz*cy) + (vysx*czsy) - (vycx*sz) + (vzcx*czsy) + v.z*(sz*sx); /*Rotation of the X axi*/
    const rY = v.x*(sz*cy) + (vysx*szsy) + (vycx*cz) + (vzcx*szsy) - v.z*(cz*sx); /*Rotation of the Y axi*/
    /*Demo const*/const rZ = (vysx * cy) + (-v.x*sy) + (vzcx * cy); /*Rotation of the Z axi*/
    return new V(rX, rY, rZ); }

function translt(v, c) { const x = v.x + c.x, y = v.y + c.y, z = v.z + c.z; return new V(x,y,z); }

function project(v) { let w = -nie*v.z*zed; return new V(v.x*fov*(cvh/far)/w,v.y*fov*(cvw/far)/w,(v.z*zed+v.w)/w,w); }

function line(t) { ctx.beginPath(); ctx.moveTo(t.V.a.x+cvw/2,t.V.a.y+cvh/2); ctx.lineTo(t.V.b.x+cvw/2,t.V.b.y+cvh/2);
    ctx.lineTo(t.V.c.x+cvw/2,t.V.c.y+cvh/2); ctx.lineTo(t.V.a.x+cvw/2,t.V.a.y+cvh/2); ctx.closePath(); }

function line(f) {
    ctx.beginPath();
    ctx.moveTo(f[0].x + cvw/2, f[0].y + cvh/2);
    for (let i = 1; i < f.length; i++) { ctx.lineTo(f[i].x + cvw/2, f[i].y + cvh/2); }
    ctx.lineTo(f[0].x + cvw/2, f[0].y + cvh/2); ctx.closePath();
}

function drawPoly(v,face) {
    const f = []; for (let p of face.V) { const i = p; f.push({ x:v[i].x, y:v[i].y, z:v[i].z, w:v[i].w }); }
    let cm = translt(f[0], new V(-cam.C.x,-cam.C.y,-cam.C.z));
    let nl = fNormal(f), nf = dotProd(nl,cm);
    if (nf < 0) {
        let gi = dotProd(nl, lit), rgba = `rgba(0, ${parseFloat((gi*150).toFixed(0))}, ${parseFloat((gi*255).toFixed(0))}, 1)`;
        for(let i=0; i < f.length; i++) { f[i] = project(f[i]);
            f[i].x = pF(f[i].x); f[i].y = pF(f[i].y); }
        line(f);
        ctx.fillStyle = rgba;
        if (dbug) { ctx.stroke(); }
        ctx.fill();
    }
}

function renders(objs) { for(let o of objs) { drawObj(o); }}

function drawObj(item) { var vs = trnsform(item); for (let i = 0; i < item.F.length; i++) { drawPoly(vs, item.F[i]); }}

function trnsform(obj) {
    const b = []; for (let v of obj.B) { b.push({x:v.x,y:v.y,z:v.z,w:v.w}); }
    for(let i=0; i < b.length; i++) { b[i] = translt(rotates(scaling(b[i],obj.S),obj.R),obj.C); }
    return b;
}


const cv = document.getElementById('cv'), ctx = cv.getContext('2d'), cvw = cv.width = window.innerWidth, cvh = cv.height = window.innerHeight;
const c=Math.cos, s=Math.sin, tan=Math.tan, abs=Math.abs, rt=Math.sqrt, pi=Math.PI, dg=pi/180, fs = false, tr = true;
var nie=0.01, far=22, fov=70, dbug = fs; calcVew();
var objs = [];
var cam = new View();
//var demo = new Cube(new V(0,0,25)); 
var body = new Mesh("reduced.obj", new V(0,0,5));
var lit = new V(1,1,-1); subFunc(lit);

function tick() {
    ctx.clearRect(0, 0, cvw, cvh);
    //demo.R.x++; demo.R.y++;
    body.R.y++;
    renders(objs);
}
var tid = setInterval(tick, 30);
window.addEventListener('beforeunload', function(e) { clearInterval(tid); });