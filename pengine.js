import * as _ from './camera.js';
import * as _ from './general.js';
import * as _ from './vectors.js';
var cv = document.getElementById("cv"), ct = cv.getContext("2d"),
    cw = cv.width = window.innerWidth,  ch = cv.height = window.innerHeight;
var fov = 90, /*Field of View*/ rat = ch/cw, /*Aspect Ratio*/ nie = 0.1, /*Near clip plane*/ far = 1000; /*Far clip plane*/
var cam = new Camera();

class Cube { constructor (S = V(1,1,1), R = V, P = V) { this.scale = S; this.rotation = R; this.position = P;
    this.V = [V(-1,-1,-1),V(-1, 1,-1),V( 1, 1,-1),V( 1,-1,-1), V( 1, 1, 1),V( 1,-1, 1),V(-1, 1, 1),V(-1,-1, 1)]
	this.T = [/*SOUTH*/T(0,1,2),T(0,2,3)/*EASTS*/,T(4,3,2),T(3,4,5)/*NORTH*/,T(5,4,6),T(5,6,7),
              /*WESTS*/T(7,6,1),T(7,1,0)/*ABOVE*/,T(1,6,4),T(1,4,2)/*BELOW*/,T(5,7,0),T(5,0,3)];
}}

class Mesh { constructor(p, S = V, R = V, P = V,) {
    Object.assign(this, {path:p, scale:S||V(1,1,1), rotation:R, position:P, V:[], F:[]}); this.read(this.path); }
    read(path) { loadTextFile(path).then( txt => { if (txt !== null) { let lines = txt.split("\n");
        for(let l of lines) { let s = l.split(" ");
            if(s[0] == "v") { this.V.push(V(pF(s[1]),pF(s[2]),pF(s[3]))); }else
            if(s[0] == "f") { this.F.push(T(pF(s[1]),pF(s[2]),pF(s[3]))); }
        }
    }});}
}

function T( a, b, c) { let t = { a:a = V, b:b = V, c:c = V }; return t; }

function Vector_IntersectPlane(plane_p, plane_n, lineStart, lineEnd)
{
	plane_n = normalVec(plane_n);
	let plane_d = -dtProduct(plane_n, plane_p);
	let ad = dtProduct(lineStart, plane_n);
	let bd = dtProduct(lineEnd, plane_n);
	let t = (-plane_d - ad) / (bd - ad);
	let lineStartToEnd = subVector(lineEnd, lineStart);
	let lineToIntersect = distribut(lineStartToEnd, t);
	return addVector(lineStart, lineToIntersect);
}

