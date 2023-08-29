var V = function(x,y,z,w) { return { x:x||0,y:y||0,z:z||0,w:w||1 }; };
var T = function(a,b,c,d) { this.color = 'rgba(0, 150, 255, 0.3)'; if(!d) { this.V = [a,b,c]; }else{ this.V = [a,b,c,d]; } };
class I { constructor(C,S,R) { this.S = S||0; this.R = R||new V; this.C = C||new V; this.B = []; this.F = [];
    this.B.push(new V(-1,-1,-1),new V(-1, 1,-1),new V( 1, 1,-1),new V( 1,-1,-1),new V( 1,-1, 1),new V( 1, 1, 1),new V(-1, 1, 1),new V(-1,-1, 1));
    this.F = [new T(this.B[0], this.B[1], this.B[2], this.B[3]), /*Front*/ new T(this.B[1], this.B[6], this.B[5], this.B[2]), /*Right*/
              new T(this.B[3], this.B[2], this.B[5], this.B[4]), /*Above*/ new T(this.B[4], this.B[5], this.B[6], this.B[7]), /*Backs*/
              new T(this.B[7], this.B[0], this.B[3], this.B[4]), /*Below*/ new T(this.B[7], this.B[6], this.B[1], this.B[0])];/*Lefts*/;}};

