//Kevin AUBRY-ROMAN, Alexis DELOUCHE, Arthur GROUARD
// =====================================================
var gl;
var shadersLoaded = 0;
var vertShaderTxt;
var fragShaderTxt;
var shaderProgram = null;
var vertexBuffer;
var colorBuffer;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var objMatrix = mat4.create();
mat4.identity(objMatrix);
var texture = [];
var chemin;
var distance;
var sliderImageTorse;
var sliderImageCrane;
var sliderImageTorseMin;
var sliderImageCraneMin;
var distCenter = -1.5;


// =====================================================
function webGLStart() {
	var canvas = document.getElementById("WebGL-test");
	canvas.onmousedown = handleMouseDown;
	document.onmouseup = handleMouseUp;
	document.onmousemove = handleMouseMove;

	initGL(canvas);
	initBuffers();


	for (var i = 0; i<=23 ; i++){
		initTexture("Image/"+i+".jpg");
	}
	for (var i = 0; i<=369 ; i++){
		initTexture("MRI/IRM ("+i+").jpg");
	}
	// On initialise un texture composé de 2 dossiers d'images différentes
	// Cela va nous permettre d'afficher 2 différents lots de textures



	loadShaders('shader');

	gl.clearColor(0.7, 0.7, 0.7, 1.0);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.enable(gl.DEPTH_TEST);

	tick();
}

// =====================================================
function initGL(canvas)
{
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		gl.viewport(0, 0, canvas.width, canvas.height);
	} catch (e) {}
	if (!gl) {
		console.log("Could not initialise WebGL");
	}
}

// =====================================================
function initBuffers() {
	// Vertices (array)
	vertices = [
		-0.3, -0.3, 0.0,
		-0.3,  0.3, 0.0,
		 0.3,  0.3, 0.0,
		 0.3, -0.3, 0.0];
	vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	vertexBuffer.itemSize = 3;
	vertexBuffer.numItems = 4;
		
	// Texture coords (array)
	texcoords = [ 
		  1.0, 0.0,
		  1.0, 1.0,
		  0.0, 1.0,
		  0.0, 0.0 ];
	texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
	texCoordBuffer.itemSize = 2;
	texCoordBuffer.numItems = 4;
	

	
}


// =====================================================
function initTexture(textureI)
{
	var texImage = new Image();
	texImage.src = textureI;

    var id = texture.length;

	texture.push(gl.createTexture());
	texture[id].image = texImage;

	texImage.onload = function () {
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.bindTexture(gl.TEXTURE_2D, texture[id]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture[id].image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.uniform1i(shaderProgram.samplerUniform, 0);
		gl.activeTexture(gl.TEXTURE0);
	}
}


// =====================================================
function loadShaders(shader) {
	loadShaderText(shader,'.vs');
	loadShaderText(shader,'.fs');
}

// =====================================================
function loadShaderText(filename,ext) {   // technique car lecture asynchrone...
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
			if(ext=='.vs') { vertShaderTxt = xhttp.responseText; shadersLoaded ++; }
			if(ext=='.fs') { fragShaderTxt = xhttp.responseText; shadersLoaded ++; }
			if(shadersLoaded==2) {
				initShaders(vertShaderTxt,fragShaderTxt);
				shadersLoaded=0;
			}
    }
  }
  xhttp.open("GET", filename+ext, true);
  xhttp.send();
}

