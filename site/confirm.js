
const afficheCommande = () => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page celui selctionné sur l'index*/
	let html = "";
	let contenuCoordonne = "";
	prixTotal = 0;
	var commande = JSON.parse(localStorage.getItem("retourCommande"));
console.log(commande);
	document.getElementById("commande-id").innerHTML = commande.orderId;
	contenuCoordonne += "Vos coordonnées : ";
	contenuCoordonne += "<div>Nom : "+commande.contact.lastName+"</div>";
	contenuCoordonne += "<div>Prénom : "+commande.contact.firstName+"</div>";
	contenuCoordonne += "<div>Adresse : "+commande.contact.address+"</div>";
	contenuCoordonne += "<div>Ville : "+commande.contact.city+"</div>";
	contenuCoordonne += "<div>Email : "+commande.contact.email+"</div>";
	document.getElementById("coordonnées").innerHTML = contenuCoordonne;
	const elements = JSON.parse(localStorage.getItem("cameras"));
	if (elements != null) {	
		for (var article of elements) {
			for (let objet of commande.products) {
				console.log(objet);
				if(article._id == objet) {
					let image = article.imageUrl;
					let nom = article.name;
					let amelioration = article.lenses;
					let prix = article.price;
					prixTotal += prix;
					prix /= 100;
					let description = article.description;
					let id = article._id;
					
					html += "<div class=\"objet\"  id=\""+id+"\">";
					html += "<img class=\"img-produit\" src=\""+image+"\"><br>";
					html += "<div class=\"details-panier\"><h3>"+nom+"</h3>"
					html += "<p>"+description+"</p>";
					html += "<div class=\"prix\">Prix : "+prix+"€</div>";
					html += "</div>";
				}
			}
		}
	} else {
		console.error("Extraction impossible l'appareils photos du localstorage");
	}
	html += "<div class\"total\" id=\"total\">Total de la commande : "+(prixTotal/100)+"€";
	document.getElementById("articles").innerHTML = html;
} 

afficheCommande();