class Body { constructor(C,S,R) { this.S = S||0; this.R = R||new V; this.C = C||new V; this.B = []; this.F = [];
    this.B.push(new V(), new V(  0.2,-0.44,-0.29, 1), new V( 0.19, 0.12,-0.31, 1), new V( 0.34, 0.15,-0.21, 1),
                new V(  0  ,-0.61, -0.2, 1), new V( 0.17, 0.45,  0.3, 1), new V( 0.44, 0.43,-0.18, 1),
                new V( 0.51, 0.34,  0.1, 1), new V( 0.46, 0.43, 0.22, 1), new V( 0.51, 0.33,-0.04, 1),
                new V( 0.28,-0.18, 0.22, 1), new V(  0.4, 0.03,-0.07, 1), new V( 0.72, 0.59,-0.04, 1),
                new V( 0.99, 0.35,-0.04, 1), new V( 1.53, 0.52, 0.03, 1), new V( 0.67, 0.61, 0.09, 1),
                new V( 1.39, 0.46,-0.12, 1), new V( 1.56, 0.44, 0.13, 1), new V( 0.87, 0.39, 0.13, 1),
                new V( 0.96, 0.45, -0.1, 1), new V( 1.64,  0.4,-0.04, 1), new V( 0.11, 1.27,-0.37, 1),
                new V( 0.29, 1.25,-0.19, 1), new V( 0.19, 0.83, 0.12, 1), new V( 0.14, 0.94,  0.2, 1),
                new V( 0.29, 1.25, 0.05, 1), new V( 0.24, 1.24, 0.28, 1), new V( 0.24, 1.41,-0.18, 1),
                new V( 0.22, 1.44, 0.07, 1), new V( 0.13,-0.59,  0.3, 1), new V( 0.15, 0.82,-0.32, 1),
                new V( 0.24, 0.92,-0.24, 1), new V( 0.49, 0.69, 0.02, 1), new V( 0.21, 0.77,-0.09, 1),
                new V( 0.33,-0.47, 0.28, 1), new V( 0.39,-0.09,  0.1, 1), new V( 0.56, 0.52, 0.21, 1),
                new V( 0.25,-1.06, -0.2, 1), new V( 0.4,- 1.07, -0.1, 1), new V( 0.15,-1.07, 0.22, 1),
                new V( 0.33,  -1 , 0.12, 1), new V( 0.16,-1.26, 0.23, 1), new V( 0.11,-1.09,-0.01, 1),
                new V( 0.19,-1.85, -0.1, 1), new V( 0.37,-1.32, 0.25, 1), new V( 0.18,-2.02,  0.1, 1),
                new V( 0.26,-1.81,-0.18, 1), new V( 0.39,-1.82,-0.09, 1), new V( 0.31,-2.03, 0.15, 1),
                new V( 0.42,-2.02, -0.2, 1), new V( 0.37,-2.01,-0.39, 1), new V( 0.21,-2.03,-0.42, 1),
                new V( 0.09,-0.11, 0.24, 1), new V(  0.3, 0.54,-0.26, 1), new V( 0.25, 0.26,-0.34, 1),
                new V( 0.44, 0.64, 0.22, 1), new V( 0.25, 0.69,-0.05, 1), new V( 0.16, 0.69, 0.17, 1),
                new V(  0  ,-0.65,-0.01, 1), new V(  0  , 0.54,-0.25, 1), new V(  0  , 0.91,  0.2, 1),
                new V(  0  , 0.57, 0.29, 1), new V(  0  , 0.74,-0.21, 1), new V(  0  , 1.43,-0.29, 1),
                new V(  0  ,  0.8,-0.38, 1), new V(  0  , 1.12, 0.33, 1), new V(  0  ,  1.4, 0.26, 1),
                new V(  0  , 1.53, 0.01, 1), new V(  0  ,-0.52, 0.26, 1), new V( -0.2,-0.44,-0.29, 1),
                new V(-0.19, 0.12,-0.31, 1), new V(-0.34, 0.15,-0.21, 1), new V(-0.17, 0.45,  0.3, 1),
                new V(-0.44, 0.43,-0.18, 1), new V(-0.51, 0.34,  0.1, 1), new V(-0.46, 0.43, 0.22, 1),
                new V(-0.51, 0.33,-0.04, 1), new V(-0.28,-0.18, 0.22, 1), new V( -0.4, 0.03,-0.07, 1),
                new V(-0.72, 0.59,-0.04, 1), new V(-0.87, 0.39, 0.13, 1), new V(-0.99, 0.35,-0.04, 1),
                new V(-1.53, 0.52, 0.03, 1), new V(-0.67, 0.61, 0.09, 1), new V(-1.39, 0.46,-0.12, 1),
                new V(-1.56, 0.44, 0.13, 1), new V(-0.96, 0.45, -0.1, 1), new V(-1.64,  0.4,-0.04, 1),
                new V(-0.11, 1.27,-0.37, 1), new V(-0.29, 1.25,-0.19, 1), new V(-0.19, 0.83, 0.12, 1),
                new V(-0.14, 0.94,  0.2, 1), new V(-0.29, 1.25, 0.05, 1), new V(-0.24, 1.24, 0.28, 1),
                new V(-0.24, 1.41,-0.18, 1), new V(-0.22, 1.44, 0.07, 1), new V(-0.13,-0.59,  0.3, 1),
                new V(-0.15, 0.82,-0.32, 1), new V(-0.24, 0.92,-0.24, 1), new V(-0.49, 0.69, 0.02, 1),
                new V(-0.21, 0.77,-0.09, 1), new V(-0.33,-0.47, 0.28, 1), new V(-0.39,-0.09,  0.1, 1),
                new V(-0.56, 0.52, 0.21, 1), new V(-0.25,-1.06, -0.2, 1), new V( -0.4,-1.07, -0.1, 1),
                new V(-0.15,-1.07, 0.22, 1), new V(-0.33, -1.0, 0.12, 1), new V(-0.16,-1.26, 0.23, 1),
                new V(-0.11,-1.09,-0.01, 1), new V(-0.19,-1.85, -0.1, 1), new V(-0.37,-1.32, 0.25, 1),
                new V(-0.18,-2.02,  0.1, 1), new V(-0.26,-1.81,-0.18, 1), new V(-0.39,-1.82,-0.09, 1),
                new V(-0.31,-2.03, 0.15, 1), new V(-0.42,-2.02, -0.2, 1), new V(-0.37,-2.01,-0.39, 1),
                new V(-0.21,-2.03,-0.42, 1), new V(-0.09,-0.11, 0.24, 1), new V( -0.3, 0.54,-0.26, 1),
                new V(-0.25, 0.26,-0.34, 1), new V(-0.44, 0.64, 0.22, 1), new V(-0.25, 0.69,-0.05, 1),
                new V(-0.16, 0.69, 0.17, 1), new V(-0.11,  1.0,-0.37, 1), new V( 0.11,  1.0,-0.37, 1));
    this.F = [new T( this.B[ 15], this.B[ 55], this.B[ 36]), new T( this.B[  8], this.B[  5], this.B[ 52], this.B[ 10]), new T( this.B[  9], this.B[ 11], this.B[  3]),
                new T( this.B[ 79], this.B[ 99], this.B[123], this.B[120]), new T( this.B[  5], this.B[ 72], this.B[119], this.B[ 52]), new T( this.B[  8], this.B[  7], this.B[ 18]),
                new T( this.B[ 13], this.B[ 9], this.B[ 6]), new T( this.B[ 18], this.B[  7], this.B[  9]), new T( this.B[ 86], this.B[ 79], this.B[ 73]),
                new T( this.B[ 83], this.B[122], this.B[ 99], this.B[ 79]), new T( this.B[ 84], this.B[ 79], this.B[ 86]), new T( this.B[ 16], this.B[ 13], this.B[ 19]),
                new T( this.B[ 17], this.B[ 18], this.B[ 20]), new T( this.B[ 16], this.B[ 14], this.B[ 20]), new T( this.B[ 14], this.B[ 17], this.B[ 20]),
                new T( this.B[ 36], this.B[ 55], this.B[  5], this.B[  8]), new T( this.B[ 30], this.B[126], this.B[ 21], this.B[ 22]), new T( this.B[ 21], this.B[ 27], this.B[ 22]),
                new T( this.B[ 33], this.B[ 30], this.B[ 31]), new T( this.B[100], this.B[ 97], this.B[ 64], this.B[ 62]), new T( this.B[119], this.B[ 72], this.B[ 75], this.B[ 77]),
                new T( this.B[ 67], this.B[ 27], this.B[ 63]), new T( this.B[ 63], this.B[ 27], this.B[ 21]), new T( this.B[ 95], this.B[ 66], this.B[ 67]),
                new T( this.B[ 28], this.B[ 25], this.B[ 22], this.B[ 27]), new T( this.B[  2], this.B[ 70], this.B[121], this.B[ 54]), new T( this.B[ 89], this.B[ 92], this.B[ 95], this.B[ 94]),
                new T( this.B[ 72], this.B[122], this.B[103], this.B[ 75]), new T( this.B[ 61], this.B[ 57], this.B[124]), new T( this.B[ 32], this.B[ 56], this.B[ 57]),
                new T( this.B[ 31], this.B[ 23], this.B[ 33]), new T( this.B[ 31], this.B[ 30], this.B[ 22]), new T( this.B[ 59], this.B[ 62], this.B[ 33]),
                new T( this.B[ 53], this.B[ 33], this.B[ 56]), new T( this.B[ 57], this.B[ 56], this.B[ 23]), new T( this.B[ 64], this.B[ 97], this.B[125]),
                new T( this.B[ 45], this.B[ 42], this.B[ 43]), new T( this.B[ 34], this.B[ 29], this.B[ 39], this.B[ 40]), new T( this.B[101], this.B[107], this.B[106], this.B[ 96]),
                new T( this.B[ 68], this.B[ 29], this.B[ 52]), new T( this.B[ 77], this.B[102], this.B[107], this.B[101]), new T( this.B[ 40], this.B[ 47], this.B[ 38]),
                new T( this.B[ 39], this.B[ 42], this.B[ 41]), new T( this.B[ 47], this.B[ 49], this.B[ 50]), new T( this.B[ 46], this.B[ 47], this.B[ 50], this.B[ 51]),
                new T( this.B[ 47], this.B[ 48], this.B[ 49]), new T( this.B[ 45], this.B[ 41], this.B[ 42]), new T( this.B[ 43], this.B[ 46], this.B[ 51]),
                new T( this.B[ 43], this.B[ 51], this.B[ 45]), new T( this.B[117], this.B[114], this.B[113], this.B[118]), new T( this.B[  2], this.B[  3], this.B[  1]),
                new T( this.B[ 32], this.B[ 55], this.B[ 15], this.B[ 12]), new T( this.B[ 68], this.B[ 58], this.B[ 29]), new T( this.B[ 69], this.B[  1], this.B[  4]),
                new T( this.B[ 65], this.B[ 93], this.B[ 91], this.B[ 60]), new T( this.B[ 18], this.B[  9], this.B[ 13]), new T( this.B[ 80], this.B[ 87], this.B[ 84], this.B[ 81]),
                new T( this.B[ 13], this.B[  6], this.B[ 19]), new T( this.B[ 14], this.B[ 16], this.B[ 12]), new T( this.B[ 53], this.B[ 59], this.B[ 33]),
                new T( this.B[115], this.B[111], this.B[107], this.B[114]), new T( this.B[ 33], this.B[ 23], this.B[ 56]), new T( this.B[ 73], this.B[ 79], this.B[120], this.B[121]),
                new T( this.B[115], this.B[116], this.B[117], this.B[118]), new T( this.B[ 51], this.B[ 48], this.B[ 45]), new T( this.B[121], this.B[ 70], this.B[ 71]),
                new T( this.B[ 83], this.B[103], this.B[122]), new T( this.B[ 35], this.B[  7], this.B[  8], this.B[ 10]), new T( this.B[ 76], this.B[ 71], this.B[ 78]),
                new T( this.B[ 53], this.B[ 12], this.B[  6], this.B[ 54]), new T( this.B[ 54], this.B[  6], this.B[  9], this.B[  3]), new T( this.B[ 74], this.B[ 75], this.B[ 80]),
                new T( this.B[ 81], this.B[ 73], this.B[ 76]), new T( this.B[ 80], this.B[ 76], this.B[ 74]), new T( this.B[ 48], this.B[ 51], this.B[ 50], this.B[ 49]),
                new T( this.B[ 64], this.B[125], this.B[126]), new T( this.B[ 18], this.B[ 13], this.B[ 16], this.B[ 20]), new T( this.B[ 84], this.B[ 86], this.B[ 81]),
                new T( this.B[ 85], this.B[ 87], this.B[ 80]), new T( this.B[ 84], this.B[ 87], this.B[ 82]), new T( this.B[ 82], this.B[ 87], this.B[ 85]),
                new T( this.B[ 60], this.B[ 57], this.B[ 23], this.B[ 24]), new T( this.B[ 92], this.B[ 93], this.B[ 95]), new T( this.B[ 88], this.B[ 89], this.B[ 94]),
                new T( this.B[100], this.B[ 98], this.B[ 97]), new T( this.B[ 12], this.B[ 53], this.B[ 56], this.B[ 32]), new T( this.B[ 10], this.B[ 34], this.B[ 40], this.B[ 35]),
                new T( this.B[122], this.B[124], this.B[ 99]), new T( this.B[ 91], this.B[ 93], this.B[ 92], this.B[ 90]), new T( this.B[ 67], this.B[ 63], this.B[ 94]),
                new T( this.B[ 63], this.B[ 88], this.B[ 94]), new T( this.B[ 93], this.B[ 65], this.B[ 66]), new T( this.B[ 66], this.B[ 95], this.B[ 93]),
                new T( this.B[ 31], this.B[ 22], this.B[ 25], this.B[ 23]), new T( this.B[ 90], this.B[124], this.B[ 60], this.B[ 91]), new T( this.B[ 24], this.B[ 26], this.B[ 65], this.B[ 60]),
                new T( this.B[ 26], this.B[ 28], this.B[ 66]), new T( this.B[ 19], this.B[  6], this.B[ 12]), new T( this.B[ 60], this.B[124], this.B[ 57]),
                new T( this.B[ 33], this.B[ 62], this.B[ 64], this.B[ 30]), new T( this.B[ 98], this.B[100], this.B[ 90]), new T( this.B[ 98], this.B[ 89], this.B[ 97]),
                new T( this.B[ 59], this.B[100], this.B[ 62]), new T( this.B[ 76], this.B[ 73], this.B[121], this.B[ 71]), new T( this.B[120], this.B[123], this.B[100]),
                new T( this.B[124], this.B[ 90], this.B[123]), new T( this.B[ 39], this.B[ 29], this.B[ 58], this.B[ 42]), new T( this.B[  5], this.B[ 61], this.B[ 72]),
                new T( this.B[112], this.B[110], this.B[109]), new T( this.B[ 45], this.B[ 48], this.B[ 44], this.B[ 41]), new T( this.B[ 68], this.B[119], this.B[ 96]),
                new T( this.B[ 58], this.B[ 96], this.B[106], this.B[109]), new T( this.B[ 58], this.B[109], this.B[  4]), new T( this.B[107], this.B[105], this.B[114]),
                new T( this.B[106], this.B[108], this.B[109]), new T( this.B[114], this.B[117], this.B[116]), new T( this.B[ 38], this.B[ 47], this.B[ 46], this.B[ 37]),
                new T( this.B[114], this.B[116], this.B[115]), new T( this.B[112], this.B[109], this.B[108]), new T( this.B[110], this.B[118], this.B[113]),
                new T( this.B[110], this.B[112], this.B[118]), new T( this.B[ 67], this.B[ 66], this.B[ 28]), new T( this.B[ 71], this.B[105], this.B[ 78]),
                new T( this.B[ 68], this.B[ 96], this.B[ 58]), new T( this.B[ 24], this.B[ 23], this.B[ 25], this.B[ 26]), new T( this.B[ 80], this.B[ 81], this.B[ 76]),
                new T( this.B[ 81], this.B[ 86], this.B[ 73]), new T( this.B[ 82], this.B[ 79], this.B[ 84]), new T( this.B[112], this.B[108], this.B[111], this.B[115]),
                new T( this.B[ 67], this.B[ 94], this.B[ 95]), new T( this.B[ 90], this.B[100], this.B[123]), new T( this.B[ 48], this.B[ 47], this.B[ 40], this.B[ 44]),
                new T( this.B[118], this.B[112], this.B[115]), new T( this.B[  4], this.B[  1], this.B[ 37], this.B[ 42]), new T( this.B[ 15], this.B[ 36], this.B[ 17], this.B[ 14]),
                new T( this.B[ 54], this.B[  3], this.B[  2]), new T( this.B[  8], this.B[ 18], this.B[ 36]), new T( this.B[ 11], this.B[ 35], this.B[ 40], this.B[ 38]),
                new T( this.B[ 14], this.B[ 12], this.B[ 15]), new T( this.B[ 17], this.B[ 36], this.B[ 18]), new T( this.B[ 25], this.B[ 28], this.B[ 26]),
                new T( this.B[ 55], this.B[ 32], this.B[ 57]), new T( this.B[ 26], this.B[ 66], this.B[ 65]), new T( this.B[ 42], this.B[ 37], this.B[ 46], this.B[ 43]),
                new T( this.B[  2], this.B[  1], this.B[ 69], this.B[ 70]), new T( this.B[ 38], this.B[ 37], this.B[  1], this.B[  3]), new T( this.B[ 39], this.B[ 41], this.B[ 44], this.B[ 40]),
                new T( this.B[ 57], this.B[ 61], this.B[  5], this.B[ 55]), new T( this.B[ 58], this.B[  4], this.B[ 42]), new T( this.B[ 10], this.B[ 52], this.B[ 29], this.B[ 34]),
                new T( this.B[  3], this.B[ 11], this.B[ 38]), new T( this.B[  7], this.B[ 35], this.B[ 11], this.B[  9]), new T( this.B[ 67], this.B[ 28], this.B[ 27]),
                new T( this.B[113], this.B[114], this.B[105], this.B[104]), new T( this.B[  4], this.B[109], this.B[104], this.B[ 69]),
                new T( this.B[ 83], this.B[ 82], this.B[ 85], this.B[103]), new T( this.B[103], this.B[ 80], this.B[ 75]), new T( this.B[ 78], this.B[105], this.B[107], this.B[102]),
                new T( this.B[ 83], this.B[ 79], this.B[ 82]), new T( this.B[ 80], this.B[103], this.B[ 85]), new T( this.B[ 97], this.B[ 89], this.B[ 88], this.B[125]),
                new T( this.B[109], this.B[110], this.B[113], this.B[104]), new T( this.B[ 99], this.B[124], this.B[123]), new T( this.B[105], this.B[ 71], this.B[ 69], this.B[104]),
                new T( this.B[111], this.B[108], this.B[106], this.B[107]), new T( this.B[ 72], this.B[ 61], this.B[124], this.B[122]), new T( this.B[ 75], this.B[ 74], this.B[102], this.B[ 77]),
                new T( this.B[ 96], this.B[119], this.B[ 77], this.B[101]), new T( this.B[ 70], this.B[ 69], this.B[ 71]), new T( this.B[ 52], this.B[119], this.B[ 68]),
                new T( this.B[120], this.B[100], this.B[ 59]), new T( this.B[ 74], this.B[ 76], this.B[ 78], this.B[102]), new T( this.B[ 30], this.B[ 64], this.B[126]),
                new T( this.B[ 21], this.B[126], this.B[125], this.B[ 88]), new T( this.B[ 88], this.B[ 63], this.B[ 21]),
                new T( this.B[ 92], this.B[ 89], this.B[ 98], this.B[ 90]), new T( this.B[ 12], this.B[ 16], this.B[ 19]), new T(this.B[54],this.B[121],this.B[120],this.B[53])];
}}
function pF(n) { return parseFloat(n.toFixed(4)); }

