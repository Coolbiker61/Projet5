
const importProduit = () => {
	const listeProduits = ["cameras", "teddies", "furniture"]

	
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

	const cameras = JSON.parse(localStorage.getItem("cameras"));
	if (cameras != null) {
		let html = "";
		html = "<div class=\"categorie\"> Nos caméras </div>";
		for (var article of cameras) {
			let image = article.imageUrl;
			let nom = article.name;
			let prix = article.price;
			let description = article.description;
			let id = article._id;

			html += "<div class=\"objet\" id=\""+id+"\">";
			html += "<img class=\"img-produit\" src=\""+image+"\">";
			html += "<h3>"+nom+"</h3>";
			html += "<div>"+prix+"</div>";
			html += "<p>"+description+"</p>";
			html += "</div>";
		}
		document.getElementById("produits").innerHTML = html;
	} else {
		console.log("Extraction impossible des cameras du localstorage");
	}
} 
afficheProduit();
