export function V(x,y,z,w) { let v = { x:x=0, y:y=0, z:z=0, w:w=1 }; return v; }
export function crossProd(v1,v2) { return V(v1.y*v2.z - v1.z*v2.y, v1.z*v2.x - v1.x*v2.z, v1.x*v2.y - v1.y*v2.x); }
export function dtProduct(v1,v2) { return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z; }

export function subVector(v1,v2) { return V(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z ); }
export function addVector(v1,v2) { return V(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z); }

export function dividends(v1,k) { return V(v1.x/k, v1.y/k, v1.z/k); }
export function distribut(v1,k) { return V(k*v1.x, k*v1.y, k*v1.z); }

export function normalize(v) { return Math.sqrt(dtProduct(v, v)); }
export function normalVec(v) { let l = normalize(v); return dividends(v,l); }

export const c = Math.cos, s = Math.sin, tab = Math.tan, pi = Math.PI, dg = pi / 180;

export const EM = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
export const IM = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];

export function matrixMatrix(m1,m2) { let m = new EM; for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) { m[j][i] = m1[j][0]*m2[0][i] + m1[j][1]*m2[1][i] + m1[j][2]*m2[2][i] + m1[j][3]*m2[3][i]; }
} return m; }

export function matrixVector(m, i) { return V(
    i.x*m[0][0] + i.y*m[1][0] + i.z*m[2][0] + i.w*m[3][0],
    i.x*m[0][1] + i.y*m[1][1] + i.z*m[2][1] + i.w*m[3][1],
    i.x*m[0][2] + i.y*m[1][2] + i.z*m[2][2] + i.w*m[3][2],
    i.x*m[0][3] + i.y*m[1][3] + i.z*m[2][3] + i.w*m[3][3]);
}

export function axiRotation(a) { let m = new IM; m[3][3] = 1; const [x,y,z] = [a.x*dg, a.y*dg, a.z*dg],
    [cx,cy,cz,sx,sy,sz] = [c(x),c(y),c(z),s(x),s(y),s(z)], [cxcz,cxsz,sxsy] = [cx*cz,cx*sz,sx*sy];
    m[0][0] = cy*cz;            m[0][1] = -cy*sz;           m[0][2] = sy;
    m[1][0] = cxsz + cz*sxsy; m[1][1] = cxcz - sz*sxsy; m[1][2] = -sx*cy;
    m[2][0] = sx*sz - sy*cxcz; m[2][1] = sx*cz + sy*cxsz; m[2][2] = cx*cy;  
return m; }

export function translate(v) { let m = new IM; m[3][0] = v.x; m[3][1] = v.y; m[3][2] = v.z; return m; }