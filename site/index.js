let listeIdArticles = [];

/* importe les articles depuis l'api vers le localstorage si il n'y sont pas déjà */
const importProduit = () => {
	/* controle la presence de cameras dans le localStorage et stop la fonction si present */
	if (localStorage.getItem("cameras")) {
		return;
	} else {
		var requete = new XMLHttpRequest();
		requete.onreadystatechange = function () {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
				localStorage.setItem("cameras") = this.responseText;
			} else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
				console.error("erreur d'importation du produit cameras vintages");
			}
		}
		requete.open("GET", "http://localhost:3000/api/cameras");
		requete.send();
	}
}
const afficheProduit = () => {
	/* récupère les produits stocké dans le localStorage et les affiches sur la page*/
	let html = "";
	var elements;
	/* test de l'existance de cameras dans le localStorage*/
	if (localStorage.getItem("cameras")) {
		elements = JSON.parse(localStorage.getItem("cameras"));
	} else {
		console.error("chargement des cameras impossible");
		return;
	}
	/* ajoute tout les articles au html*/
	if (elements != null) {
		html += "<div class=\"categorie\"><span class=\"titre-cate\">";
		html += "Nos appareils photos";
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
			html += "<img class=\"img-produit\" src=\""+image+"\">";
			html += "<h3>"+nom+"</h3>";
			html += "</div></a>";
		}
		html += "</div>";
	} else {
		console.error("Extraction impossible des appareils photos du localstorage");
	}
	document.getElementById("produits").innerHTML = html;
} 
/* action lors d'un clic */
const actionsClick = (event) => {
	if (event.target.parentElement.parentElement.getAttribute('id')) {
		var identifiant = event.target.parentElement.parentElement.getAttribute('id');
		event.stopPropagation();
		if (listeIdArticles.includes(identifiant)) {
			localStorage.article = identifiant;
		} else {
			console.error("l'id n'appartient a aucun des articles !! ");
		}
	} else {
		console.error("recupration de l'id impossible");
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
