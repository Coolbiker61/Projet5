let prixTotal; /* contiendra le prix total des articles */
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
	prixTotal = 0;
	if (localStorage.panier) {
		controlePanier();
		if (/\[/.test(localStorage.getItem("panier"))) {
			panier = JSON.parse(localStorage.getItem("panier"));
		}	
			const elements = JSON.parse(localStorage.getItem("cameras"));
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
								
								html += "<div class=\"objet panier\"  id=\""+id+"\">";
								html += "<img class=\"img-panier\" src=\""+image+"\">";
								html += "<div class=\"details-panier\"><h3>"+nom+"</h3>";
								html += "<div class=\"prix\">Prix : "+prix+"€</div>";
								html += "<a class=\"bouton\" id=\"bouton"+id+"\" type=\"button\"><img src=\"./img/croix.svg\" class=\"img-supprimer\">Supprimer du panier</a>";
								html += "</div></div>";
							}
						}						
					} else {
						html += "</div>Erreur : format de panier non valide</div>";
					}
				}
			} else {
				console.error("Extraction impossible l'appareils photos du localstorage");
			}
		html += "<div class=\"total\" id=\"total\">Total du panier : "+(prixTotal/100)+"€";
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
				document.getElementById("bouton"+id).addEventListener("click", supprimerArticlePanier.bind(event));
			}
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}
/* executer apres clique sur le bouton valider */
const validationFormulaire = (event) => {
	event.stopPropagation();
	event.preventDefault();
	if (localStorage.getItem("panier") == null) {
		alert("Vous ne pouvez valider un panier vide !");
		return;
	} else {
		const contact = {
			firstName: document.getElementById("prenom").value,
			lastName: document.getElementById("nom").value,
			address: document.getElementById("adresse").value,
			city: document.getElementById("ville").value,
			email: document.getElementById("email").value
		}
		const panier = JSON.parse(localStorage.getItem("panier"));
		var data = {
			contact: contact,
			products: panier
		};
		data = JSON.stringify(data);
		var requete = new XMLHttpRequest();
		requete.onreadystatechange = function () {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 201 ) {
				localStorage.setItem("retourCommande", this.responseText);
			} else if (this.readyState == XMLHttpRequest.DONE && this.status != 201) {
				console.error("erreur d'evoie du panier");
			}
		};
		requete.open("POST", "http://localhost:3000/api/cameras/order");
		requete.setRequestHeader("Content-Type", "application/json");
		requete.responseType = 'text';
		requete.send(data);
		/*window.location.href = "./confirm.html";*/
		/* tableau envoyer : tableau de strings intitulé "product_id"
retourne aussi un objet "contact" */
	}
}
/* affiche le contenu du panier */
affichePanier();
/* surveillance des lignes supprimer des articles du panier */
surveillanceArticlePanier();
/* surveillance du bouton valider du formulaire */
document.getElementById("valider-panier").addEventListener("click", function (event) {
 	validationFormulaire(event);
});



