const listeProduits = ["cameras", "teddies", "furniture"];

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
						console.log("erreur d'importation du produit cameras vintages");
					}
				}
				urlApi = "http://localhost:3000/api/cameras";
				break;
			case "teddies":
				requete.onreadystatechange = function () {
					if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
						localStorage.teddies = this.responseText;
					} else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
						console.log("erreur d'importation du produit ours en peluche");
					}
				}
				urlApi = "http://localhost:3000/api/teddies";
				break;
			case "furniture":
				requete.onreadystatechange = function () {
					if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
						localStorage.furniture = this.responseText;
					} else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
						console.log("erreur d'importation du produit meuble en chene");
					}
				}
				urlApi = "http://localhost:3000/api/furniture";
				break;
			default:
				console.log("Produit inconnu");
				break;
		}
		requete.open("GET", urlApi);
		requete.send();
	} 
	
}
importProduit();
const afficheProduit = () => {
	let compteur = 0;
	let html = "";
	for (let produit of listeProduits) {
		const elements = JSON.parse(localStorage.getItem(produit));
		if (elements != null) {
			
			switch (produit) {
				case "cameras":
					html += "<div class=\"categorie\"> Nos appareils photos";
					break;
				case "teddies":
					html += "<div class=\"categorie\"> Nos ours en pelluche";
					break;
				case "furniture":
					html += "<div class=\"categorie\"> Nos meubles en chênes";
					break;
				default:
					console.log('erreur produit inconnus');
					break;
			}
			
			for (var article of elements) {
				let image = article.imageUrl;
				let nom = article.name;
				let prix = article.price;
				prix /= 100;
				let description = article.description;
				let id = article._id;

				html += "<div class=\"objet\" id=\""+id+"\">";
				html += "<h3>"+nom+"</h3>";
				html += "<img class=\"img-produit\" src=\""+image+"\">";
				html += "<p>"+description+"</p>";
				html += "<div>Prix : "+prix+"€</div>";
				html += "</div>";
			}
			html += "</div>";
			compteur++;
		} else {
			switch (produit) {
				case "cameras":
					console.log("Extraction impossible des appareils photos du localstorage");
					break;
				case "teddies":
					console.log("Extraction impossible des ours en pelluche du localstorage"); 
					break;
				case "furniture":
					console.log("Extraction impossible des meuble en chene du localstorage");
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
afficheProduit();
