/* !!! necesite un test de presence dans le panier pour grisé le boutton si deja present*/

const afficheProduit = (idArticle) => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page celui selctionné sur l'index*/
	
	const elements = JSON.parse(localStorage.getItem("cameras"));
	if (elements != null) {	
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
				html += "<img class=\"img-produit\" src=\""+image+"\">";
				html += "<h3>"+nom+"</h3>";
				html += "<label for=\"lentilles\">lentilles : </label>";
				html += "<select name=\"lentilles\" id=\"lentilles\">";
				for (let option of amelioration) {
					html += "<option value=\""+option+"\">"+option+"</option>";
				}				
				html += "</select>";
				html += "<p>"+description+"</p>";
				html += "<div class=\"prix\">Prix : "+prix+"€</div>";
				html += "<button class=\"bouton\" id=\"bouton\" type=\"button\"";
				html += ">Ajouter au panier</button><br /> <span id=\"deja-panier\"></span>";
				html += "</div>";
				document.getElementById("article").innerHTML = html;
				/* controle la presence de l'article dans le panier */
				controlPresencePanier(id);
			}
		}
	} else {
		console.error("Extraction impossible l'appareils photos du localstorage");
	}
} 
/* si le panier existe, on verifie si le produit est deja dedans */ 
const controlPresencePanier = (id) => {
	if (localStorage.getItem("panier")) {
		if (JSON.parse(localStorage.getItem("panier")).includes(id)) {
			document.getElementById("bouton").disabled = true;
			document.getElementById("deja-panier").innerHTML = "Cet article est déjà dans votre panier";
		}
	}
}

/* recupere l'article cliqué sur la page d'index qui est stocké dans le localStorage */
const idArticleSelectionne = localStorage.article;
/* affiche la fiche de l'article */
afficheProduit(idArticleSelectionne);
/* surveillance du clic sur le bonton ajouté au panier et gestion du cas ou il y est deja present */
document.getElementById("bouton").addEventListener("click", function (event) {
	let identifiant = document.getElementById("bouton").parentElement.getAttribute('id');
	var panier = [];
	document.getElementById("bouton").disabled = true;
	if (localStorage.panier) {
		if (/\[/.test(localStorage.getItem("panier"))) {
    		panier = JSON.parse(localStorage.getItem("panier"));
		}			
		if (Array.isArray(panier)) {
			if (panier.find(element => element == identifiant)) {
				document.getElementById("deja-panier").innerHTML = "Cet article est déjà dans votre panier.";
				return 0;
			} else {
				panier.push(identifiant);
			}
		}
	} else {
		panier = [identifiant]; 
	}
	localStorage.setItem("panier", JSON.stringify(panier));
	document.getElementById("deja-panier").innerHTML = "Cet article a été ajouté à votre panier.";
});

