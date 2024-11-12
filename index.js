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
    searchbar.build("Indirizzo");
    searchbar.render();

    table.build(["Indirizzo", "Data e ora", "Targhe", "Feriti", "Morti"], ["address", "dateTime", "plates", "injured", "deaths"]);
    table.newData([
        {
            address: "indirizzo1",
            dateTime: "data",
            plates: ["aaaaa1", "bbbbbb2"],
            deaths: 5,
            injured: 3,
            coords: [45.4639, 9.112312]
        },
        {
            address: "indirizzo2",
            dateTime: "data1",
            plates: ["aaaaa2", "bbbbbb2"],
            deaths: 7,
            injured: 4,
            coords: [45.4639, 9.112312]
        },
        {
            address: "indirizzo2",
            dateTime: "data4",
            plates: ["aaaaa3", "bbbbbb5"],
            deaths: 7,
            injured: 4,
            coords: [45.4639, 9.112312]
        },
    ])
    searchbar.onsearch(address => {
        table.newData(table.search(address));
        table.render();
    });
    searchbar.oncancel(() => {

    });
    table.render();

    fetchComponent.build() ;

    formComponent.build(modalBody) ;
    formComponent.render() ;

    submitButton.onclick = () => {
        let newAccident = formComponent.getInputData() ;
        console.log(newAccident) ;
        //pushare il nuovo dizionario sull'array degli incidenti
        /*

        if (newAccident !== undefined) {
            //push sull'array
        }

        */

    }


    map.build([45.4639102, 9.1906426]); // default viene usato il Duomo di Milano
    map.render();
    map.addAccident({address: "indirizzo", dateTime: "11/11/2011-20:10:10", plates: ["AA000AA", "BB111BB"], injured: 3, deaths: 5, coords: [45.4639102, 9.1906426]})
    map.render()
});