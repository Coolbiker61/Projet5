
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
	
} 

