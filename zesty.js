let ctx, cnv, cmr, myCube, d = 10;
const pie = Math.PI,
      tau = 2 * pie,
      deg = tau / 360;

class view {
    constructor(rght,abve,frwd,bite){
        this.matrix = [
            [ rght.x, abve.x, frwd.x, bite.x],
            [ rght.y, abve.y, frwd.y, bite.y],
            [ rght.z, abve.z, frwd.z, bite.z],
            [      0,      0,      0,      1]];
        this.rotate = [
            [ rght.x, rght.y, rght.z,      0],
            [ abve.y, abve.y, abve.y,      0],
            [ frwd.x, frwd.y, frwd.z,      0],
            [      0,      0,      0,      1]];
        this.translate = [
            [      1,      0,      0,-bite.x],
            [      0,      1,      0,-bite.y],
            [      0,      0,      1,-bite.z],
            [      0,      0,      0,      1]];
    }
    projection(fov,far,near){
        let s = 1 / Math.tan(fov*deg/2)
        let c1 = -(far + near) / (far - near), c2 = -(2*far * near) / (far - near);
        this.project = [[s, 0, 0, 0],[0, s, 0, 0],[0, 0,c1,c2],[0, 0,-1, 0]];
    }
}

class bite { constructor(x, y, z, w) { if(w) {this.w = w; }else{ w = 1; } this.data = [parseFloat(x), parseFloat(y), parseFloat(z), this.w]; }}

class trig { constructor(bit1,bit2,bit3,color) { this.bits = [bit1,bit2,bit3]; this.color = color; }}
class face { constructor(bit1,bit2,bit3,bit4,col) { this.bits = [bit1,bit2,bit3,bit4]; this.color = col; }}
class cube { constructor(size,anch,color) { this.size = size; this.color = color; let s = size/2;
        this.x = anch.x; this.y = anch.y; this.z = anch.z;
        this.bites = [
            new bite(this.x+s, this.y+s, this.z-s),/*++-*/
            new bite(this.x+s, this.y-s, this.z-s),/*+--*/
            new bite(this.x+s, this.y-s, this.z+s),/*+-+*/
            new bite(this.x+s, this.y+s, this.z+s),/*+++*/
            new bite(this.x-s, this.y+s, this.z+s),/*-++*/
            new bite(this.x-s, this.y-s, this.z+s),/*--+*/
            new bite(this.x-s, this.y-s, this.z-s),/*---*/
            new bite(this.x-s, this.y+s, this.z-s),/*-+-*/
        ];
        this.faces = [
            new face(this.bites[3], this.bites[4], this.bites[5], this.bites[2], this.color),
            new face(this.bites[0], this.bites[3], this.bites[2], this.bites[1], this.color),
            new face(this.bites[0], this.bites[7], this.bites[4], this.bites[3], this.color),
            new face(this.bites[4], this.bites[7], this.bites[6], this.bites[5], this.color),
            new face(this.bites[2], this.bites[5], this.bites[6], this.bites[1], this.color),
            new face(this.bites[7], this.bites[0], this.bites[1], this.bites[6], this.color)];
    }
}

function rend(item) {
    for (let face of item.faces) {
        var fake = project(face.bits[3]);
        ctx.beginPath(); ctx.moveTo(fake.x, fake.y);
        for (let bite of face.bits) { fake = project(bite); ctx.lineTo(fake.x, fake.y); }
        ctx.closePath(); ctx.stroke(); ctx.fill();
    }
}

var vert = function(x, y) { this.x = parseFloat(x); this.y = parseFloat(y); };

function project(fill) {
    let take = fill;
    take = mult(mult(cmr.project,cmr.matrix),fill.data);
	return new vert(take[0],take[1]);
}

function mult(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols); // initialize the current row
      for (var c = 0; c < bNumCols; ++c) {
        m[r][c] = 0;             // initialize the current cell
        for (var i = 0; i < aNumCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
  }

function start(CID) {
    cnv = document.getElementById(CID); ctx = cnv.getContext('2d');
    cnv.width = window.innerWidth; cnv.height = window.innerHeight;
    cmr = new view(new bite(1,0,0),new bite(0,1,0),new bite(0,0,1),new bite(0,0,-10));
    cmr.projection(75,100,0.1);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';
    myCube = new cube(100, new bite(0, 0, 0), 'rgba(0, 150, 255, 1)');
    run();
}

function run() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    
    rend(myCube)

    requestAnimationFrame(run);
}