import {generateFetchComponent} from "./fetchComponent/fetchComponent.js";
import {generateForm} from "./formComponent/formComponent.js"
import {generateGeoencoder} from "./geoencoderComponent/geoencoderComponent.js"
import {generateMap} from "./mapComponent/mapComponent.js"
import {generateTable} from "./tableComponent/tableComponent.js";
import {generateSearchbar} from "./searchbarComponent/searchbarComponent.js";
import { generateLoginComponent } from "./loginComponent/loginComponent.js";

const modalBody = document.getElementById("modalBody");
const tableContainer = document.getElementById("tableContainer");
const spinner = document.getElementById("spinner");
const searchbarContainer = document.getElementById("searchbarContainer");
const mapContainer = document.getElementById("map");
const loginContainer = document.getElementById("loginContainer");

const searchbar = generateSearchbar(searchbarContainer);
const map = generateMap(mapContainer);
const table = generateTable(tableContainer);
const geoencoder = generateGeoencoder();
const fetchComponent = generateFetchComponent() ;
const formComponent = generateForm(modalBody) ;
const loginComponent = generateLoginComponent(loginContainer);

fetch("./conf.json")
.then(r => r.json())
.then(data => {
    let cacheToken = data["cacheToken"];
    let mapsToken = data["mapsToken"];

    const modal = new bootstrap.Modal(document.getElementById("modalForm")); // per gestire modal via js
    
    document.querySelectorAll('.private').forEach(e => {
        e.classList.add("d-none");
    });

    geoencoder.build(mapsToken);
    fetchComponent.build(cacheToken);
    map.build([45.4639102, 9.1906426]); // default viene usato il Duomo di Milano
    loginComponent.build(cacheToken, "private");
    loginComponent.renderForm();

    searchbar.build("Indirizzo");
    searchbar.render();

    table.build(["Indirizzo", "Data e ora", "Targhe", "Feriti", "Morti"], ["address", "dateTime", "plates", "injured", "deaths"]);
    fetchComponent.getData("vigili").then(data => {
        spinner.classList.add("d-none");
        table.setData(data);
        table.render();
        map.setAccidents(data);
        map.render();
    });
    
    searchbar.onsearch(address => {
        table.renderFilter(table.search(address));
    });
    searchbar.oncancel(() => {
        table.render();
    });

    formComponent.render() ;
    formComponent.onsubmit(accident => {
        if (accident.address && accident.dateTime && accident.plates.length >= 0 && parseInt(accident.injured) >= 0 && parseInt(accident.deaths) >= 0) {
            let currentDate = Date.parse(accident.dateTime);
            let today = new Date();

            if (currentDate <= today) {
                geoencoder.encode(accident.address)
                .then(data => {
                    accident.address = data.name;
                    accident.coords = data.coords;

                    let currentData = table.getData();
                    currentData.push(accident);

                    formComponent.clear();
                    modal.hide();
                    spinner.classList.remove("d-none");
                    
                    fetchComponent.setData("vigili", currentData).then(r => {
                        fetchComponent.getData("vigili").then(data => {
                            spinner.classList.add("d-none");
                            table.setData(data);
                            table.render();
                            map.setAccidents(data);
                            map.render();
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                    formComponent.setError("Luogo non trovato");
                });
            }
            else {
                formComponent.setError("Data e ora non valide");
            }
        }
        else {
            formComponent.setError("Dati mancanti o invalidi");
        }
    });
});