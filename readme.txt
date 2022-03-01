Explication du Projet WebGL M1 GPHY option Imagerie


Membres du groupe : Kevin AUBRY-ROMAN, Alexis DELOUCHE, Arthur GROUARD

Nous avons implémenté les propriétés suivantes : 

    • Affichage en niveaux de gris par défaut, 
    • Affichage en fausses couleurs via un bouton « checkbox » (nécessite de recharger la page)
    • Possibilité de choisir la palette de couleurs (nécessite de recharger la page pour changer les couleurs)
    • Un système de translation avec SHIFT+souris
    • Système de seuillage pour visualiser les densités dans une plage de valeurs données (via 2 slider)
    • Visualisation d’un second jeu d’image (« crane ») via un bouton « checkbox » à cocher.  
    • Deux sliders pour chaque jeu de photos permettant d’afficher une plage donnée de photo


Nous avons eu du mal à comprendre comment utiliser la propriété « oninput » pour l’affichage en fausses couleurs et la modification des couleurs. 
Concernant l’affichage de la plage de photos, pour afficher l’image à l’écran il faut déplacer les deux sliders concerné  au moins une fois.
Pour le jeu de photo affichant un tronc, certaines images ne s’affichent pas. Nous n’avons pas compris pourquoi.  Les valeurs de sliders pour lesquels l’image 3D ne s’affiche vont de 100 à 239 pour le slider « nombre d’image de torse » et de 40 à 100 pour le slider « nombre d’image du torse minimum »