function Triangle_ClipAgainstPlane(plane_p, plane_n, in_tri)
{
	let out_tri1 = T();
	let out_tri2 = T();
	
	let result = { count: 0, t1: out_tri1, t2: out_tri2 };
	
	// Make sure plane normal is indeed normal
	plane_n = normalVec(plane_n);

	// Return signed shortest distance from point to plane, plane normal must be normalised
	function dist(p)
	{
		let n = normalVec(p);
		return (plane_n.x * p.x + plane_n.y * p.y + plane_n.z * p.z - dtProduct(plane_n, plane_p));
	};

	// Create two temporary storage arrays to classify points either side of plane
	// If distance sign is positive, point lies on "inside" of plane
	let inside_points = [];  let nInsidePointCount = 0;
	let outside_points = []; let nOutsidePointCount = 0;

	// Get signed distance of each point in triangle to plane
	d0 = dist(in_tri.p[0]);
	d1 = dist(in_tri.p[1]);
	d2 = dist(in_tri.p[2]);

	if (d0 >= 0) { inside_points[nInsidePointCount++] = in_tri.p[0]; }
	else { outside_points[nOutsidePointCount++] = in_tri.p[0]; }
	if (d1 >= 0) { inside_points[nInsidePointCount++] = in_tri.p[1]; }
	else { outside_points[nOutsidePointCount++] = in_tri.p[1]; }
	if (d2 >= 0) { inside_points[nInsidePointCount++] = in_tri.p[2]; }
	else { outside_points[nOutsidePointCount++] = in_tri.p[2]; }

	// Now classify triangle points, and break the input triangle into 
	// smaller output triangles if required. There are four possible
	// outcomes...

	if (nInsidePointCount == 0)
	{
		// All points lie on the outside of plane, so clip whole triangle
		// It ceases to exist
		result.count = 0;
		return result; // No returned triangles are valid
	}

	if (nInsidePointCount == 3)
	{
		// All points lie on the inside of plane, so do nothing
		// and allow the triangle to simply pass through
		result.t1 = in_tri;
		result.count = 1;
		return result; // Just the one returned original triangle is valid
	}

	if (nInsidePointCount == 1 && nOutsidePointCount == 2)
	{
		// Triangle should be clipped. As two points lie outside
		// the plane, the triangle simply becomes a smaller triangle

		// Copy appearance info to new triangle
    if (gPressed)
		{
    	out_tri1.col = "#f00";
		}
    else
    {
    	out_tri1.col = in_tri.col;
    }

		// The inside point is valid, so keep that...
		out_tri1.p[0] = inside_points[0];

		// but the two new points are at the locations where the 
		// original sides of the triangle (lines) intersect with the plane
		out_tri1.p[1] = Vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[0]);
		out_tri1.p[2] = Vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[1]);

		result.t1 = out_tri1;
		result.count = 1;
		
		return result; // Return the newly formed single triangle
	}

	if (nInsidePointCount == 2 && nOutsidePointCount == 1)
	{
		// Triangle should be clipped. As two points lie inside the plane,
		// the clipped triangle becomes a "quad". Fortunately, we can
		// represent a quad with two new triangles

		// Copy appearance info to new triangles
    if (gPressed)
		{
    	out_tri1.col = "#0f0"; //in_tri.col;
			out_tri2.col = "#00f"; //in_tri.col;
		}
    else
    {
    	out_tri1.col = in_tri.col;
			out_tri2.col = in_tri.col;
    }
    
		// The first triangle consists of the two inside points and a new
		// point determined by the location where one side of the triangle
		// intersects with the plane
		out_tri1.p[0] = inside_points[0];
		out_tri1.p[1] = inside_points[1];
		out_tri1.p[2] = Vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[0]);

		// The second triangle is composed of one of he inside points, a
		// new point determined by the intersection of the other side of the 
		// triangle and the plane, and the newly created point above
		out_tri2.p[0] = inside_points[1];
		out_tri2.p[1] = out_tri1.p[2];
		out_tri2.p[2] = Vector_IntersectPlane(plane_p, plane_n, inside_points[1], outside_points[0]);

		result.t1 = out_tri1;
		result.t2 = out_tri2;
		result.count = 2;
		
		return result; // Return two newly formed triangles which form a quad
	}
}