class Cam { constructor(c,r) { this.C = c||new V; this.R = r||new V; }}

function multBit(v, m) { var r = [0,0,0,0];
    for (let i = 0; i < 4; i++) { r[i] = v.x*m[i][0] + v.y*m[i][1] + v.z*m[i][2] + v.w*m[i][3]; r[i] = pF(r[i]); } r[3] = abs(r[3]);
    return new V(r[0], r[1], r[2], r[3]);
}



function dotProd(v,b) { return v.x*b.x + v.y*b.y + v.z*b.z; }

function calcVew() { fov = 1/tan(fov*dg); zed = far/(far-nie); ratio = cvh/cvw; return [[fov*ratio,0,0,0],[0,fov,0,0],[0,0,zed,1],[0,0,-nie*zed,0]]; }

function fNormal(t) { const [a,b,c] = [t.V[0],t.V[1],t.V[2]], [v1,v2,v3,v4,v5,v6] = [pF(b.y-a.y), pF(c.z-b.z), pF(b.z-a.z), pF(c.y-b.y), pF(c.x-b.x), pF(b.x-a.x)];
    return normals(new V(pF(v1*v2-v3*v4),pF(v3*v5-v6*v2),pF(v6*v4-v1*v5))); }

function normals(v) { const n = pF(rt(dotProd(v,v))); return subFunc(v,n); }

