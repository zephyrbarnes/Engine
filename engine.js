let ctx, cnvs;
const d = 10;
function start(canvasId) {
    cnvs = document.getElementById(canvasId); ctx = cnvs.getContext('2d');
    cnvs.width = window.innerWidth; cnvs.height = window.innerHeight;
    animate();
}

class bite {
    constructor(x, y, z) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
}}

class trig { constructor(bit1,bit2,bit3,color) { this.vrtx = [bit1,bit2,bit3]; this.color = color; }
    draw() {
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        for(let bite of this.vrtx) {
            var { x,y } = vert(bite.x, bite.y, bite.z);
            ctx.lineTo(x,y); 
            ctx.stroke();
        }
        var { x,y } = vert(this.vrtx[0].x, this.vrtx[0].y, this.vrtx[0].z);
        ctx.lineTo(x, y);
        ctx.closePath();
		ctx.fill();
    }
}
class face extends trig{ constructor(bit1,bit2,bit3,bit4,color) { super(bit1,bit2,bit3); this.vrtx = [bit1,bit2,bit3,bit4]; this.color = color; }}
class cube {
    constructor(size,anch,color) {
        const x = this.x = anch.x, s = size/2,
              y = this.y = anch.y,
              z = this.z = anch.z;
        this.color = color;
        this.bits = [
            new bite(x-s, y-s, z+s),
            new bite(x-s, y-s, z-s),
            new bite(x+s, y-s, z-s),
            new bite(x+s, y-s, z+s),
            new bite(x+s, y+s, z+s),
            new bite(x+s, y+s, z-s),
            new bite(x-s, y+s, z-s),
            new bite(x-s, y+s, z+s)];
        this.fcts = [
            new face(this.bits[0], this.bits[1], this.bits[2], this.bits[3], this.color),
            new face(this.bits[3], this.bits[2], this.bits[5], this.bits[4], this.color),
            new face(this.bits[4], this.bits[5], this.bits[6], this.bits[7], this.color),
            new face(this.bits[7], this.bits[6], this.bits[1], this.bits[0], this.color),
            new face(this.bits[7], this.bits[0], this.bits[3], this.bits[4], this.color),
            new face(this.bits[1], this.bits[6], this.bits[5], this.bits[2], this.color)];
    }

    draw() {
        for(let face of this.fcts) {
            face.draw();
        }
    }
}

function rote(item, axis, tang) {
    if (axis == 'x') { roll('y','z'); }
    else if (axis == 'y') { toll('x','z'); }
    else { toll('x', 'y'); }

    function toll(axi1, axi2) {
        for (let face of item.fcts) {
            for (let bite of item.bits) {
                const a1 = bite[axi1] - item[axi1],
                      a2 = bite[axi2] - item[axi2];
                const b1 = a1 * Math.cos(tang) - a2 * Math.sin(tang),
                      b2 = a1 * Math.sin(tang) + a2 * Math.cos(tang);
                bite[axi1] = b1 + item[axi1];
                bite[axi2] = b2 + item[axi2];
            }
        }
    }
}

function vert(x, y, z) { const pX = x/(z+d), pY = y/(z+d); return { x: pX*cnvs.width, y: pY*cnvs.height }; }

const myCube = new cube(50, new bite(150, 150, 300), 'rgba(0, 150, 255, 1)');

function animate() {
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    rote(myCube, 'y', 0.002);

    myCube.draw();

    requestAnimationFrame(animate);
}