function OnUserUpdate(fElapsedTime)
{
	if(upPressed)
		camPos.y += 8.0 * fElapsedTime;
	if(dnPressed)
		camPos.y -= 8.0 * fElapsedTime;
	if(lfPressed)
		camPos.x -= 8.0 * fElapsedTime;
	if(rtPressed)
		camPos.x += 8.0 * fElapsedTime;
	
	let vForward = distribut(camDir, 8.0 * fElapsedTime);
	
	if(wPressed)
		camPos = addVector(camPos, vForward);
	if(sPressed)
		camPos = subVector(camPos, vForward);
	if(aPressed)
		yaw -= 1.0 * fElapsedTime;
	if(dPressed)
		yaw += 1.0 * fElapsedTime;

	let matRot = axiRotation(V(0,0,0));
	
	let matTrans = translate(0, 0, 16.0);
	
	let matWorld = identityM();	// Form World Matrix
	matWorld =matrixMatrix(matRot, matTrans); // Transform by translate
	
    cam.updateCam();

	let vecTrianglesToRaster = [];

    cam.projected();
	
	// Draw Triangles
	for(i=0; i<meshCube.length; i++)
	{
		let trig = meshCube[i];
		let triProjected = T();
		let triTransformed = T();
		let triViewed = T();
		
		// world matrix transform
        for(let i = 0; i < 3; i++) { triTransformed[i] = matrixVector(matWorld, trig[i]);   }
		triTransformed.a = matrixVector(matWorld, trig.a);
		triTransformed.b = matrixVector(matWorld, trig.b);
		triTransformed.c = matrixVector(matWorld, trig.c);
		
		// Calculate triangle normal
		// get lines either side of triangle
		let line1 = subVector(triTransformed.p[1], triTransformed.p[0]);
		let line2 = subVector(triTransformed.p[2], triTransformed.p[0]);
		
		// Take cross product of lines to get normal to triangle surface
		let normal = crossProd(line1, line2);
		
		// Normally you normalize a normal
		normal = normalVec(normal);
		
		// Get Ray from triangle to camera
		let vCameraRay = subVector(triTransformed.p[0], cam.position);
		
		// If ray is aligned with normal, then triangle is visible
		if (dtProduct(normal, vCameraRay) < 0 )
		{			
			// Illumination
			let light_direction = V(0, 0, -1.0);
			light_direction = normalVec(light_direction);
			
			// How aligned are light direction and triangle surface normal?
			let dp = Math.max(0.1, dtProduct(light_direction, normal));
			
			// choose colours as required
			triTransformed.col = GetColour(dp);
			
			// Convert World Space --> View Space
			triViewed.p[0] = matrixVector(cam.inverse, triTransformed.p[0]);
			triViewed.p[1] = matrixVector(cam.inverse, triTransformed.p[1]);
			triViewed.p[2] = matrixVector(cam.inverse, triTransformed.p[2]);
			triViewed.col = triTransformed.col;
			
			// Clip Viewed Triangle against near plane, this could form two additional
			// additional triangles. 
			let nClippedTriangles = 0;
			let clipped = [];
			let res = Triangle_ClipAgainstPlane(V( 0, 0, 0.1 ), V( 0, 0, 1.0 ), triViewed);
			
			nClippedTriangles = res.count;
			clipped[0] = res.t1;
			clipped[1] = res.t2;

			// We may end u with multiple triangles form the clip, so project as
			// required
			for (n = 0; n < nClippedTriangles; n++)
			{
				// Project triangles from 3D --> 2D
				triProjected.p[0] = matrixVector(cam.projection, clipped[n].p[0]);
				triProjected.p[1] = matrixVector(cam.projection, clipped[n].p[1]);
				triProjected.p[2] = matrixVector(cam.projection, clipped[n].p[2]);
				triProjected.col = clipped[n].col;

				// Scale into view, we moved the normalising into cartesian space
				// out of the matrix.vector function from the previous videos, so
				// do this manually
				triProjected.p[0] = dividends(triProjected.p[0], triProjected.p[0].w);
				triProjected.p[1] = dividends(triProjected.p[1], triProjected.p[1].w);
				triProjected.p[2] = dividends(triProjected.p[2], triProjected.p[2].w);

				// X/Y are inverted so put them back
				triProjected.p[0].x *= -1.0;
				triProjected.p[1].x *= -1.0;
				triProjected.p[2].x *= -1.0;
				triProjected.p[0].y *= -1.0;
				triProjected.p[1].y *= -1.0;
				triProjected.p[2].y *= -1.0;

				// Offset verts into visible normalised space
				let vOffsetView = V( 1,1,0 );
				triProjected.p[0] = addVector(triProjected.p[0], vOffsetView);
				triProjected.p[1] = addVector(triProjected.p[1], vOffsetView);
				triProjected.p[2] = addVector(triProjected.p[2], vOffsetView);
				triProjected.p[0].x *= 0.5 * ScreenWidth();
				triProjected.p[0].y *= 0.5 * ScreenHeight();
				triProjected.p[1].x *= 0.5 * ScreenWidth();
				triProjected.p[1].y *= 0.5 * ScreenHeight();
				triProjected.p[2].x *= 0.5 * ScreenWidth();
				triProjected.p[2].y *= 0.5 * ScreenHeight();

				// Store triangle for sorting
				vecTrianglesToRaster.push(triProjected);
			}
		}		
	}
	
	// sort triangles from front to back
	vecTrianglesToRaster.sort(function(t1, t2)
	{
		let z1 = (t1.p[0].z + t1.p[1].z + t1.p[2].z) / 3.0;
		let z2 = (t2.p[0].z + t2.p[1].z + t2.p[2].z) / 3.0;
		return z1 - z2;
	});
	
	
	for(i=0; i<vecTrianglesToRaster.length; i++)
	{
		let triToRaster = vecTrianglesToRaster[i];
		
		// Clip triangles against all four screen edges, this could yield
		// a bunch of triangles, so create a queue that we traverse to 
		//  ensure we only test new triangles generated against planes
		let clipped = [];
		let listTriangles = [];

		// Add initial triangle
		listTriangles.push(triToRaster);
		let nNewTriangles = 1;

		for (p = 0; p < 4; p++)
		{
			let nTrisToAdd = 0;
			while (nNewTriangles > 0)
			{
				// Take triangle from front of queue
				let test = listTriangles.shift();
				if(typeof test == "undefined")
				{
					console.log("no objects");
					break;
				}
				//listTriangles.pop();
				nNewTriangles--;

				// Clip it against a plane. We only need to test each 
				// subsequent plane, against subsequent new triangles
				// as all triangles after a plane clip are guaranteed
				// to lie on the inside of the plane. I like how this
				// comment is almost completely and utterly justified
				let res = {};
				switch (p)
				{
				case 0:	
					res = Triangle_ClipAgainstPlane(V( 0, 0, 0 ), V( 0, 1.0, 0 ), test); 
					break;
				case 1:	
					res = Triangle_ClipAgainstPlane(V( 0, ScreenHeight() - 1, 0 ), V( 0, -1.0, 0 ), test); 
					break;
				case 2:	
					res = Triangle_ClipAgainstPlane(V( 0, 0, 0 ), V( 1.0, 0, 0 ), test); 
					break;
				case 3:	
					res = Triangle_ClipAgainstPlane(V( ScreenWidth() - 1, 0, 0 ), V( -1.0, 0, 0 ), test); 
					break;
				}

				nTrisToAdd = res.count;
				clipped[0] = res.t1;
				clipped[1] = res.t2;
				
				// Clipping may yield a variable number of triangles, so
				// add these new ones to the back of the queue for subsequent
				// clipping against next planes
				for (w = 0; w < nTrisToAdd; w++)
					listTriangles.push(clipped[w]);
			}
			nNewTriangles = listTriangles.length;
		}
		
		for(t = 0; t < listTriangles.length; t++)
		{
			let trig = listTriangles[t];
			// Rasterize triangle
			FillTriangle(ct, 
				trig.p[0].x, trig.p[0].y,
				trig.p[1].x, trig.p[1].y,
				trig.p[2].x, trig.p[2].y, trig.col);
	/*			
			DrawTriangle(ct, 
				trig.p[0].x, trig.p[0].y,
				trig.p[1].x, trig.p[1].y,
				trig.p[2].x, trig.p[2].y, "#000");
	*/
		}
	}
}

