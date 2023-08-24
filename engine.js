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
}

function projection(fov,far,near){
    let s = 1 / Math.tan(fov*deg/2)
    let c1 = -(far + near) / (far - near), c2 = -(2*far * near) / (far - near);
    this.proj = [[s, 0, 0, 0],[0, s, 0, 0],[0, 0,c1,c2],[0, 0,-1, 0]];
}

class bite extends Array{ constructor(x,y,z,w) { super(x,y,z,w);}}
class trig extends Array{ constructor(bit1,bit2,bit3,color) { super(bit1,bit2,bit3,color); }}
class face extends Array{ constructor(bit1,bit2,bit3,bit4,color) { super(bit1,bit2,bit3,bit4,color);}}
class cube { constructor(x,y,z,size,color) { this.size = size/2; this.color = color; this.x = x; this.y = y; this.z = z;
        this.bites = [
            new bite(x+s, y+s, z-s,1),/*++-*/
            new bite(x+s, y-s, z-s,1),/*+--*/
            new bite(x+s, y-s, z+s,1),/*+-+*/
            new bite(x+s, y+s, z+s,1),/*+++*/
            new bite(x-s, y+s, z+s,1),/*-++*/
            new bite(x-s, y-s, z+s,1),/*--+*/
            new bite(x-s, y-s, z-s,1),/*---*/
            new bite(x-s, y+s, z-s,1),/*-+-*/
        ];
        this.faces = [
            new face(this.bites[2], this.bites[3], this.bites[4], this.bites[5], this.color),
            new face(this.bites[5], this.bites[6], this.bites[1], this.bites[2], this.color),
            new face(this.bites[2], this.bites[1], this.bites[0], this.bites[3], this.color),
            new face(this.bites[3], this.bites[0], this.bites[7], this.bites[4], this.color),
            new face(this.bites[4], this.bites[5], this.bites[6], this.bites[7], this.color),
            new face(this.bites[7], this.bites[0], this.bites[1], this.bites[6], this.color)];
    }
}

class v2 { constructor(x, y) { this.x = parseFloat(x); this.y = parseFloat(y); } }

var cos = Math.cos, sin = Math.sin;

function rote(matrix,axis,tang) { let result, a = tang*deg;
    if(axis == 'x') { result = [
        [ 1,    0  ,    0  , 0],
        [ 0, cos(a),-sin(a), 0],
        [ 0, sin(a), cos(a), 0],
        [ 0,    0  ,    0  , 1]];
    }else if(axis == 'y') { result = [
        [ cos(a), 0, sin(a), 0],
        [    0  , 1,    0  , 0],
        [-sin(a), 0, cos(a), 0],
        [    0  , 0,    0  , 1]];
    }else{ result = [
        [ cos(a),-sin(a), 0, 0],
        [ sin(a), cos(a), 0, 0],
        [    0  ,    0  , 0, 0],
        [    0  ,    0  , 0, 1]];
    } return mult(result,mtrx);
}

function mult(a,b) { var result = [[],[],[],[]];
    for(var i = 0;i < aR; i++) { 
        for (var j = 0; j < 4; j++) {
            for (var k = 0; k < 4; k++) { result[i][j] = a[i][k]*b[k][j]; }      
        }  
    } return result;
}

function start() {
    cnv = document.getElementById('cnv'); ctx = cnv.getContext('2d');
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

    setTimeout(requestAnimationFrame(run),30);
}