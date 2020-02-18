const listeProduits = ["cameras", "teddies", "furniture"];
let listeIdArticles = [];

const importProduit = () => {
		
	for (let produit of listeProduits) {
		var requete = new XMLHttpRequest();
		let urlApi = "";
		switch (produit) {
			case "cameras":
				requete.onreadystatechange = function () {
					if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
						localStorage.cameras = this.responseText;
					} else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
						console.error("erreur d'importation du produit cameras vintages");
					}
				}
				urlApi = "http://localhost:3000/api/cameras";
				break;
			case "teddies":
				requete.onreadystatechange = function () {
					if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
						localStorage.teddies = this.responseText;
					} else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
						console.error("erreur d'importation du produit ours en peluche");
					}
				}
				urlApi = "http://localhost:3000/api/teddies";
				break;
			case "furniture":
				requete.onreadystatechange = function () {
					if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
						localStorage.furniture = this.responseText;
					} else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
						console.error("erreur d'importation du produit meuble en chêne");
					}
				}
				urlApi = "http://localhost:3000/api/furniture";
				break;
			default:
				console.error("Produit inconnu");
				break;
		}
		requete.open("GET", urlApi);
		requete.send();
	} 
	
}
const afficheProduit = () => {
	/* récupère les produits stocké dans le localStorage et les affiches sur la page*/
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
					console.error('erreur produit inconnus');
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
				listeIdArticles.push(id);

				html += "<a href=\"./produit.html\" id=\""+id+"\"><div class=\"objet\">";
				html += "<h3>"+nom+"</h3>";
				html += "<img class=\"img-produit\" src=\""+image+"\">";
				/*html += "<p>"+description+"</p>";
				html += "<div class=\"prix\">Prix : "+prix+"€</div>";*/
				html += "</div></a>";
			}
			html += "</div>";
			compteur++;
		} else {
			switch (produit) {
				case "cameras":
					console.error("Extraction impossible des appareils photos du localstorage");
					break;
				case "teddies":
					console.error("Extraction impossible des ours en peluche du localstorage"); 
					break;
				case "furniture":
					console.error("Extraction impossible des meuble en chêne du localstorage");
				default:
					console.error('erreur produit inconnus');
					break;
			}
		}
	}
	if (compteur == 3) {
		document.getElementById("produits").innerHTML = html;
	}
} 
/* lors d'un clic la fonction */
actionsClick = (event) => {
	var identifiant = event.target.parentElement.parentElement.getAttribute('id');
	event.stopPropagation();
	if (listeIdArticles.includes(identifiant)) {
		localStorage.article = identifiant;
	} else {
		console.error("l'id n'appartient a aucun des articles !! ");
	}
}

/* Importations des articles */
importProduit();
/* Affichage des articles sous formes de liste */
afficheProduit();
/* surveille le click sur les differents produits */
for(var id of listeIdArticles){
	document.getElementById(id).addEventListener("click", actionsClick.bind(event));
}
