/* !!! nécessite un test de présence dans le panier pour grisé le bouton si déjà présent*/

const afficheProduit = (idArticle) => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page celui selctionné sur l'index*/
	var elements;
	if (localStorage.getItem("cameras")) {
		elements = JSON.parse(localStorage.getItem("cameras"));
	} else {
		console.error("Recuperations des articles impossible");
		return;
	}
	if (elements != null && Array.isArray(elements)) {	
		for (var article of elements) {
			if(article._id == idArticle) {
				let html = ""; /* variable qui contiendra tout le code html */
				let image = article.imageUrl; /* image du produit */
				let nom = article.name; /* nom du produit */
				let amelioration = article.lenses;
				let prix = article.price;
				prix /= 100;
				let description = article.description;
				let id = article._id;
				
				html += "<div class=\"objet\"  id=\""+id+"\">";
				html += "<img class=\"img-produit img-article\" src=\""+image+"\">";
				html += "<div class=\"detail-article\" ><h3>"+nom+"</h3>";
				html += "<label for=\"lentilles\">lentilles : </label>";
				html += "<select name=\"lentilles\" id=\"lentilles\">";
				for (let option of amelioration) {
					html += "<option value=\""+option+"\">"+option+"</option>";
				}				
				html += "</select>";
				html += "<p>"+description+"</p>";
				html += "<div class=\"prix\">Prix : "+prix+"€</div>";
				html += "<button class=\"bouton\" id=\"bouton\" type=\"button\"";
				html += ">Ajouter au panier</button><span id=\"deja-panier\"></span>";
				html += "</div></div>";
				document.getElementById("article").innerHTML = html;
				/* contrôle la présence de l'article dans le panier */
				controlPresencePanier(id);
			}
		}
	} else {
		console.error("Extraction impossible des appareils photos du localstorage");
	}
} 
/* si le panier existe, on vérifie si le produit est déjà dedans */ 
const controlPresencePanier = (id) => {
	if (localStorage.getItem("panier")) {
		var panier = JSON.parse(localStorage.getItem("panier"));
		if (panier != null && Array.isArray(panier)) {
			if (panier.includes(id)) {
				document.getElementById("bouton").disabled = true;
				document.getElementById("deja-panier").innerHTML = "Cet article est déjà dans votre panier";
			}
		} else {
			console.error("Lecture du contenu du panier impossible");
		}

	}
}

/* récupère l'article cliqué sur la page d'index qui est stocké dans le localStorage */
const idArticleSelectionne = localStorage.article;
/* affiche la fiche de l'article */
afficheProduit(idArticleSelectionne);
/* surveillance du clic sur le bouton ajouté au panier et gestion du cas ou il y est déjà présent */
document.getElementById("bouton").addEventListener("click", function (event) {
	event.stopPropagation;
	let identifiant;
	if (document.getElementById("bouton").parentElement.parentElement.getAttribute('id')) {
		identifiant = document.getElementById("bouton").parentElement.parentElement.getAttribute('id');
	} else {
		console.error("Recuperation de l'id de l'article impossible");
		return;
	}
	var panier = [];
	document.getElementById("bouton").disabled = true;
	if (localStorage.panier) {
		panier = JSON.parse(localStorage.getItem("panier"));
		if (Array.isArray(panier)) {
			if (panier.find(element => element == identifiant)) {
				document.getElementById("deja-panier").innerHTML = "Cet article est déjà dans votre panier.";
				return 0;
			} else {
				panier.push(identifiant);
			}
		} else {
			console.error("Contenu du panier invalide");
			return;
		}
	} else {
		panier = [identifiant]; 
	}
	localStorage.setItem("panier", JSON.stringify(panier));
	document.getElementById("deja-panier").innerHTML = "Cet article a été ajouté à votre panier.";
});

