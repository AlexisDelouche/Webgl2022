//Kevin AUBRY-ROMAN, Alexis DELOUCHE, Arthur GROUARD


var sliderImage;
var sliderChoose;
var distance;

let root = document.querySelector(':root');

function updateImage(val){
    sliderImage=val;
    }//fonction qui récupere la valeur du slider "Nombre d'image"

function chooseImage(val){
    sliderChoose=val;
    }//fonction qui récupere la valeur du slider "Image a afficher"

function choixtexture(){
	if (texture != []){
		for(var i=1;i<=texture.length;i++){
			gl.deleteTexture(texture[i]);
		}
		texture.length = 0;
    }
	if (document.getElementById("Crane").checked == true){
		for (var i = 1; i<=24 ; i++){
			initTexture("Image/Crane ("+i+").jpg");
		}
        distance = 0.0125;
    }
    else if(document.getElementById("Torse").checked == true){
		for (var i = 1; i<=370 ; i++){
			initTexture("MRI/IRM ("+i+").jpg");
		}
        distance = 0.0015;
    }
    else if(document.getElementById("Bras").checked == true){
        for (var i = 1; i<=214 ; i++){
            initTexture("ARM/ARM ("+i+").jpg");
        }
           distance = 0.0045;
       }
}

/////////////////////////////////////////////////////////////////////////////
var sliderSeuilBas = document.getElementById("seuilBas");
var output1 = document.getElementById("valeurSeuilBas");
output1.innerHTML = sliderSeuilBas.value;

sliderSeuilBas.oninput = function() {
  output1.innerHTML = this.value;
}

var sliderSeuilHaut = document.getElementById("seuilHaut");
var output2 = document.getElementById("valeurSeuilHaut");
output2.innerHTML = sliderSeuilHaut.value;
sliderSeuilHaut.oninput = function() {
  output2.innerHTML = this.value;
}

var sliderTransparence = document.getElementById("sliderTransparence");
var outputTransparence = document.getElementById("valeurTransparence");
outputTransparence.innerHTML = sliderSeuilHaut.value;
sliderTransparence.oninput=function(){
  outputTransparence.innerHTML = this.value;
}
/////////////////////////////////////////////////////////

var Checkboxfc =false;

function setFausseCouleur(){
  if (document.getElementById("check").checked == true){
    Checkboxfc=1;
  }
  else {
    Checkboxfc=0;
  }
}
/////////////////////////////////////////////////

var dropdown;
var choice; 
var layout; 
var c1 = document.getElementById("couleur1");
var c2 = document.getElementById("couleur2");
var c3 = document.getElementById("couleur3"); 
var c4 = document.getElementById("couleur4"); 

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : null;
}

c1=hexToRGB(c1.value);
c2=hexToRGB(c2.value);
c3=hexToRGB(c3.value);
c4=hexToRGB(c4.value);

function setCssCouleur(couleurcss,couleurhexa){
  root.style.setProperty(couleurcss,couleurhexa);
}

function updateColorPicker1() {
  c1 = document.getElementById("couleur1");
  setCssCouleur("--couleur1",c1.value);
  c1 =hexToRGB(c1.value); 
}

function updateColorPicker2() {
  c2 = document.getElementById("couleur2");
  setCssCouleur("--couleur2",c2.value);
  c2 =hexToRGB(c2.value);
}

function updateColorPicker3() {
  c3 = document.getElementById("couleur3");
  setCssCouleur("--couleur3",c3.value)
  c3 =hexToRGB(c3.value);
}

function updateColorPicker4() {
  c4 = document.getElementById("couleur4");
  setCssCouleur("--couleur4",c4.value)
  c4 =hexToRGB(c4.value);
}

function updateColorPicker5(colorPickerId, colorVal){
  document.getElementById(colorPickerId).value = colorVal;
}

function setPalette(){
  dropdown = document.getElementById("dropdown");
  choice = dropdown.selectedIndex;
  layout = dropdown.options[choice].value; 

  if (layout == "Palette rouge"){
    c1='#ff0000';
    c2='#ff0000';
    c3='#ff0000';
    c4='#ff0000';
  }
  else if (layout == "Palette verte"){
    c1='#00ff00';
    c2='#00ff00';
    c3='#00ff00';
    c4='#00ff00';
  }
  else if (layout == "Palette bleue"){
    c1='#0000ff';
    c2='#0000ff';
    c3='#0000ff';
    c4='#0000ff';
  }
  updateColorPicker5("couleur1",c1);setCssCouleur('--couleur1',c1); c1=hexToRGB(c1);
  updateColorPicker5("couleur2",c2);setCssCouleur('--couleur2',c2); c2=hexToRGB(c2);
  updateColorPicker5("couleur3",c3);setCssCouleur('--couleur3',c3); c3=hexToRGB(c3);
  updateColorPicker5("couleur4",c4);setCssCouleur('--couleur4',c4); c4=hexToRGB(c4);
}