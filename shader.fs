
//Kevin AUBRY-ROMAN, Alexis DELOUCHE, Arthur GROUARD
precision mediump float;

varying vec2 tCoords;

uniform sampler2D uSampler;

uniform float seuilBas;
uniform float seuilHaut;
uniform float transparence;

uniform vec3 c1;
uniform vec3 c2;
uniform vec3 c3;
uniform vec3 c4;

uniform int fausseCoul;

vec3 calculcol (vec4 color){ // fonction calculant la couleur en fonction de la densité de l'image

    float v2 = 0.33;
    float v3 = 0.66;
    float v4 = 1.0;

    if (color.r < v2){
        float I = v2;
        float L = color.r;
        float T = L/I;
        return T * c1 + (1.0-T)*c2;
    }
    else if (color.r < v3){
        float I = v3-v2;
        float L = color.r - v2;
        float T = L/I;
        return T * c2 + (1.0-T)*c3;
    }
    else {
        float I = v4-v3;
        float L = color.r - v3;
        float T = L/I;
        return T * c3 + (1.0-T)*c4;
    }
}

void main(void) {
    vec4 col = texture2D(uSampler, vec2(tCoords.s, tCoords.t));

    if (fausseCoul==1){ //affichage en fausses cs si le bouton est checkbox est coché
	    if(col.r<seuilBas || col.r>seuilHaut) discard; // n'affiche pas les pixels se situant 
        //hors de la plage de valeur défini par les deux sliders 
	    gl_FragColor = vec4 (calculcol(col), col.r);//transparence
    }
    else{ // affichage en niiveaux de gris 
        if(col.r<seuilBas || col.r>seuilHaut) discard;
        gl_FragColor = vec4(col.xyz, transparence);
    }
	
}





