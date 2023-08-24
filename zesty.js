let ctx, cnv, cmr, myCube;
const pie = Math.PI,
      tau = 2 * pie,
      deg = tau / 360;

class view {
    constructor(xAxi,yAxi,zAxi,bite){
        this.xAngle = 0; this.yAngle = 0; this.zAngle = 0;
        this.matrix = [
            [ xAxi[0], yAxi[0], zAxi[0], bite[0]],
            [ xAxi[1], yAxi[1], zAxi[1], bite[1]],
            [ xAxi[2], yAxi[2], zAxi[2], bite[2]],
            [    0,       0,       0,       1   ]];
    }
    rotate(axis,tang) {
        this.matrix = rote(this.matrix,axis,tang);
        if(axis = 'x') { this.xAngle += tang*deg; }
        if(axis = 'y') { this.yAngle += tang*deg; }
        if(axis = 'z') { this.zAngle += tang*deg; }
    }
    proj(fov,far,near){
        let s = 1 / Math.tan(fov*deg/2),
            c1 = -(far + near) / (far - near),
            c2 = -(2*far * near) / (far - near);
        this.proj = [[s, 0, 0, 0],[0, s, 0, 0],[0, 0,c1,c2],[0, 0,-1, 0]];
    }
}

class bite extends Array{ constructor(x,y,z,w) { super(x,y,z,w);}}
class trig extends Array{ constructor(bit1,bit2,bit3,color) { super(bit1,bit2,bit3,color); }}
class face extends Array{ constructor(bit1,bit2,bit3,bit4,color) { super(bit1,bit2,bit3,bit4,color);}}
class cube { constructor(size,anch,color) { this.size = size; this.anch = anch; this.color = color; var s = size/2, x = anch[0], y = anch[1], z = anch[2];
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

var cos = Math.cos, sin = Math.sin;

function rote(mtrx,axis,tang) { let result, thet = tang*deg;
    if(axis == 'x') { result = [
        [ 1,     0,         0,     0],
        [ 0, cos(thet),-sin(thet), 0],
        [ 0, sin(thet), cos(thet), 0],
        [ 0,     0,         0,     1]];
    }else if(axis == 'y') { result = [
        [ cos(thet), 0, sin(thet), 0],
        [     0,     1,     0,     0],
        [-sin(thet), 0, cos(thet), 0],
        [     0,     0,     0,     1]];
    }else{ result = [
        [ cos(thet),-sin(thet), 0, 0],
        [ sin(thet), cos(thet), 0, 0],
        [     0,         0,     0, 0],
        [     0,         0,     0, 1]];
    }
    let multResult = [[],[],[],[]];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) { multResult[i].push(0);
            for (let k = 0; k < 4; k++) { multResult[i][j] += result[i][k] * mtrx[k][j]; }
        }
    } return multResult;
}

function move(dest, valu) {
    let result = [dest[0]+valu[0],dest[1]+valu[1],dest[2]+valu[2],1];
    return result;
}

function multBite(matrix,point) { var x = point[0], y = point[1], z = point[2], w = point[3];
        c1r1 = matrix[0][0], c2r1 = matrix[1][0], c3r1 = matrix[2][0], c4r1 = matrix[3][0],
        c1r2 = matrix[0][1], c2r2 = matrix[1][1], c3r2 = matrix[2][1], c4r2 = matrix[3][1],
        c1r3 = matrix[0][2], c2r3 = matrix[1][2], c3r3 = matrix[2][2], c4r3 = matrix[3][2],
        c1r4 = matrix[0][3], c2r4 = matrix[1][3], c3r4 = matrix[2][3], c4r4 = matrix[3][3];
    return [
        x*c1r1 + y*c1r2 + z*c1r3 + w*c1r4, x*c2r1 + y*c2r2 + z*c2r3 + w*c2r4,
        x*c3r1 + y*c3r2 + z*c3r3 + w*c3r4, x*c4r1 + y*c4r2 + z*c4r3 + w*c4r4];
}

function rend(item) {
    let l = item.faces.length;
    ctx.fillStyle = item.color;
    for(let i = 0; i < l; i++) {
        ctx.beginPath();
        let draw = multBite(cmr.proj,multBite(cmr.matrix,move(item.anch,item.faces[i][3])));
        ctx.moveTo(draw[0]+cnv.width/2,draw[1]+cnv.height/2);
        for(let j = 0; j < 4; j++) {
            draw = multBite(cmr.proj,multBite(cmr.matrix,move(item.anch,item.faces[i][j])));
            ctx.lineTo(draw[0]+cnv.width/2,draw[1]+cnv.height/2);
        }
        ctx.closePath();
	    ctx.fill(); ctx.stroke();
    }
}

function start(CID) {
    cnv = document.getElementById(CID); ctx = cnv.getContext('2d');
    cnv.width = window.innerWidth; cnv.height = window.innerHeight;
    console.log("Width_Height: "+cnv.width+"_"+cnv.height);
    cmr = new view(new bite(1,0,0,0),new bite(0,1,0,0),new bite(0,0,1,0),new bite(0, 0,0,0));
    cmr.proj(70,100,0.1);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    myCube = new cube(100, new bite(0, 0, 0, 1), 'rgba(0, 150, 255, 1)');
    run();
}

function run() {
    console.log("Width_Height: "+cnv.width+"_"+cnv.height);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    move
    rend(myCube)
    cmr.rotate('y', -1);
    cmr.rotate('x', 1);
    
    requestAnimationFrame(run);
}