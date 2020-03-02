let prixTotal; /* contiendra le prix total des articles */

const affichePanier = () => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page ceux dans le panier*/
	let html = "";
	var panier = [];
	prixTotal = 0;
	/* teste l'existence du panier et si c'est un tableau*/
	if (localStorage.panier) {
		if (/\[/.test(localStorage.getItem("panier"))) {
			panier = JSON.parse(localStorage.getItem("panier"));
		}	
			/* recupere le tableau d'article et verifie qu'il n'est pas null */
			const elements = JSON.parse(localStorage.getItem("cameras"));
			if (elements != null) {	
				/* pour chaque article on verifie leur existance dans la panier */
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
								/* ajout du code html de  l'article avec ces details dans la variable html */
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
				console.error("Extraction impossible des appareils photos du localstorage");
			}
		html += "<div class=\"total\" id=\"total\">Total du panier : "+(prixTotal/100)+"€";
	} else {
		html += "<div class=\"vide\">Votre panier est vide</div>"
	}
	/* ajout du html au DOM */
	document.getElementById("contenu").innerHTML = html;
} 

/* recupére l'id de l'article qui a déclanché l'event et le supprime du panier */
const supprimerArticlePanier = (event) => {
	var identifiant = event.target.parentElement.parentElement.getAttribute('id');
	var panier = [];
	event.stopPropagation();
	/* verifie que le panier exitse et qu'il est bien un tableau */
	if (localStorage.panier) {
		if (/\[/.test(localStorage.getItem("panier"))) {
    		panier = JSON.parse(localStorage.getItem("panier"));
		}
		if (Array.isArray(panier)) {
			/* verifie que l'id de l'article est bien dans le panier et l'enléve */
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
	/* actualise la liste des articles*/
	affichePanier();
}

/* Ajoute l'ecoute des clic sur la ligne "supprimer du panier" de chaque article si le panier existe et est un tableau */
const surveillanceArticlePanier = () => {
	if (localStorage.getItem("panier")) {
		if (/\[/.test(localStorage.getItem("panier"))) {
			contenuPanier = JSON.parse(localStorage.getItem("panier"));
			for(var id of contenuPanier){
				document.getElementById("bouton"+id).addEventListener("click", supprimerArticlePanier.bind(event));
			}
		} else {
			return;
		}
	} else {
		return;
	}
}
/* executer apres clique sur le bouton valider */
const validationFormulaire = (event) => {
	/* arrête la propagation du clic et désactive son fonctionnement par défaut */
	event.stopPropagation();
	event.preventDefault();
	/* teste la presence d'un panier non vide */
	if (localStorage.getItem("panier") == null) {
		alert("Vous ne pouvez valider un panier vide !");
		return;
	} else {
		/* creation de l'objet contact */
		const contact = {
			firstName: document.getElementById("prenom").value,
			lastName: document.getElementById("nom").value,
			address: document.getElementById("adresse").value,
			city: document.getElementById("ville").value,
			email: document.getElementById("email").value
		}
		/* recuperation et convertion du contenu du panier */
		const panier = JSON.parse(localStorage.getItem("panier"));
		/* creation d'un tablau contenant l'objet contact et le tableau panier */
		var data = {
			contact: contact,
			products: panier
		};
		/* convertion du tableau en JSON */
		data = JSON.stringify(data);
		var requete = new XMLHttpRequest();
		/* ecoute des changement d'état de l'envoie */
		requete.onreadystatechange = function () {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 201 ) {
				localStorage.setItem("retourCommande", this.responseText);
			} else if (this.readyState == XMLHttpRequest.DONE && this.status != 201) {
				console.error("erreur d’envois du panier");
			}
		};
		requete.open("POST", "http://localhost:3000/api/cameras/order");
		requete.setRequestHeader("Content-Type", "application/json");
		requete.responseType = 'text';
		requete.send(data);
		/* redirige l'utilisateur vers la page confirm.html */
		window.location.href = "confirm.html";
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

/* verifie si le champ du formaulaire est valide et ajoute la class invalide le cas échéant sinon l'enléve */
const verifieValide = (elementForm) => {
	if (elementForm.validity.valid == false){
		if(elementForm.classList.contains("invalide") == false) {
			elementForm.classList.add("invalide");
		}
	} else {
		if(elementForm.classList.contains("invalide") == true) {
			elementForm.classList.remove("invalide");
		}
	}
}
/* surveille la modification des champs d formaulaire et declanche la fonction verifieValide() */
document.getElementById("nom").addEventListener('input', function (event) {
	verifieValide(event.target);
});
document.getElementById("prenom").addEventListener('input', function (event) {
	verifieValide(event.target);
});
document.getElementById("adresse").addEventListener('input', function (event) {
	verifieValide(event.target);
});
document.getElementById("ville").addEventListener('input', function (event) {
	verifieValide(event.target);
});
document.getElementById("email").addEventListener('input', function (event) {
	verifieValide(event.target);
});



