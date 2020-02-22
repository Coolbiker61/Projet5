
const afficheCommande = () => {
	let html = "";
	let contenuCoordonne = "";
	prixTotal = 0;
	var commande = JSON.parse(localStorage.getItem("retourCommande"));
	document.getElementById("commande-id").innerHTML = commande.orderId;
	contenuCoordonne += "<span class=\"titre-contact\">Vos coordonnées : </span>";
	contenuCoordonne += "<div>Nom : "+commande.contact.lastName+"</div>";
	contenuCoordonne += "<div>Prénom : "+commande.contact.firstName+"</div>";
	contenuCoordonne += "<div>Adresse : "+commande.contact.address+"</div>";
	contenuCoordonne += "<div>Ville : "+commande.contact.city+"</div>";
	contenuCoordonne += "<div>Email : "+commande.contact.email+"</div>";
	document.getElementById("commande-coordonnées").innerHTML = contenuCoordonne;
	for (let article of commande.products) {
		let image = article.imageUrl;
		let nom = article.name;
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
		html += "</div></div>";

	}
		
	html += "<div class=\"total\" id=\"total\">Total de la commande : "+(prixTotal/100)+"€";
	document.getElementById("commande-articles").innerHTML = html;
} 

afficheCommande();
