let findRaquettes = function(designation){
    let raquettesFound = [];
    raquettes.forEach((raquette) => {
        if(designation.length > 2 && comparerTextes(raquette.designation, designation)){
            raquettesFound.push(raquette);
        }
    });
    return raquettesFound;
};

let afficheRaquette = function(raquette){
    document.querySelector(".caracteristiques").classList.remove("invisible");
    document.querySelector(".titreCaracteristiques").classList.remove("invisible");
    document.getElementById("categorieFind").textContent = raquette["categorie"];
    document.getElementById("marqueFind").textContent = raquette["marque"];
    document.getElementById("designationFind").textContent = raquette["designation"];
    let elRefLink = document.createElement("a");
    elRefLink.textContent = "lien";
    elRefLink.href = raquette["ref"];
    let elRef = document.getElementById("refFind");
    elRef.childElementCount > 0 ? elRef.replaceChild(elRefLink, elRef.childNodes[0]) : elRef.appendChild(elRefLink);
    document.getElementById("epaisseurFind").textContent = raquette["epaisseur"];
    document.getElementById("rapiditeFind").textContent = raquette["rapidite"];
    document.getElementById("adherenceFind").textContent = raquette["adherence"];
    document.getElementById("controleFind").textContent = raquette["controle"];
    document.getElementById("longueurPicotFind").textContent = raquette["longueurPicot"];
    document.getElementById("diametrePicotFind").textContent = raquette["diametrePicot"];
    document.getElementById("effetGenantFind").textContent = raquette["effetGenant"];
    document.getElementById("dureteFind").textContent = raquette["durete"];
    document.getElementById("stockageFind").textContent = raquette["stockage"];
    document.getElementById("pageFind").textContent = raquette["page"];
    document.getElementById("prixFind").textContent = raquette["prix"];

    document.getElementById("rapiditeActuel").textContent = raquette["rapidite"];
    document.getElementById("adherenceActuel").textContent = raquette["adherence"];
    document.getElementById("controleActuel").textContent = raquette["controle"];
    document.getElementById("dureteActuel").textContent = raquette["durete"];

    document.getElementById("rapiditeChoosen").value = raquette["rapidite"];
    document.getElementById("adherenceChoosen").value = raquette["adherence"];
    document.getElementById("controleChoosen").value = raquette["controle"];
    document.getElementById("dureteChoosen").value = raquette["durete"];
}

let removeRaquettePrecedent = function(){
    let tbody = document.getElementById("tbodyPlsResult");
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
    document.getElementById("rapiditeActuel").textContent = "";
    document.getElementById("adherenceActuel").textContent = "";
    document.getElementById("controleActuel").textContent = "";
    document.getElementById("dureteActuel").textContent = "";

    document.getElementById("categorieFind").textContent = "";
    document.getElementById("marqueFind").textContent = "";
    document.getElementById("designationFind").textContent = "";
    document.getElementById("epaisseurFind").textContent = "";
    document.getElementById("rapiditeFind").textContent = "";
    document.getElementById("adherenceFind").textContent = "";
    document.getElementById("controleFind").textContent = "";
    document.getElementById("longueurPicotFind").textContent = "";
    document.getElementById("diametrePicotFind").textContent = "";
    document.getElementById("effetGenantFind").textContent = "";
    document.getElementById("dureteFind").textContent = "";
    document.getElementById("stockageFind").textContent = "";
    document.getElementById("pageFind").textContent = "";
    document.getElementById("prixFind").textContent = "";
}

let completeTableauChoixRaquette = function(raquettes){
    let tbody = document.getElementById("tbodyPlsResult");
    raquettes.forEach((raquette) => {
        let row = tbody.insertRow();
        let cellDesignation = row.insertCell();
        let lien = document.createElement("a");
        lien.href = raquette["ref"];
        lien.textContent = raquette["designation"];
        cellDesignation.appendChild(lien);
        let cellMarque = row.insertCell();
        cellMarque.textContent = raquette["marque"];
        let cellAction = row.insertCell();
        let button = document.createElement("button");
        button.textContent = "Choisir";
        button.onclick = function(event){
            afficheRaquette(raquette);
        }
        cellAction.appendChild(button);
    });
    document.querySelector(".titrePlsResult").classList.remove("invisible");
    document.querySelector(".plsResult").classList.remove("invisible");
}

let comparerTextes = function(texte1, texte2){
    // Fonction pour normaliser un texte (supprimer les accents et mettre en minuscule)
    const normaliser = (texte) => {
        return texte
            .toLowerCase() // Convertir en minuscule
            .normalize("NFD") // Décomposer les caractères accentués
            .replace(/[\u0300-\u036f]/g, ""); // Supprimer les accents
    };

    // Normaliser les deux textes
    const texte1Normalise = normaliser(texte1);
    const texte2Normalise = normaliser(texte2);

    // Vérifier si texte2 est contenu dans texte1 (début ou fin ignorés)
    return texte1Normalise.includes(texte2Normalise);
}

