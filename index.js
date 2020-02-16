
const importProduit = () {
	var requete = new new XMLHttpRequest();
	requete.onreadystatechange = function () {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
			localStorage.cameras = this.responseText;
		} 
	}
	requete.open("GET", "http://localhost:3000/api/cameras");
	requete.send();
}