function DrawTriangle(ct, x1, y1, x2, y2, x3, y3, color)
{
	ct.lineWidth = 1;
	ct.strokeStyle = color;
	ct.beginPath();
	
	ct.moveTo(x1, y1);
	ct.lineTo(x2, y2);	
	ct.lineTo(x3, y3);		
	ct.lineTo(x1, y1);	
	ct.stroke();
}

function FillTriangle(ct, x1, y1, x2, y2, x3, y3, color)
{
	ct.lineWidth = 1;
	ct.fillStyle = color;
	ct.beginPath();
	
	ct.moveTo(x1, y1);
	ct.lineTo(x2, y2);	
	ct.lineTo(x3, y3);		
	ct.lineTo(x1, y1);	
	ct.fill();
}

// Helper functions for Javascript

OnUserCreate();

window.addEventListener("keydown", keyDnHandler);
window.addEventListener("keyup", keyUpHandler);

var wPressed = false;
var sPressed = false;
var aPressed = false;
var dPressed = false;
var upPressed = false;
var dnPressed = false;
var lfPressed = false;
var rtPressed = false;

var gPressed = false;

function keyDnHandler(e)
{
	console.log(e.key + " pressed");
	if(e.key === "w")
		wPressed = true;
	else if(e.key === "a")
		aPressed = true;
	else if(e.key === "s")
		sPressed = true;
	else if(e.key === "d")
		dPressed = true;
	else if(e.key === "ArrowUp")
		upPressed = true;
	else if(e.key === "ArrowDown")
		dnPressed = true;
	else if(e.key === "ArrowLeft")
		lfPressed = true;
	else if(e.key === "ArrowRight")
		rtPressed = true;
  else if(e.key === "g")
		gPressed = !gPressed;

}


function keyUpHandler(e)
{
	console.log(e.key + " released");
	if(e.key === "w")
		wPressed = false;
	else if(e.key === "a")
		aPressed = false;
	else if(e.key === "s")
		sPressed = false;
	else if(e.key === "d")
		dPressed = false;
	else if(e.key === "ArrowUp")
		upPressed = false;
	else if(e.key === "ArrowDown")
		dnPressed = false;
	else if(e.key === "ArrowLeft")
		lfPressed = false;
	else if(e.key === "ArrowRight")
		rtPressed = false;

}

function ScreenHeight()
{
	return cv.height;
}

function ScreenWidth()
{
	return cv.width;
}

var prevTS = 0;
function Render(timestamp)
{
	//clear screen
	ct.clearRect(0, 0, cv.width, cv.height);
	
	// fixup timestamps and call OnUserUpdate
	OnUserUpdate((timestamp - prevTS) / 1000.0);
	prevTS = timestamp;
	window.requestAnimationFrame(Render);
}
window.requestAnimationFrame(Render);