document.getElementById("button1").onclick = function(event) {
    let designation1 = document.getElementById("nom1").value;
    let raquettesFound = findRaquettes(designation1);
    removeRaquettePrecedent();
    if(raquettesFound.length === 1){
        afficheRaquette(raquettesFound[0]);
        document.querySelector(".titrePlsResult").classList.add("invisible");
        document.querySelector(".plsResult").classList.add("invisible");
    } else if(raquettesFound.length > 1){
        completeTableauChoixRaquette(raquettesFound);
    } else {
        alert("Aucune raquette trouvée");
    }
}

let calculMoyenne = function(raquettes, critere){
    let somme = 0;
    let compteur = 0;
    raquettes.forEach((raquette) => {
        if(raquette[critere]){
            compteur++;
            somme += raquette[critere];
        }
    });
    return somme / compteur;
}

let calculEcartType = function(raquettes, critere){
    let moyenne = calculMoyenne(raquettes, critere);
    let somme = 0;
    let compteur = 0;
    raquettes.forEach((raquette) => {
        if(raquette[critere]){
            compteur++;
            somme += Math.pow(raquette[critere] - moyenne, 2);
        }
    });
    return Math.sqrt(somme / compteur);
}

let getMin = function(raquettes, critere){
    let min = raquettes[0][critere];
    raquettes.forEach((raquette) => {
        if(raquette[critere] && raquette[critere] < min){
            min = raquette[critere];
        }
    });
    return min;
}

let getMax = function(raquettes, critere){ 
    let max = raquettes[0][critere];
    raquettes.forEach((raquette) => {
        if(raquette[critere] > max){
            max = raquette[critere];
        }
    });
    return max;
}

let remplirTableauStats = function(raquettes){
    let tbody = document.getElementById("tbodyStats");
    let critere = ["rapidite", "adherence", "controle", "durete"];
    critere.forEach((crit) => {
        let moyenne = calculMoyenne(raquettes, crit);
        let ecartType = calculEcartType(raquettes, crit);
        let min = getMin(raquettes, crit);
        let max = getMax(raquettes, crit);
        document.getElementById(crit + "Moy").textContent = moyenne;
        document.getElementById(crit + "Ecart").textContent = ecartType;
        document.getElementById(crit + "Min").textContent = min;
        document.getElementById(crit + "Max").textContent = max;
    });
}

remplirTableauStats(raquettes);

let plaquesSimilaires = [];

let getCriereSouhaite = function(){
    let objCritereSouhaite = {};
    objCritereSouhaite["rapidite"] = parseFloat(document.getElementById("rapiditeChoosen").value);
    objCritereSouhaite["adherence"] = parseFloat(document.getElementById("adherenceChoosen").value);
    objCritereSouhaite["controle"] = parseFloat(document.getElementById("controleChoosen").value);
    objCritereSouhaite["durete"] = parseFloat(document.getElementById("dureteChoosen").value);
    return objCritereSouhaite;
};

document.getElementById("button2").onclick = function(event){
    let critereSouhaite = getCriereSouhaite();
    let nbPlaquesSim = document.getElementById("nbPlaque").value;
    removeRaquetteRecommandePrecedent();
    let listePlaqueWithDifference = getPossibilitesPlaquesEnFonctionCritere(raquettes, critereSouhaite, nbPlaquesSim);
    remplirTableauPlaqueRecommandee(listePlaqueWithDifference, critereSouhaite);
}

let getPossibilitesPlaquesEnFonctionCritere = function(raquettes, critereSouhaite, nbPlaquesSim){
    let listePlaqueWithDifference = [];
    raquettes.forEach((raquette) => {
        let rapiditeRaquette = raquette["rapidite"];
        let adherenceRaquette = raquette["adherence"];
        let controleRaquette = raquette["controle"];
        let dureteRaquette = raquette["durete"];
        if(isRaquettePossible(raquette, critereSouhaite)){
            let plaqueWithDifference = getRaquetteWithDifference(raquette, critereSouhaite);
            let plaqueWithDifferenceMax = getMaxPlaqueWithDifference(listePlaqueWithDifference);
            if(plaqueWithDifferenceMax === null){
                listePlaqueWithDifference.push(plaqueWithDifference);
            } else if(plaqueWithDifference["difference"] < plaqueWithDifferenceMax["difference"]){
                if(listePlaqueWithDifference.length < parseInt(nbPlaquesSim)){
                    listePlaqueWithDifference.push(plaqueWithDifference);
                } else {
                    let index = listePlaqueWithDifference.indexOf(plaqueWithDifferenceMax);
                    listePlaqueWithDifference.splice(index, 1, plaqueWithDifference);
                }
                listePlaqueWithDifference.sort((a, b) => a["difference"] - b["difference"]);
            }
        }
    });
    return listePlaqueWithDifference;
}

