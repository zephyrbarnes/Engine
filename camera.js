import * as _ from './vectors.js';
export class Camera {
    constructor() {
        this.projection = {}; /*Camera projection*/
        this.position = V; /*Camera position*/
        this.above = V(0,1,0); /*Camera vertical*/
        this.yaw = 0 /*Angle of vertical pan*/
        this.rotation = axiRotation(V(0,yaw,0)); /*Camera vertical pan*/
        this.direction = matrixVector(this.rotation, V(0,0,1));
        this.target = addVector(this.position, this.direction);
        this.matrix; this.camMatrix; /*Create Camera Matrix*/
        this.inverse = this.quickInverse(this.matrix); /*Inverse Camera Matrix*/
    }
    projected(fov,rat,nie,far) {
        let rad = 1/tan(fov*dg/360*pi), m = new EM;
        m[0][0] = rat*rad;/*m[0][1] = 0*/ /*m[0][2]*/                 /*m[0][3] = 0*/
      /*m[1][0] = 0*/       m[1][1] = rad;/*m[1][2]*/                 /*m[1][3] = 0*/
      /*m[2][0] = 0*/     /*m[2][1] = 0*/   m[2][2] = far/(far-nie);    m[2][3] = 1;
      /*m[3][0] = 0*/     /*m[3][1] = 0*/   m[3][2] = -nie*m[2][2];   /*m[3][3] = 0*/
        this.projection = m;
    }

    updateCam() {
        this.rotation = axiRotation(V(0,yaw,0)); /*Camera vertical pan*/
        this.direction = matrixVector(this.rotation, V(0,0,1));
        this.target = addVector(this.position, this.direction);
        this.camMatrix; /*Create Camera Matrix*/ this.quickInverse; /*Inverse Camera Matrix*/
    }

    camMatrix() { const
        {p:position, t:target, u:above} = this,
        forward = subVector(t,p),
        faceDir = normalVec(forward),
        upsWard = dtProduct(u,faceDir),
        changes = distribut(faceDir,upsWard),
        abveDir = normalVec(subVector(u,changes)),
        rghtDir = crossProd(abveDir,faceDir), m = new IM;
        m[0][0] = rghtDir.x;	m[0][1] = rghtDir.y;	m[0][2] = rghtDir.z;    /*m[0][3] = 0*/
        m[1][0] = abveDir.x;	m[1][1] = abveDir.y;	m[1][2] = abveDir.z;    /*m[1][3] = 0*/
        m[2][0] = faceDir.x;	m[2][1] = faceDir.y;	m[2][2] = faceDir.z;    /*m[2][3] = 0*/
        m[3][0] = p.x;	        m[3][1] = p.y;	        m[3][2] = p.z;          /*m[3][3] = 1*/
        this.matrix = m;
    }

    quickInverse() { let m = this.matrix,
        matrix1 = -(m[3][0]*m[0][0] + m[3][1]*m[0][1] + m[3][2]*m[0][2]),
        matrix2 = -(m[3][0]*m[1][0] + m[3][1]*m[1][1] + m[3][2]*m[1][2]),
        matrix3 = -(m[3][0]*m[2][0] + m[3][1]*m[2][1] + m[3][2]*m[2][2]);
        this.inverse = [
        [ m[0][0], m[1][0], m[2][0], 0],
        [ m[0][1], m[1][1], m[2][1], 0],
        [ m[0][2], m[1][2], m[2][2], 0],
        [ matrix1, matrix2, matrix3, 1]];
    }
}