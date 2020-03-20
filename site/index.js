let listeIdArticles = [];

/* importe les articles depuis l'api vers le localStorage si il n'y sont pas déjà */
const importProduit = () => {
	/* contrôle la présence de cameras dans le localStorage et stop la fonction si présent */
	if (localStorage.getItem("cameras")) {
		/* Affichage des articles sous formes de liste */
		affichage();
		return;
	} else {
		/* récupère de l'API le tableau des articles et le copie dans le localStorage */
		var requete = new XMLHttpRequest();
		requete.onreadystatechange = function () {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
				localStorage.setItem("cameras", this.responseText);
				affichage();
			} else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
				console.error("erreur d'importation du produit cameras vintages");
			}
		}
		requete.open("GET", "http://localhost:3000/api/cameras");
		requete.send();
	}
}

const afficheProduits = () => {
	/* récupère les produits stocké dans le localStorage et les affiches sur la page*/
	let html = "";
	var elements;
	/* test de l’existence de cameras dans le localStorage et récupère le tableau qu'il contient */
	if (localStorage.getItem("cameras")) {
		elements = JSON.parse(localStorage.getItem("cameras"));
	} else {
		console.error("chargement des cameras impossible");
		return;
	}
	/* vérifie que le tableau récupérer n'est pas null et ajoute tout les articles au DOM*/
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

			html += "<a href=\"#\" id=\""+id+"\"><div class=\"objet\">";
			html += "<img class=\"img-produit\" src=\""+image+"\">";
			html += "<h3>"+nom+"</h3>";
			html += "</div></a>";
		}
		html += "</div>";
	} else {
		console.error("Extraction impossible des appareils photos du localStorage");
	}
	document.getElementById("produits").innerHTML = html;
} 
/* lors d'un clic, vérifie que l'id qui a déclenché le clic fait parti des articles */
const actionsClick = (event) => {
	if (event.target.parentElement.parentElement.getAttribute('id')) {
		var identifiant = event.target.parentElement.parentElement.getAttribute('id');
		event.stopPropagation();
		event.preventDefault();
		/* définie la clé article du localStorage avec la valeur de l'id */
		if (listeIdArticles.includes(identifiant)) {
			localStorage.setItem("article", identifiant);
			/* redirige l'utilisateur vers la page produit.html */
			window.location.href = "produit.html";
		} else {
			console.error("l'id n'appartient a aucun des articles !! ");
		}
	} else {
		console.error("récupération de l'id impossible");
	}
	
}

const affichage = () => {

	/* Affichage des articles sous formes de liste */
	afficheProduits();
	
	/* surveille le clic sur les différents articles */
	for(var id of listeIdArticles){
		document.getElementById(id).addEventListener("click", actionsClick.bind(event));
	}
}

/* Importations des articles et lancement de l'affichage et des écoutes*/
importProduit();

