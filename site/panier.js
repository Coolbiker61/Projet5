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
								prixTotal += prix;
								prix /= 100;
								let id = article._id;
								
								html += "<div class=\"objet\"  id=\""+id+"\">";
								html += "<img class=\"img-panier\" src=\""+image+"\">";
								html += "<div class=\"details-panier\"><h3>"+nom+"</h3>";
								html += "<div class=\"prix\">Prix : "+prix+"€</div>";
								html += "<a class=\"bouton\" id=\"bouton\" type=\"button\">Supprimer du panier</a>";
								html += "</div></div>";
							}
						}						
					} else {
						if(article._id == panier) {
							let image = article.imageUrl;
							let nom = article.name;
							let prix = article.price;
							prixTotal += prix;
							prix /= 100;
							let id = article._id;
							
							html += "<div class=\"objet\"  id=\""+id+"\">";
							html += "<img class=\"img-panier\" src=\""+image+"\">";
							html += "<div class=\"details-panier\"><h3>"+nom+"</h3>";
							html += "<div class=\"prix\">Prix : "+prix+"€</div>";
							html += "<a class=\"bouton\" id=\"bouton\" type=\"button\">Supprimer du panier</a>";
							html += "</div></div>";
						}
					}
				}
			} else {
				afficherErreur(produit);
			}
		}
		html += "<div class\"total\" id=\"total\">Total : "+(prixTotal/100)+"€";
	} else {
		html += "<div class=\"vide\">Votre panier est vide</div>"
	}

	
	document.getElementById("contenu").innerHTML = html;
} 

const supprimerArticlePanier = (id) => {
	var panier;
	if (localStorage.panier) {
		if (/\,/.test(localStorage.getItem("panier"))) {
    		panier = JSON.parse(localStorage.getItem("panier"));
		} else {
			panier = localStorage.getItem("panier");
			panier = retire(panier);
		}
			
		if (Array.isArray(panier)) {
			if (panier.indexOf(id)) {
				panier.splice(panier.indexOf(id), 1);
			} else {
				/* erreur */
			}
		} else {
			localStorage.removeItem(panier);
		}
	}
}





affichePanier();

