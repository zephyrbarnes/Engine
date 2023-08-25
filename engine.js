let cnv, ctx, cmr, myCube, d = 10;
var cos = Math.cos, sin = Math.sin, tan = Math.tan
const pie = Math.PI, tau = 2 * pie, deg = tau / 360;

class view { constructor(fov,far,near) { this.bite;
    let s = 1/tan(fov*deg/2), c = far-near, c1 = -(far+near)/c, c2 = -(2*far*near)/c; this.proj = [
        [ s, 0, 0, 0],
        [ 0, s, 0, 0],
        [ 0, 0,c1,-1],
        [ 0, 0,c2, 0]];}
    port() { return this.bite.map(value => -value); }}

class bite extends Array{ constructor(x,y,z) { let w = 1; super(x,y,z,w); }
    mult(m) { for (var i = 0; i < 4; i++) { this[i] = Number(Math.round(x*m[i][0] + y*m[i][1] + z*m[i][2] + w*m[i][3]+'e2')+'e-2'); }}
    move(b) { let m = [[b[0],0,0,0],[0,b[1],0,0],[0,0,b[2],0],[0,0,0,0]]; mult(m);}}
class trig extends Array{ constructor(bit1,bit2,bit3) { super(bit1,bit2,bit3); this.color; }
    mult(m) { for (var i = 0; i < 3; i++) { this[i].mult(m); }}
    move(b) { for (var i = 0; i < 3; i++) { this[i].move(b); }}}

class face extends Array{ constructor(bit1,bit2,bit3,bit4) { super(bit1,bit2,bit3,bit4); this.color; }
    mult(m) { for (var i = 0; i < 4; i++) { this[i].mult(m); }}
    move(b) { for (var i = 0; i < 4; i++) { this[i].move(b); }}}

class cube { constructor(bite,color,size) { this.cord = bite; this.color = color; let s = size/2, x = bite[0], y = bite[1], z = bite[2];
    this.bites = [ new bite(x+s, y+s, z-s),new bite(x+s, y-s, z-s),
                   new bite(x+s, y-s, z+s),new bite(x+s, y+s, z+s),
                   new bite(x-s, y+s, z+s),new bite(x-s, y-s, z+s),
                   new bite(x-s, y-s, z-s),new bite(x-s, y+s, z-s)];
    this.faces = [ new face(bites[1],bites[0],bites[3],bites[2]),
                   new face(bites[2],bites[3],bites[4],bites[5]),
                   new face(bites[3],bites[0],bites[7],bites[4]),
                   new face(bites[4],bites[5],bites[6],bites[7]),
                   new face(bites[5],bites[6],bites[1],bites[2]),
                   new face(bites[6],bites[7],bites[0],bites[1])];
        for(let face of this.faces) { face.move(this.cord) }}
    mult(m) { for(let face of this.faces) { face.mult(m); }}
    move(b) { for(let face of this.faces) { face.move(b); }}
}

function rote(axis,tang) { let rslt, a = tang*deg;
    if(axis == 'x') { rslt = [
        [ 1,    0  ,    0  , 0],
        [ 0, cos(a),-sin(a), 0],
        [ 0, sin(a), cos(a), 0],
        [ 0,    0  ,    0  , 1]];
    }else if(axis == 'y') { rslt = [
        [ cos(a), 0, sin(a), 0],
        [    0  , 1,    0  , 0],
        [-sin(a), 0, cos(a), 0],
        [    0  , 0,    0  , 1]];
    }else{ rslt = [
        [ cos(a),-sin(a), 0, 0],
        [ sin(a), cos(a), 0, 0],
        [    0  ,    0  , 0, 0],
        [    0  ,    0  , 0, 1]];
    } return rslt;
}

function mult(a,b) { var rslt = [[],[],[],[]];
    for(var i = 0;i < aR; i++) { 
        for (var j = 0; j < 4; j++) {
            for (var k = 0; k < 4; k++) { rslt[i][j] = a[i][k]*b[k][j]; }
        }  
    } return rslt;
}

function rend(objs) {
    let fake = objs;
    fake.move(cmr.port());
	for (var i = 0, n_obj = objs.length; i < n_obj; ++i) {
		for (var j = 0, n_faces = objs[i].faces.length; j < n_faces; ++j) { var face = objs[i].faces[j];
			ctx.beginPath();
			ctx.moveTo(P.x + dx, -P.y + dy);

			for (var k = 1, n_bites = face.length; k < n_bites; ++k) {
				
				ctx.lineTo(P.x + dx, -P.y + dy);
			}

			// Close the path and draw the face
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	}
}

function start() {
    cnv = document.getElementById('cnv'); ctx = cnv.getContext('2d');
    cnv.width = window.innerWidth; cnv.height = window.innerHeight;
    cmr = new view(75,100,0.1); cmr.bite = new bite(0,0,-10);
    ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    myCube = new cube(100, new bite(0, 0, 0),'rgba(0, 150, 255, 1)');
    var objs = []; objs.push(myCube);
    run();
}

function run() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    setTimeout(requestAnimationFrame(run),30);
}