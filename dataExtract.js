// Utilise pour extraire les donnees du site https://www.wsport.com/catalogue/?todo=aff_revs
// et les enregistrer dans un fichier JSON

let creerRaquette = function(categorie, marque, designation, ref, epaisseur, rapidite, adherence, controle, longueurPicot, diametrePicot, effetGenant, durete, stockage, page, prix) {
    return {
        categorie: categorie,
        marque: marque,
        designation: designation,
        ref: ref,
        epaisseur: epaisseur,
        rapidite: rapidite,
        adherence: adherence,
        controle: controle,
        longueurPicot: longueurPicot,
        diametrePicot: diametrePicot,
        effetGenant: effetGenant,
        durete: durete,
        stockage: stockage,
        page: page,
        prix: prix
    };
}

let getElement = function(el, type){
    if(type === "ref"){
        return el.querySelector("a").href;
    } else if(type === "prix"){
        let prixStr = el.querySelector(".px").textContent;
        if(isNaN(parseFloat(prixStr))){
            return 0;
        } else {
            return parseFloat(prixStr);
        }
    } else if(type === "rapidite" || type === "adherence" || type === "controle" || type === "longueurPicot" || type === "diametrePicot" || type === "durete"){
        let nbStr = el.textContent;
        if(nbStr){
            return parseFloat(nbStr);
        }
        return 0;
    } else if(type === "effetGenant"){
        if(el.textContent === "*"){
            return 1;
        } else if(el.textContent === "**"){
            return 2;
        } else if(el.textContent === "***"){
            return 3;
        } else {
            return 0;
        }
    } else {
        return el.textContent;
    }
}

let listeRaquettes = [];
let elLignesRaquettes = document.querySelectorAll("#affp .off");
elLignesRaquettes.forEach(function(elLigneRaquette) {
    let elColonnes = elLigneRaquette.querySelectorAll("td");
    let i = 0;

    let categorie = getElement(elColonnes[i++], "categorie");
    let marque = getElement(elColonnes[i++], "marque");
    let designation = getElement(elColonnes[i++], "designation");
    let ref = getElement(elColonnes[i++], "ref");
    let epaisseur = getElement(elColonnes[i++], "epaisseur");
    let rapidite = getElement(elColonnes[i++], "rapidite");
    let adherence = getElement(elColonnes[i++], "adherence");
    let controle = getElement(elColonnes[i++], "controle");
    let longueurPicot = getElement(elColonnes[i++], "longueurPicot");
    let diametrePicot = getElement(elColonnes[i++], "diametrePicot");
    let effetGenant = getElement(elColonnes[i++], "effetGenant");
    i = 15;
    let durete = getElement(elColonnes[i++], "durete");
    let stockage = getElement(elColonnes[i++], "stockage");
    let page = getElement(elColonnes[i++], "page");
    let prix = getElement(elColonnes[i++], "prix");
    raquette = creerRaquette(categorie, marque, designation, ref, epaisseur, rapidite, adherence, controle, longueurPicot, diametrePicot, effetGenant, durete, stockage, page, prix);
    listeRaquettes.push(raquette);
});

listeRaquettes.json = JSON.stringify(listeRaquettes, null, "\t");
copy(listeRaquettes.json);