//Kevin AUBRY-ROMAN, Alexis DELOUCHE, Arthur GROUARD
var sliderImage;
var sliderChoose;
var distance;

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
output1.innerHTML = sliderSeuilBas.value; // affichage de la valeur du slider

// mise à jour de la valeur du slider chaque fois qu'il est utilisé
sliderSeuilBas.oninput = function() {
  output1.innerHTML = this.value;
}

//////////////////////
// meme choses pour le second slider
var sliderSeuilHaut = document.getElementById("seuilHaut");
var output2 = document.getElementById("valeurSeuilHaut");
output2.innerHTML = sliderSeuilHaut.value;
sliderSeuilHaut.oninput = function() {
  output2.innerHTML = this.value;
}
/////////////////////////////////////////////////////////
 

/////////////////////////////////////////////
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
//fonction de conversion du valeur hexadecimal en valeur rgb
function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

var dropdown;
var choice; 
var layout; 
var c1=[1.0,0.0,0.0];//document.getElementById("couleur1"); c1=hexToRGB(c1.value);
var c2=[1.0,0.0,0.0];//ocument.getElementById("couleur2"); c2=hexToRGB(c2.value);
var c3=[1.0,0.0,0.0];//document.getElementById("couleur3"); c3=hexToRGB(c3.value);
var c4=[1.0,0.0,0.0];//document.getElementById("couleur4"); c4=hexToRGB(c4.value);

function updateColorPicker1() {
  c1 = document.getElementById("couleur1");
  c1 =hexToRGB(c1.value);
  return c1;
}

function updateColorPicker2() {
  c2 = document.getElementById("couleur2");
  c2 =hexToRGB(c2.value);
  return c2;
}

function updateColorPicker3() {
  c3 = document.getElementById("couleur3");
  c3 =hexToRGB(c3.value);
  return c3;
}

function updateColorPicker4() {
  c4 = document.getElementById("couleur4");
  c4 =hexToRGB(c4.value);
  return c4;
}

function setPalette(){
  dropdown = document.getElementById("dropdown");
  choice = dropdown.selectedIndex;
  layout = dropdown.options[choice].value; 

  if (layout == "Palette rouge"){
    c1=[1.0,0.0,0.0];
    c2=[1.0,0.0,0.0];
    c3=[1.0,0.0,0.0];
    c4=[1.0,0.0,0.0];
    console.log(c1,c2,c3,c4,"palette rouge");
  }
  else if (layout == "Palette verte"){
    c1=[0.0,1.0,0.0];
    c2=[0.0,1.0,0.0];
    c3=[0.0,1.0,0.0];
    c4=[0.0,1.0,0.0];
    console.log(c1,c2,c3,c4,"palette verte");
  }
  else if (layout == "Palette bleue"){
    c1=[0.0,0.0,1.0];
    c2=[0.0,0.0,1.0];
    c3=[0.0,0.0,1.0];
    c4=[0.0,0.0,1.0];
    console.log(c1,c2,c3,c4,"palette bleue");
  }
  else if (layout == "Autre"){
    c1=updateColorPicker1();
    c2=updateColorPicker2();
    c3=updateColorPicker3();
    c4=updateColorPicker4();
    console.log(c1,c2,c3,c4,"palette autre");
  }
}