// =====================================================
function initShaders(vShaderTxt,fShaderTxt) {

	vshader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vshader, vShaderTxt);
	gl.compileShader(vshader);
	if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(vshader));
		return null;
	}

	fshader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fshader, fShaderTxt);
	gl.compileShader(fshader);
	if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(fshader));
		return null;
	}

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vshader);
	gl.attachShader(shaderProgram, fshader);

	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.log("Could not initialise shaders");
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.texCoordsAttribute = gl.getAttribLocation(shaderProgram, "texCoords");
	gl.enableVertexAttribArray(shaderProgram.texCoordsAttribute);
	
	shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
	
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

	//crée la place en mémoire pour enregistrer les données du slider
	shaderProgram.seuilBas=gl.getUniformLocation(shaderProgram,"seuilBas");
	shaderProgram.seuilHaut=gl.getUniformLocation(shaderProgram,"seuilHaut");

	// meme chose pour la couleur
	shaderProgram.couleur1=gl.getUniformLocation(shaderProgram,"couleur1");
	shaderProgram.couleur2=gl.getUniformLocation(shaderProgram,"couleur2");
	shaderProgram.couleur3=gl.getUniformLocation(shaderProgram,"couleur3");

	//et pour le bouton checkbox
	shaderProgram.fausseCoul=gl.getUniformLocation(shaderProgram,"fausseCoul");
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
     	vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	gl.vertexAttribPointer(shaderProgram.texCoordsAttribute,
      	texCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

}


// =====================================================
function setMatrixUniforms() {
	if(shaderProgram != null) {
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

		//envoie le contenu du slider vers le fichier de shader
		gl.uniform1f(shaderProgram.seuilBas, sliderSeuilBas.value);
		gl.uniform1f(shaderProgram.seuilHaut, sliderSeuilHaut.value);
		
		//meme chose pour les couleurs 
		gl.uniform3f(shaderProgram.couleur1, rgbCouleur1.r,rgbCouleur1.g, rgbCouleur1.b);
		gl.uniform3f(shaderProgram.couleur2, rgbCouleur2.r,rgbCouleur2.g, rgbCouleur2.b);
		gl.uniform3f(shaderProgram.couleur3, rgbCouleur3.r,rgbCouleur3.g, rgbCouleur3.b);

		//et pour le bouton checkbox
		gl.uniform1i(shaderProgram.fausseCoul, Checkboxfc);
	}
}

// =====================================================
function drawScene() {
	gl.clear(gl.COLOR_BUFFER_BIT);

    if(chemin == "Torse"){  // Si le checkbox est false alors la variable chemin sera "Torse" et on ne va afficher que le torse
        distance = 0.0015;
		if(shaderProgram != null) {

		    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		    mat4.identity(mvMatrix);
		    mat4.translate(mvMatrix, [0.0, 0.1, distCenter]);
		    mat4.multiply(mvMatrix, objMatrix);
		    setMatrixUniforms();
		    gl.bindTexture(gl.TEXTURE_2D, texture[24]);
		    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexBuffer.numItems);


        for (var i=sliderImageTorseMin;i<=sliderImageTorse;i++){//permet d'afficher toutes les textures charger en prenant compte des valeurs des slider
            mat4.translate(mvMatrix, [0.0, 0.0, distance]);// distance est une valeur faible pour donner un effet de 3D
            setMatrixUniforms(); //envoie les 2 matrices à la carte graphique
            gl.bindTexture(gl.TEXTURE_2D, texture[i]);
            gl.uniform1i(shaderProgram.samplerUniform, 0); //active le sampler numéro 0
            gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexBuffer.numItems);
        }
	}
	
    }
    else if (chemin == "Crane"){  // Si le checkbox est true alors la variable chemin sera "Crane" et on ne va afficher que le crane
        distance = 0.0125;
    

		if(shaderProgram != null) {

				mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
				mat4.identity(mvMatrix);
				mat4.translate(mvMatrix, [0.0, 0.1, distCenter]);
				mat4.multiply(mvMatrix, objMatrix);
				setMatrixUniforms();
				gl.bindTexture(gl.TEXTURE_2D, texture[sliderImageCraneMin]);
				gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexBuffer.numItems);


			for (var i=sliderImageCraneMin;i<=sliderImageCrane;i++){//permet d'afficher toutes les textures charger en prenant compte des valeurs des slider
				mat4.translate(mvMatrix, [0.0, 0.0, distance]);// distance est une valeur faible pour donner un effet de 3D
				setMatrixUniforms(); //envoie les 2 matrices à la carte graphique
				gl.bindTexture(gl.TEXTURE_2D, texture[i]);
				gl.uniform1i(shaderProgram.samplerUniform, 0); //active le sampler numéro 0
				gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexBuffer.numItems);
			}
		}
	}
}
