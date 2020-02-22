/* !!! necesite un test de presence dans le panier pour grisé le boutton si deja present*/

const afficheProduit = (idArticle) => {
	/* récupère les produits stocké dans le localStorage et affiche sur la page celui selctionné sur l'index*/
	let html = "";
	const elements = JSON.parse(localStorage.getItem("cameras"));
	if (elements != null) {	
		for (var article of elements) {
			if(article._id == idArticle) {
				let image = article.imageUrl;
				let nom = article.name;
				let amelioration = article.lenses;
				let prix = article.price;
				prix /= 100;
				let description = article.description;
				let id = article._id;
				
				html += "<div class=\"objet\"  id=\""+id+"\">";
				html += "<img class=\"img-produit\" src=\""+image+"\">";
				html += "<h3>"+nom+"</h3>";
				html += "<label for=\"lentilles\">lentilles : </label>";
				html += "<select name=\"lentilles\" id=\"lentilles\">";
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
		console.error("Extraction impossible l'appareils photos du localstorage");
	}
	document.getElementById("article").innerHTML = html;
} 

/* recupere l'article cliqué sur la page d'index qui est stocké dans le localStorage */
const idArticleSelectionne = localStorage.article;
/* affiche la fiche de l'article */
afficheProduit(idArticleSelectionne);
/* surveillance du clic sur le bonton ajouté au panier et gestion du cas ou il y est deja present */
document.getElementById("bouton").addEventListener("click", function (event) {
	let identifiant = document.getElementById("bouton").parentElement.getAttribute('id');
	var panier = [];
	document.getElementById("bouton").disabled = true;
	if (localStorage.panier) {
		if (/\[/.test(localStorage.getItem("panier"))) {
    		panier = JSON.parse(localStorage.getItem("panier"));
		}			
		if (Array.isArray(panier)) {
			if (panier.find(element => element == identifiant)) {
				alert("Cet article est déjà dans votre panier.");
				return 0;
			} else {
				panier.push(identifiant);
			}
		}
	} else {
		panier = [identifiant]; 
	}
	localStorage.setItem("panier", JSON.stringify(panier));
});

