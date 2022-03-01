//Kevin AUBRY-ROMAN, Alexis DELOUCHE, Arthur GROUARD
var sliderImageTorse;
var sliderChooseTorse;
var sliderImageCrane;
var sliderChooseeCrane;
var chemin = "Torse";

function updateImageTorse(val){
    sliderImageTorse=val;
    }//fonction qui récupere la valeur du slider "Nombre d'image du torse"

function chooseImageTorse(val){
    sliderImageTorseMin=val;
    }//fonction qui récupere la valeur du slider "Nombre d'image du torse minimum"

function updateImageCrane(val){
    sliderImageCrane=val;
    }//fonction qui récupere la valeur du slider "Nombre d'image du cranee"

function chooseImageCrane(val){
    sliderImageCraneMin=val;
    }//fonction qui récupere la valeur du slider "Nombre d'image du crane minimum"

function updatechemin(){ // var chemin modifiée par le checkbox
    if (document.getElementById("image").checked == true){
        chemin = "Crane";
    }
    else{
        chemin = "Torse";
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
 
//fonction de conversion du valeur hexadecimal en valeur rgb
function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

//recuperation des valeur hexa des colorpicker et conversion en rgb pour chacun des trois boutons

var couleur1 = document.getElementById("couleur1");
var rgbCouleur1 =hexToRGB(couleur1.value);

var couleur2 = document.getElementById("couleur2");
var rgbCouleur2 = hexToRGB(couleur2.value);

var couleur3 = document.getElementById("couleur3");
var rgbCouleur3 = hexToRGB(couleur3.value);

//recuperation de la valeur du checkbox
var checkbox = document.getElementById("check").checked;