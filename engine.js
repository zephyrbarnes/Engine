let cnv, ctx, cmr, myCube, d = 10;
const pie = Math.PI,
      tau = 2 * pie,
      deg = tau / 360;

class view {
    constructor(xAxi,yAxi,zAxi,bite){
        this.matrix = [
            [ xAxi.x, yAxi.x, zAxi.x, bite.x],
            [ xAxi.y, yAxi.y, zAxi.y, bite.y],
            [ xAxi.z, yAxi.z, zAxi.z, bite.z],
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
        this.proj = [[s, 0, 0, 0],[0, s, 0, 0],[0, 0,c1,c2],[0, 0,-1, 0]];
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

class vt2D { constructor(x, y) { this.x = parseFloat(x); this.y = parseFloat(y); } }

function cos(thet) { Math.cos(thet); } function sin(thet) { Math.sin(thet); }

function rote(mtrx,axis,tang) { let result, thet = tang*deg;
    if(axis = 'x') { result = [
        [ 1,         0,         0, 0],
        [ 0, cos(thet),-sin(thet), 0],
        [ 0, sin(thet), cos(thet), 0],
        [ 0,      0,      0, 1]];
    }else if(axis == 'y') { result = [
        [ cos(thet), 0, sin(thet), 0],
        [         0, 1,         0, 0],
        [-sin(thet), 0, cos(thet), 0],
        [         0, 0,         0, 1]];
    }else{ result = [
        [ cos(thet),-sin(thet), 0, 0],
        [ sin(thet), cos(thet), 0, 0],
        [         0,         0, 0, 0],
        [         0,         0, 0, 1]];
    } return mult(mtrx,result);
}

function mult(a,b) {
    let i, j, k, result = [];
        aR = a.length, aC = a[0].length,
        bR = b.length, bC = b[0].length;
    for(i;i < aR; i++) { result.push([]);
        for (j; j < 4; j++) {
            for (k; k < 4; k++) {              
                result[i][j].push(a[i][k]*b[k][j]);
            }      
        }  
    } return result;
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