const listeProduits = ["cameras", "teddies", "furniture"];
/* recupere l'article cliqué sur la page d'index qui est stocké dans le localStorage */
const idArticleSelectionne = localStorage.article;

const afficheProduit = (idArticle) => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page celui selctionné sur l'index*/
	let html = "";
	for (let produit of listeProduits) {
		const elements = JSON.parse(localStorage.getItem(produit));
		if (elements != null) {	
			for (var article of elements) {
				if(article._id == idArticle) {
					let image = article.imageUrl;
					let nom = article.name;
					let amelioration = "";
					let prix = article.price;
					prix /= 100;
					let description = article.description;
					let id = article._id;
					switch (produit) {
						case "cameras":
							amelioration = article.lenses;
							break;
						case "teddies":
							amelioration = article.colors;
							break;
						case "furniture":
							amelioration = article.varnish;
							break;
						default:
							console.error("erreur recuperation des ameliorations");
							break;
					}
					html += "<div class=\"objet\"  id=\""+id+"\">";
					html += "<h3>"+nom+"</h3>";
					html += "<img class=\"img-produit\" src=\""+image+"\"><br>";
					html += "<label for=\"amelioration\">Options : </label>";
					html += "<select name=\"amelioration\" id=\"amelioration\">";
					for (let option of amelioration) {
						html += "<option value=\""+option+"\">"+option+"</option>";
					}
    				
					html += "</select>";
					html += "<p>"+description+"</p>";
					html += "<div class=\"prix\">Prix : "+prix+"€</div>";
					html += "<button class=\"bouton\" id=\"bouton\" type=\"button\">Ajouter au panier</button>";
					html += "</div>";
				}
			}
		} else {
			switch (produit) {
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
	}
	document.getElementById("article").innerHTML = html;
} 
/* supprime les " et le \ */
let retire = (chaine) => {
	chaine = chaine.substring(1);
	let position = chaine.indexOf('"');
	chaine = chaine.substring(0, (position));
	return chaine;
}

afficheProduit(idArticleSelectionne);

document.getElementById("bouton").addEventListener("click", function (event) {
	let identifiant = document.getElementById("bouton").parentElement.getAttribute('id');
	var panier;
	if (localStorage.panier) {
		if (/\,/.test(localStorage.getItem("panier"))) {
    		panier = JSON.parse(localStorage.getItem("panier"));
		} else {
			panier = localStorage.getItem("panier");
			panier = retire(panier);
		}
			
		if (Array.isArray(panier)) {
			if (panier.find(element => element == identifiant)) {
				return 0;
			} else {
				panier.push(identifiant);
			}
		} else {
			if (panier != identifiant) {
				let panierTemporaire = [panier, identifiant];
				panier = panierTemporaire;
			} else {
				return 0;
			}
			
		}
	} else {
		panier = identifiant; 
	}
	localStorage.setItem("panier", JSON.stringify(panier));
});