function subFunc(v,n) { if(n < 1e-2) {return new V(); }else{ const x = pF(v.x/n), y = pF(v.y/n), z = pF(v.z/n); return new V(x,y,z); }}

function scaling(v,g) { if(g.type != V) { if(g == 0) { g = 1; } return new V(pF(v.x*g), pF(v.y*g), pF(v.z*g)); }else{ return new V(pF(v.x*g.x), pF(v.y*g.y), pF(v.z*g.z)); }}

function rotates(v,r) { const [x,y,z] = [pF(r.x*dg),pF(r.y*dg),pF(r.z*dg)],
    [cx,cy,cz,sx,sy,sz] = [pF(c(x)),pF(c(y)),pF(c(z)),pF(s(x)),pF(s(y)),pF(s(z))], [vysx,vzcx,szsy,vycx] = [v.y*sx,v.z*cx,sz*sy,v.y*cx];
    return new V(v.x*cz*cy+vysx*cz*sy-vycx*sz+v.z*sz*sx+vzcx*sy*cz,v.x*sz*cy+vycx*cz+vysx*szsy+vzcx*szsy-v.z*cz*sx,-sy*v.x+vysx*cy+vzcx*cy); }

function translt(v, c) { const x = pF(v.x + c.x), y = pF(v.y + c.y), z = pF(v.z + c.z); return new V(x,y,z); }

