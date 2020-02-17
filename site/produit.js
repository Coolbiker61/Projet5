const listeProduits = ["cameras", "teddies", "furniture"];

const idArticleSelectionne = localStorage.article;
const afficheProduit = () => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page celui cliqué*/
	let compteur = 0;
	let html = "";
	for (let produit of listeProduits) {
		const elements = JSON.parse(localStorage.getItem(produit));
		if (elements != null) {
			html += "<div class=\"categorie\"><span class=\"titre-cate\">";
			switch (produit) {
				case "cameras":
					html += "Nos appareils photos";
					break;
				case "teddies":
					html += "Nos ours en peluche";
					break;
				case "furniture":
					html += "Nos meubles en chênes";
					break;
				default:
					console.log('erreur produit inconnus');
					break;
			}
			html += "</span>";
			for (var article of elements) {
				let image = article.imageUrl;
				let nom = article.name;
				let prix = article.price;
				prix /= 100;
				let description = article.description;
				let id = article._id;

				html += "<a href=\"./produit.html\" id=\""+id+"\"><div class=\"objet\">";
				html += "<h3>"+nom+"</h3>";
				html += "<img class=\"img-produit\" src=\""+image+"\">";
				html += "<p>"+description+"</p>";
				html += "<div>Prix : "+prix+"€</div>";
				html += "</div></a>";
			}
			html += "</div>";
			compteur++;
		} else {
			switch (produit) {
				case "cameras":
					console.log("Extraction impossible des appareils photos du localstorage");
					break;
				case "teddies":
					console.log("Extraction impossible des ours en peluche du localstorage"); 
					break;
				case "furniture":
					console.log("Extraction impossible des meuble en chêne du localstorage");
				default:
					console.log('erreur produit inconnus');
					break;
			}
		}
	}
	if (compteur == 3) {
		document.getElementById("produits").innerHTML = html;
	}
} 
