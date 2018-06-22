var gl;

function testGLError(functionLastCalled) {

    var lastError = gl.getError();

    if (lastError != gl.NO_ERROR) {
        alert(functionLastCalled + " failed (" + lastError + ")");
        return false;
    }

    return true;
}

function initialiseGL(canvas) {
    try {
 // Try to grab the standard context. If it fails, fallback to experimental
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    catch (e) {
    }

    if (!gl) {
        alert("Unable to initialise WebGL. Your browser may not support it");
        return false;
    }

    return true;
}

var shaderProgram;

function initialiseBuffer() {
    var vertexData = [
/*

      //top
      -0.5, 0.5, -0.5,   1,1,1,
      -0.5, 0.5, 0.5,    1,1,1,
      0.5, 0.5, 0.5,     1,1,1,
      0.5, 0.5, -0.5,    1,1,1,

      //left
      -0.5, 0.5, 0.5,    1, 0, 0,
      -0.5, -0.5, 0.5,   1, 0, 0,
      -0.5, -0.5, -0.5,  1, 0, 0,
      -0.5, 0.5, -0.5,   1, 0, 0,

      //right
      0.5, 0.5, 0.5,    0, 1, 1,
      0.5, -0.5, 0.5,    0, 1, 1,
      0.5, -0.5, -0.5,   0, 1, 1,
      0.5, 0.5, -0.5,    0, 1, 1,

      //front
      0.5, 0.5, 0.5,   0.3, 0,3, 0.3,
      0.5, -0.5, 0.5,  0.3, 0,3, 0.3,
      -0.5, -0.5, 0.5,  0.3, 0,3, 0.3,
      -0.5, 0.5, 0.5,  0.3, 0,3, 0.3,

      //back
      0.5, 0.5, -0.5,   0.8, 0,1, 0.2,
      0.5, -0.5, -0.5,  0.8, 0,1, 0.2,
      -0.5, -0.5, -0.5, 0.8, 0,1, 0.2,
      -0.5, 0.5, -0.5,  0.8, 0,1, 0.2,

      //bottom
      -0.5, -0.5, -0.5, 0.2, 0.1, 0.6,
      -0.5, -0.5, 0.5, 0.2, 0.1, 0.6,
      0.5, -0.5, 0.5,   0.2, 0.1, 0.6,
      0.5, -0.5, -0.5,  0.2, 0.1, 0.6*/

      -0.5, 0.5, -0.5,   0, 0,
      -0.5, 0.5, 0.5,    0, 1,
      0.5, 0.5, 0.5,     1, 1,
      0.5, 0.5, -0.5,    1, 0,

      //left
      -0.5, 0.5, 0.5,    0, 0,
      -0.5, -0.5, 0.5,   1, 0,
      -0.5, -0.5, -0.5,  1, 1,
      -0.5, 0.5, -0.5,   0, 1,

      //right
      0.5, 0.5, 0.5,    1, 1,
      0.5, -0.5, 0.5,   0, 1,
      0.5, -0.5, -0.5,  0, 0,
      0.5, 0.5, -0.5,   1, 0,

      //front
      0.5, 0.5, 0.5,   1, 1,
      0.5, -0.5, 0.5,  1, 0,
      -0.5, -0.5, 0.5,  0, 0,
      -0.5, 0.5, 0.5,  0, 1,

      //back
      0.5, 0.5, -0.5,   0, 0,
      0.5, -0.5, -0.5,  0, 1,
      -0.5, -0.5, -0.5, 1, 1,
      -0.5, 0.5, -0.5,  1, 0,

      //bottom
      -0.5, -0.5, -0.5, 1, 1,
      -0.5, -0.5, 0.5,  1, 0,
      0.5, -0.5, 0.5,   0, 0,
      0.5, -0.5, -0.5,  0, 1,

/*
        //front
        -0.5, -0.5, 0.5, 1, 1, 1, 1,
         0.5, -0.5, 0.5, 1, 1, 1, 1,
        0.5, 0.5, 0.5, 1, 1, 1,1,
        -0.5, 0.5, 0.5, 1, 1, 1,1,

        //back
       -0.5, -0.5, -0.5, 1, 0, 0,1,
        0.5, -0.5, -0.5, 1, 0, 0,1,
        0.5, 0.5, -0.5, 1, 0, 0, 1,
        -0.5, 0.5, -0.5, 1, 0, 0, 1,

        //right
        0.5, -0.5, 0.5, 0, 1, 0, 1,
        0.5, -0.5, -0.5, 0, 1, 0, 1,
        0.5, 0.5, -0.5, 0, 1, 0, 1,
        0.5, 0.5, 0.5, 0, 1, 0, 1,

        //left
        -0.5, -0.5, 0.5, 0, 0, 1, 1,
        -0.5, -0.5, -0.5, 0, 0, 1, 1,
        -0.5, 0.5, -0.5, 0, 0, 1, 1,
        -0.5, 0.5, 0.5, 0, 0, 1, 1,

        //top
        -0.5, 0.5, 0.5, 1, 1, 0, 1,
        0.5, 0.5, 0.5, 1, 1, 0, 1,
        0.5, 0.5, -0.5, 1, 1, 0, 1,
        -0.5, 0.5, -0.5, 1, 1, 0, 1,

        //bottom
        -0.5, -0.5, 0.5, 0, 1, 1, 1,
        0.5, -0.5, 0.5, 0, 1, 1, 1,
        0.5, -0.5, -0.5, 0, 1, 1, 1,
        -0.5, -0.5, -0.5, 0, 1, 1, 1


//front
-0.5, -0.5, 0.5, 1, 1, 1, 1,
 0.5, -0.5, 0.5, 1, 1, 1, 1,
0.5, 0.5, 0.5, 1, 1, 1,1,
-0.5, 0.5, 0.5, 1, 1, 1,1,

//back
-0.5, -0.5, -0.5, 1, 0, 0,1,
0.5, -0.5, -0.5, 1, 0, 0,1,
0.5, 0.5, -0.5, 1, 0, 0, 1,
-0.5, 0.5, -0.5, 1, 0, 0, 1,

//right
0.5, -0.5, 0.5, 0, 1, 0, 1,
0.5, -0.5, -0.5, 0, 1, 0, 1,
0.5, 0.5, -0.5, 0, 1, 0, 1,
0.5, 0.5, 0.5, 0, 1, 0, 1,

//left
-0.5, -0.5, 0.5, 0, 0, 1, 1,
-0.5, -0.5, -0.5, 0, 0, 1, 1,
-0.5, 0.5, -0.5, 0, 0, 1, 1,
-0.5, 0.5, 0.5, 0, 0, 1, 1,

//top
-0.5, 0.5, 0.5, 1, 1, 0, 1,
0.5, 0.5, 0.5, 1, 1, 0, 1,
0.5, 0.5, -0.5, 1, 1, 0, 1,
-0.5, 0.5, -0.5, 1, 1, 0, 1,

//bottom
-0.5, -0.5, 0.5, 0, 1, 1, 1,
0.5, -0.5, 0.5, 0, 1, 1, 1,
0.5, -0.5, -0.5, 0, 1, 1, 1,
-0.5, -0.5, -0.5, 0, 1, 1, 1
*/
  ];




    var indexData = [
      //top
        0, 1, 2,
        0, 2, 3,



        //left
        5, 4, 6,
        6, 4, 7,

        //right
        8, 9, 10,
        8, 10, 11,

        //front
        13, 12, 14,
        15, 14, 12,

        //back
        16, 17, 18,
        16, 18, 19,

        //bottom
        21, 20, 22,
        22, 20, 23
];

    // Generate a buffer object
    gl.vertexBuffer = gl.createBuffer();

    // Bind buffer as a vertex buffer so we can fill it with data
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);



    // Generate a buffer object
    gl.indexBuffer = gl.createBuffer();

    // Bind buffer as a vertex buffer so we can fill it with data
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.indexBuffer);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);



    return testGLError("initialiseBuffers");
}