let isRaquettePossible = function(raquette, critereSouhaite){
    let rapiditeRaquette = raquette["rapidite"];
    let adherenceRaquette = raquette["adherence"];
    let controleRaquette = raquette["controle"];
    let dureteRaquette = raquette["durete"];
    if(rapiditeRaquette && adherenceRaquette && controleRaquette && dureteRaquette){
        return true;
    }
    return false;
}

let getRaquetteWithDifference = function(raquette, critereSouhaite){
    let rapiditeRaquette = raquette["rapidite"];
    let adherenceRaquette = raquette["adherence"];
    let controleRaquette = raquette["controle"];
    let dureteRaquette = raquette["durete"];
    let diffRapidite = Math.abs(rapiditeRaquette - critereSouhaite["rapidite"]);
    let diffAdherence = Math.abs(adherenceRaquette - critereSouhaite["adherence"]);
    let diffControle = Math.abs(controleRaquette - critereSouhaite["controle"]);
    let diffDurete = Math.abs(dureteRaquette - critereSouhaite["durete"]);
    let diffTotal = diffRapidite + diffAdherence + diffControle + diffDurete;
    let plaqueWithDifference = {
        "raquette" : raquette,
        "difference" : diffTotal
    }
    return plaqueWithDifference;
}

let getMaxPlaqueWithDifference = function(listePlaqueWithDifference){
    if(listePlaqueWithDifference.length === 0){
        return null;
    }
    let max = listePlaqueWithDifference[0];
    listePlaqueWithDifference.forEach((plaqueWithDifference) => {
        if(plaqueWithDifference["difference"] > max["difference"]){
            max = plaqueWithDifference;
        }
    });
    return max;
}

let remplirTableauPlaqueRecommandee = function(raquettes, critereSouhaite){
    let tbody = document.getElementById("tbodySimilaires");
    if(raquettes.length > 0){
        raquettes.forEach((plaqueWithDifference) => {
            let plaque = plaqueWithDifference["raquette"];
            let row = tbody.insertRow();
            let cellDesignation = row.insertCell();
            let lien = document.createElement("a");
            lien.href = plaque["ref"];
            lien.textContent = plaque["designation"];
            cellDesignation.appendChild(lien);

            let cellRapidite = row.insertCell();
            cellRapidite.textContent = plaque["rapidite"];
            let rapiditeCible = critereSouhaite["rapidite"];
            if(rapiditeCible > plaque["rapidite"]){
                cellRapidite.classList.add("rouge");
            } else if(rapiditeCible <= plaque["rapidite"]){
                cellRapidite.classList.add("vert");
            }

            let cellAdherence = row.insertCell();
            cellAdherence.textContent = plaque["adherence"];
            let adherenceCible = critereSouhaite["adherence"];
            if(adherenceCible > plaque["adherence"]){
                cellAdherence.classList.add("rouge");
            } else if(adherenceCible <= plaque["adherence"]){
                cellAdherence.classList.add("vert");
            }

            let cellControle = row.insertCell();
            cellControle.textContent = plaque["controle"];
            let controleCible = critereSouhaite["controle"];
            if(controleCible > plaque["controle"]){
                cellControle.classList.add("rouge");
            } else if(controleCible <= plaque["controle"]){
                cellControle.classList.add("vert");
            }

            let cellDurete = row.insertCell();
            cellDurete.textContent = plaque["durete"];
            let dureteCible = critereSouhaite["durete"];
            if(dureteCible > plaque["durete"]){
                cellDurete.classList.add("rouge");
            } else if(dureteCible <= plaque["durete"]){
                cellDurete.classList.add("vert");
            }

            let cellDifference = row.insertCell();
            cellDifference.textContent = plaqueWithDifference["difference"];
            let cellAction = row.insertCell();
            let button = document.createElement("button");
            button.textContent = "Choisir";
            button.onclick = function(event){
                completeTableauChoixRaquetteRecommande(plaque);
            }
            cellAction.appendChild(button);
            let button2 = document.createElement("button");
            button2.textContent = "Supprimer";
            button2.classList.add("buttonSupprimer");
            button2.onclick = function(event){
                event.target.parentElement.parentElement.remove();
            }
            cellAction.appendChild(button2);
        });
        
    } else {
        alert("Aucune plaque trouvée");
    }
    document.querySelector(".titreSimilaires").classList.remove("invisible");
    document.querySelector(".blocSimilaire").classList.remove("invisible");
}

let removeRaquetteRecommandePrecedent = function(){
    let tbody = document.getElementById("tbodySimilaires");
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }
}

let completeTableauChoixRaquetteRecommande = function(plaque){
    document.getElementById("rapiditeCible").textContent = plaque["rapidite"];
    document.getElementById("adherenceCible").textContent = plaque["adherence"];
    document.getElementById("controleCible").textContent = plaque["controle"];
    document.getElementById("dureteCible").textContent = plaque["durete"];
}


