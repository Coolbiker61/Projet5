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

const controlePanier = () => {
	var panier = [];
	panier = localStorage.getItem("panier");
	/* verification de l'abscence de valeur vide et suppression de celle ci */
	while (panier.indexOf("\"\",") != -1) {
		panier = panier.replace("\"\",", '');
		localStorage.setItem("panier", panier);
	}
	while (panier.indexOf(",\"\"") != -1) {
		panier = panier.replace(",\"\"", '');
		localStorage.setItem("panier", panier);
	}
}


const affichePanier = () => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page ceux dans le panier*/
	let html = "";
	var panier = [];
	let prixTotal = 0;
	if (localStorage.panier) {
		controlePanier();
		if (/\[/.test(localStorage.getItem("panier"))) {
			panier = JSON.parse(localStorage.getItem("panier"));
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
								html += "<a class=\"bouton\" id=\"bouton"+id+"\" type=\"button\">Supprimer du panier</a>";
								html += "</div></div>";
							}
						}						
					} else {
						html += "</div>Erreur : format de panier non valide</div>";
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

const supprimerArticlePanier = (event) => {
	var identifiant = event.target.parentElement.parentElement.getAttribute('id');
	var panier = [];
	event.stopPropagation();
	if (localStorage.panier) {
		if (/\[/.test(localStorage.getItem("panier"))) {
    		panier = JSON.parse(localStorage.getItem("panier"));
		}
		if (Array.isArray(panier)) {
			if (panier.indexOf(identifiant) != -1) {
				panier.splice(panier.indexOf(identifiant), 1);
				if (panier.length == 0) {
					localStorage.removeItem("panier");
				} else {
					localStorage.setItem("panier", JSON.stringify(panier));
				}
			} else {
				console.error("suppression impossible, produit absent du panier");
				return 1;
			}
		} else {
			return 0;
		}
	}
	/* actualise la liste des articles */
	affichePanier();
	surveillanceArticlePanier();
}

const surveillanceArticlePanier = () => {
	if (localStorage.getItem("panier")) {
		if (/\[/.test(localStorage.getItem("panier"))) {
			contenuPanier = JSON.parse(localStorage.getItem("panier"));
			for(var id of contenuPanier){
console.log(document.getElementById("bouton"+id));
				document.getElementById("bouton"+id).addEventListener("click", supprimerArticlePanier.bind(event));
			}
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}


console.log(localStorage.getItem("panier"));
affichePanier();
surveillanceArticlePanier();