//gl_FragColor = texture2D(sampler, fragTexCoord);
function initialiseShaders(num) {
  if(num==0){
    var fragmentShaderSource = '\
       precision mediump float; \
       varying vec2  fragTexCoord; \
       uniform sampler2D sampler;\
 			void main(void) \
 			{ \
 				gl_FragColor = texture2D(sampler, fragTexCoord); \
 			}';


  }
if(num==1){
    var fragmentShaderSource = '\
      precision mediump float; \
      varying vec2  fragTexCoord; \
      uniform sampler2D sampler;\
			void main(void) \
			{ \
				 vec4 frameColor=texture2D(sampler, fragTexCoord);\
         gl_FragColor=vec4(1.0-frameColor.r, 1.0-frameColor.g, 1.0-frameColor.b, \
         1.0-frameColor.a);\
			}';

}
if(num==2){

          var fragmentShaderSource = '\
            precision mediump float; \
            varying vec2  fragTexCoord; \
            uniform sampler2D sampler;\
            uniform float uTime;\
            const float speed=15.0;\
            const float magnitude=0.015;\
      			void main(void) \
      			{ \
              vec2 wavyCoord;\
              wavyCoord.s=fragTexCoord.s + (sin(uTime+fragTexCoord.t*speed)\
            *magnitude);\
            wavyCoord.t=fragTexCoord.t + (cos(uTime+fragTexCoord.s*speed)\
          *magnitude);\
          vec4 frameColor=texture2D(sampler,wavyCoord);\
          gl_FragColor=frameColor;\
      			}';
          }

    if(num==3){
      var fragmentShaderSource = '\
      precision mediump float; \
        varying vec2  fragTexCoord; \
        uniform sampler2D sampler;\
        uniform sampler2D noiseSampler;\
        uniform vec2 inversetexturesize;\
        uniform float time;\
        const float grainIntensity=0.2;\
        const float scrollspeed=4000.0;\
        void main(void) \
        { \
          vec4 frameColor=texture2D(sampler, fragTexCoord);\
          vec4 grain = texture2D(noiseSampler, fragTexCoord*2.0 +\
      time * scrollspeed * inversetexturesize);\
          gl_FragColor=frameColor-(grain*grainIntensity);\
        }';

    }

    gl.fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(gl.fragShader, fragmentShaderSource);
    gl.compileShader(gl.fragShader);
    if (!gl.getShaderParameter(gl.fragShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the fragment shader.\n" + gl.getShaderInfoLog(gl.fragShader));
        return false;
    }

    var vertexShaderSource = '\
      precision mediump float; \
			attribute highp vec3 myVertex; \
			attribute vec2 verTexCoord; \
      varying vec2 fragTexCoord; \
			uniform mediump mat4 Pmatrix; \
			uniform mediump mat4 Vmatrix; \
			uniform mediump mat4 Mmatrix; \
			void main(void)  \
			{ \
				gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(myVertex, 1.0);\
				fragTexCoord = verTexCoord;\
			}';

    gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(gl.vertexShader, vertexShaderSource);
    gl.compileShader(gl.vertexShader);
    if (!gl.getShaderParameter(gl.vertexShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the vertex shader.\n" + gl.getShaderInfoLog(gl.vertexShader));
        return false;
    }

    gl.programObject = gl.createProgram();

    // Attach the fragment and vertex shaders to it
    gl.attachShader(gl.programObject, gl.fragShader);
    gl.attachShader(gl.programObject, gl.vertexShader);

    // Bind the custom vertex attribute "myVertex" to location 0
    gl.bindAttribLocation(gl.programObject, 0, "myVertex");
    gl.bindAttribLocation(gl.programObject, 1, "myColor");

    // Link the program
    gl.linkProgram(gl.programObject);

    if (!gl.getProgramParameter(gl.programObject, gl.LINK_STATUS)) {
        alert("Failed to link the program.\n" + gl.getProgramInfoLog(gl.programObject));
        return false;
    }

    gl.useProgram(gl.programObject);

    return testGLError("initialiseShaders");
}

// FOV, Aspect Ratio, Near, Far
function get_projection(angle, a, zMin, zMax) {
    var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
    return [
    	0.5/ang, 0 , 0, 0,
        0, 0.5*a/ang, 0, 0,
        0, 0, -(zMax+zMin)/(zMax-zMin), -1,
        0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 ];
}

var proj_matrix = get_projection(30, 1.0, 1, 5);
var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
// translating z
view_matrix[14] = view_matrix[14]-2;//zoom


function idMatrix(m) {
    m[0] = 1; m[1] = 0; m[2] = 0; m[3] = 0;
    m[4] = 0; m[5] = 1; m[6] = 0; m[7] = 0;
    m[8] = 0; m[9] = 0; m[10] = 1; m[11] = 0;
    m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1;
}

function changeEffect(n){
  initialiseShaders(n);
}

function mulMatrix(m, k) {
    m0=m[0];m1=m[1];m2=m[2];m3=m[3];m4=m[4];m5=m[5];m6=m[6];m7=m[7];
    m8=m[8];m9=m[9];m10=m[10];m11=m[11];m12=m[12];m13=m[13];m14=m[14];m15=m[15];
    k0=k[0];k1=k[1];k2=k[2];k3=k[3];k4=k[4];k5=k[5];k6=k[6];k7=k[7];
    k8=k[8];k9=k[9];k10=k[10];k11=k[11];k12=k[12];k13=k[13];k14=k[14];k15=k[15];

    a0 = k0 * m0 + k3 * m12 + k1 * m4 + k2 * m8;
    a4 = k4 * m0 + k7 * m12 + k5 * m4 + k6 * m8 ;
    a8 = k8 * m0 + k11 * m12 + k9 * m4 + k10 * m8 ;
    a12 = k12 * m0 + k15 * m12 + k13 * m4 + k14 * m8;

    a1 = k0 * m1 + k3 * m13 + k1 * m5 + k2 * m9;
    a5 = k4 * m1 + k7 * m13 + k5 * m5 + k6 * m9;
    a9 = k8 * m1 + k11 * m13 + k9 * m5 + k10 * m9;
    a13 = k12 * m1 + k15 * m13 + k13 * m5 + k14 * m9;

    a2 = k2 * m10 + k3 * m14 + k0 * m2 + k1 * m6;
    a6 =  k6 * m10 + k7 * m14 + k4 * m2 + k5 * m6;
    a10 =  k10 * m10 + k11 * m14 + k8 * m2 + k9 * m6;
    a14 = k14 * m10 + k15 * m14 + k12 * m2 + k13 * m6;

    a3 = k2 * m11 + k3 * m15 + k0 * m3 + k1 * m7;
    a7 = k6 * m11 + k7 * m15 + k4 * m3 + k5 * m7;
    a11 = k10 * m11 + k11 * m15 + k8 * m3 + k9 * m7;
    a15 = k14 * m11 + k15 * m15 + k12 * m3 + k13 * m7;

    m[0]=a0; m[1]=a1; m[2]=a2; m[3]=a3; m[4]=a4; m[5]=a5; m[6]=a6; m[7]=a7;
    m[8]=a8; m[9]=a9; m[10]=a10; m[11]=a11; m[12]=a12; m[13]=a13; m[14]=a14; m[15]=a15;
}

function scale(m, sx,sy, sz) {
   var sm = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1];
   sm[0] = sx; sm[5] = sy; sm[10] = sz;
   mulMatrix(m, sm);
}

function translate(m, tx,ty,tz) {
   var tm = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
   tm[12] = tx; tm[13] = ty; tm[14] = tz;
   mulMatrix(m, tm);
}


function rotateZ(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv0 = m[0], mv4 = m[4], mv8 = m[8];

    m[0] = c*m[0]-s*m[1];
    m[4] = c*m[4]-s*m[5];
    m[8] = c*m[8]-s*m[9];
    m[1]=c*m[1]+s*mv0;
    m[5]=c*m[5]+s*mv4;
    m[9]=c*m[9]+s*mv8;
}

function rotateX(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv1 = m[1], mv5 = m[5], mv9 = m[9];

    m[1] = m[1]*c-m[2]*s;
    m[5] = m[5]*c-m[6]*s;
    m[9] = m[9]*c-m[10]*s;

    m[2] = m[2]*c+mv1*s;
    m[6] = m[6]*c+mv5*s;
    m[10] = m[10]*c+mv9*s;
}

function rotateY(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv0 = m[0], mv4 = m[4], mv8 = m[8];

    m[0] = c*m[0]+s*m[2];
    m[4] = c*m[4]+s*m[6];
    m[8] = c*m[8]+s*m[10];

    m[2] = c*m[2]-s*mv0;
    m[6] = c*m[6]-s*mv4;
    m[10] = c*m[10]-s*mv8;
}

rotValue = 1;
animRotValue = 0.0;
transX = 0.0;
transY = 0.0;
transZ = 0.0;
scaleX = 1.0;
scaleY = 1.0;
scaleZ = 1.0;
frames = 1;

function initiateRotate()
{
	animRotValue = 0.1;
}

function trXinc(inc)
{
	transX += inc;
	document.getElementById("webTrX").innerHTML = "transX : " + transX.toFixed(4);
}

function trYinc(inc)
{
	transY += inc;
	document.getElementById("webTrY").innerHTML = "transY : " + transY.toFixed(4);
}

function trZinc(inc)
{
	transZ += inc;
	document.getElementById("webTrZ").innerHTML = "transZ : " + transZ.toFixed(4);
}

function scXinc(inc){
  scaleX += inc;
  document.getElementById("webScX").innerHTML = "scaleX : " + scaleX.toFixed(4);
}

function scYinc(inc){
  scaleY += inc;
  document.getElementById("webScY").innerHTML = "scaleY : " + scaleY.toFixed(4);
}

function scZinc(inc){
  scaleZ += inc;
  document.getElementById("webScZ").innerHTML = "scaleZ : " + scaleZ.toFixed(4);

}



function renderScene() {

    console.log("Frame "+frames+"\n");
    frames += 1 ;

    var Pmatrix = gl.getUniformLocation(gl.programObject, "Pmatrix");
    var Vmatrix = gl.getUniformLocation(gl.programObject, "Vmatrix");
    var Mmatrix = gl.getUniformLocation(gl.programObject, "Mmatrix");

     idMatrix(mov_matrix);
     scale(mov_matrix, scaleX, scaleY, scaleZ);
     rotateY(mov_matrix, rotValue);

     rotValue += animRotValue;
     translate(mov_matrix, transX, transY, transZ);


    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);

    if (!testGLError("gl.uniformMatrix4fv")) {
        return false;
    }


    var positionAttributeLocation=gl.getAttribLocation(gl.programObject, 'myVertex');
    var texCoordAttribLocation = gl.getAttribLocation(gl.programObject, 'verTexCoord')

    gl.vertexAttribPointer(
      positionAttributeLocation,
      3,
      gl.FLOAT,
      gl.FALSE,
      5*Float32Array.BYTES_PER_ELEMENT,
      0
    );

    gl.vertexAttribPointer(
      texCoordAttribLocation,
      2,
      gl.FLOAT,
      gl.FALSE,
      5*Float32Array.BYTES_PER_ELEMENT,
      3*Float32Array.BYTES_PER_ELEMENT

    );

gl.enableVertexAttribArray(positionAttributeLocation);

gl.enableVertexAttribArray(texCoordAttribLocation);

//create texture
var boxTexture = gl.createTexture();

gl.bindTexture(gl.TEXTURE_2D, boxTexture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
   document.getElementById('crate-image')
);
gl.bindTexture(gl.TEXTURE_2D, null);



    if (!testGLError("gl.vertexAttribPointer")) {
        return false;
    }
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.activeTexture(gl.TEXTURE0);

    gl.drawElements(gl.TRIANGLES,36, gl.UNSIGNED_SHORT, 0);

    if (!testGLError("gl.drawElements")) {
        return false;
    }

    return true;
}



function effect(){
  scaleX += 0.1;
  document.getElementById("webScX").innerHTML = "scaleX : " + scaleX.toFixed(4);

}


function main() {
    var canvas = document.getElementById("canvas");
    console.log("Start");

    if (!initialiseGL(canvas)) {
        return;
    }


    if (!initialiseBuffer()) {
        return;
    }

    n=0;
    if (!initialiseShaders(n)) {
        return;
    }

    // Render loop
    requestAnimFrame = (
	function () {
        //	return window.requestAnimationFrame || window.webkitRequestAnimationFrame
	//	|| window.mozRequestAnimationFrame ||
	   	return function (callback) {
			    // console.log("Callback is"+callback);
			    window.setTimeout(callback, 100, 10); };
    })();

    (function renderLoop(param) {
        if (renderScene()) {
            // Everything was successful, request that we redraw our scene again in the future
            requestAnimFrame(renderLoop);
        }
    })();
}
