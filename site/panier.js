/* tableau envoyer : tableau de strings intitulé "product_id"
retourne aussi un objet "contact" */

const listeProduits = ["cameras", "teddies", "furniture"];


const afficherErreur = (contenu) => {
	switch (contenu) {
			case "cameras":
				console.error("Extraction impossible l'appareils photos du localstorage");
				break;
			case "teddies":
				console.error("Extraction impossible l'ours en peluche du localstorage"); 
				break;
			case "furniture":
				console.error("Extraction impossible le meuble en chêne du localstorage");
			default:
				console.error('erreur produit inconnus');
				break;
		}
}
/* supprime les " et le \ */
let retire = (chaine) => {
	chaine = chaine.substring(1);
	let position = chaine.indexOf('"');
	chaine = chaine.substring(0, (position));
	return chaine;
}
const affichePanier = () => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page ceux dans le panier*/
	let html = "";
	var panier;
	let prixTotal = 0;
	if (localStorage.panier) {
		if (/\,/.test(localStorage.getItem("panier"))) {
    		panier = JSON.parse(localStorage.getItem("panier"));
		} else {
			panier = localStorage.getItem("panier");
			panier = retire(panier);
		}	
		
		
		for (let produit of listeProduits) {
			const elements = JSON.parse(localStorage.getItem(produit));
			if (elements != null) {	
				for (var article of elements) {
					if (Array.isArray(panier)) {
						for (let objet of panier) {
							if(article._id == objet) {
								let image = article.imageUrl;
								let nom = article.name;
								let prix = article.price;
								prix /= 100;
								let id = article._id;
								
								html += "<div class=\"objet\"  id=\""+id+"\">";
								html += "<h3>"+nom+"</h3>";
								html += "<img class=\"img-produit\" src=\""+image+"\"><br>";
								html += "<div class=\"prix\">Prix : "+prix+"€</div>";
								html += "<button class=\"bouton\" id=\"bouton\" type=\"button\">Ajouter au panier</button>";
								html += "</div>";
							}
						}						
					} else {
						if(article._id == panier) {
							let image = article.imageUrl;
							let nom = article.name;
							let prix = article.price;
							prix /= 100;
							let id = article._id;
							
							html += "<div class=\"objet\"  id=\""+id+"\">";
							html += "<h3>"+nom+"</h3>";
							html += "<img class=\"img-produit\" src=\""+image+"\"><br>";
							html += "<div class=\"prix\">Prix : "+prix+"€</div>";
							html += "<button class=\"bouton\" id=\"bouton\" type=\"button\">Ajouter au panier</button>";
							html += "</div>";
						}
					}
				}
			} else {
				afficherErreur(produit);
			}
		}
	} else {
		html += "<div class=\"vide\">Votre panier est vide</div>"
	}

	
	document.getElementById("contenu").innerHTML = html;
} 
affichePanier();

