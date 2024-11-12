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

const searchbar = generateSearchbar(searchbarContainer);
const map = generateMap(mapContainer);
const table = generateTable(tableContainer);
const geoencoder = generateGeoencoder();

fetch("./conf.json")
.then(r => r.json())
.then(data => {
    searchbar.build("Indirizzo");
    searchbar.onsearch(address => {
    });
    searchbar.oncancel(() => {

    });
    searchbar.render();

    table.build(["A", "B", "C"])
    table.build(["address", "dateTime", "plates", "injured", "deaths"]);
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
table.newData(table.search("indirizzo2"));
table.render();

    map.build([45.4639102, 9.1906426]); // default viene usato il Duomo di Milano
    map.render();
    map.addAccident({address: "indirizzo", datetime: "11/11/2011-20:10:10", plates: ["AA000AA", "BB111BB"], deaths: 5, injured: 3, coords: [45.4639102, 9.1906426]})
    map.render()
});