function project(v) { let r = multBit(v,view); return subFunc(r,r.w); }

function line(t) { ctx.beginPath(); ctx.moveTo(t.V.a.x+cvw/2,t.V.a.y+cvh/2); ctx.lineTo(t.V.b.x+cvw/2,t.V.b.y+cvh/2);
    ctx.lineTo(t.V.c.x+cvw/2,t.V.c.y+cvh/2); ctx.lineTo(t.V.a.x+cvw/2,t.V.a.y+cvh/2); ctx.closePath(); }

function line(f) {
    ctx.beginPath();
    ctx.moveTo(f[0].x + + cvw/2, f[0].y + + cvh/2);
    for (let i = 1; i < f.length; i++) { ctx.lineTo(f[i].x + cvw/2, f[i].y + cvh/2); }
    ctx.lineTo(f[0].x + + cvw/2, f[0].y + + cvh/2); ctx.closePath();
}

function drawPoly(obj,face) {
    const f = []; for (let v of face.V) { f.push({ x:v.x, y:v.y, z:v.z, w:v.w }); }
    for(let i=0; i < f.length; i++) { f[i] = translt(rotates(scaling(f[i],obj.S),obj.R),obj.C); }
    let cm = translt(f[0], new V(-cam.C.x,-cam.C.y,-cam.C.z)); 
    let nl = fNormal(new T(f[0],f[1],f[2]));
    let nf = dotProd(nl, cm);
    if (nf < 0) {
        let gi = dotProd(nl, lit), rgba = `rgba(0, ${gi * 150}, ${gi * 255}, 1)`;
        for(let i=0; i < f.length; i++) { f[i] = project(f[i]);
            f[i].x *= cvw / 22; f[i].y *= cvh / 22; f[i].x = pF(f[i].x); f[i].y = pF(f[i].y); }
        line(f);
        ctx.fillStyle = rgba;
        if (dbug) { ctx.stroke(); }
        ctx.fill();
    }
}

