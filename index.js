import {generateFetchComponent} from "./fetchComponent/fetchComponent.js";
import {generateForm} from "./formComponent/formComponent.js"
import {generateGeoencoder} from "./geoencoderComponent/geoencoderComponent.js"
import {generateMap} from "./mapComponent/mapComponent.js"
import {generateTable} from "./tableComponent/tableComponent.js";
import {generateSearchbar} from "./searchbarComponent/searchbarComponent.js";

const modalBody = document.getElementById("modalBody");
const tableContainer = document.getElementById("tableContainer");
const spinner = document.getElementById("spinner");
const searchbarContainer = document.getElementById("searchbarContainer");
const mapContainer = document.getElementById("map");
const submitButton = document.getElementById("submitButton") ;

const searchbar = generateSearchbar(searchbarContainer);
const map = generateMap(mapContainer);
const table = generateTable(tableContainer);
const geoencoder = generateGeoencoder();
const fetchComponent = generateFetchComponent() ;
const formComponent = generateForm(modalBody) ;

fetch("./conf.json")
.then(r => r.json())
.then(data => {
    let cacheToken = data["cacheToken"];
    let mapsToken = data["mapsToken"];

    geoencoder.build(mapsToken);
    fetchComponent.build(cacheToken);
    map.build([45.4639102, 9.1906426]); // default viene usato il Duomo di Milano

    searchbar.build("Indirizzo");
    searchbar.render();

    table.build(["Indirizzo", "Data e ora", "Targhe", "Feriti", "Morti"], ["address", "dateTime", "plates", "injured", "deaths"]);
    fetchComponent.getData("vigili").then(data => {
        spinner.classList.add("d-none");
        table.newData(data);
        table.render();
        map.setAccidents(data);
        map.render();
    });
    
    searchbar.onsearch(address => {
        table.newData(table.search(address));
        table.render();
    });
    searchbar.oncancel(() => {
        spinner.classList.remove("d-none");
        fetchComponent.getData("vigili").then(data => {
            spinner.classList.add("d-none");
            table.newData(data);
            table.render();
        });
    });

    formComponent.build(modalBody) ;
    formComponent.render() ;
    formComponent.onsubmit(accident => {
        let newAddress = document.getElementById("streetInput") ;
        let newDatetime = document.getElementById("datetimeInput") ;
        let newPlate1 = document.getElementById("plate1Input") ;
        let newPlate2 = document.getElementById("plate2Input") ;
        let newPlate3 = document.getElementById("plate3Input") ;
        let newPlates = [newPlate1.value, newPlate2.value, newPlate3.value] ;
        let newDeaths = document.getElementById("deathsInput") ;
        let newInjured = document.getElementById("injuredInput") ;

        accident = {} ;
        accident.address = newAddress.value + ", milano" ;
        accident.date = newDatetime.value ;
        accident.plates = newPlates ;
        accident.deaths = newDeaths.value ;
        accident.injured =  newInjured.value ;

        streetInput.value = "" ;
        newDatetime.value = "" ;
        newPlate1.value = "" ;
        newPlate2.value = "" ;
        newPlate3.value = "" ;
        newDeaths.value = "" ;
        newInjured.value = "" ;

        console.log(accident) ;
        return accident ;
    });
});