async function loadTextFile(filename) {
    try {
        const rtrn = await fetch(filename);
        if(!rtrn.ok) { throw new Error(`fetchFail of ${filename}`); }
        const txt = await rtrn.text(); return txt;
    }catch(error) { console.error(error); return null; }
}
//loadTextFile(filename).then( txt => { if (txt !== null) { } });

function drawObj(item) { for (let i = 0; i < item.F.length; i++) { drawPoly(item, item.F[i]); } }

var cv = document.getElementById('cv'), ctx = cv.getContext('2d'), cvw = cv.width = window.innerWidth, cvh = cv.height = window.innerHeight;
const c=Math.cos, s=Math.sin, tan=Math.tan, abs=Math.abs, rt=Math.sqrt, pi=Math.PI, dg=pi/180, fs = false, tr = true;
var nie=0.075, far=1, fov=70, dbug = fs, view = calcVew();
var cam = new Cam();
var demo = new I(new V(0,0,4));
var body = new Body(new V(0,0,1.5)); body.R = new V(0,0,150);
var lit = new V(0,0,-1); subFunc(lit);

function tick() {
    ctx.clearRect(0, 0, cvw, cvh);
    body.R.y++;
    drawObj(body);
}
var tid = setInterval(tick, 30);
window.addEventListener('beforeunload', function(e) { clearInterval(tid); });