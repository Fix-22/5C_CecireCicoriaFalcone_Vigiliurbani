import {generateFetchComponent} from "./fetchComponent/fetchComponent.js";
import {generateForm} from "./formComponent/formComponent.js"
import {generateGeoencoder} from "./geoencoderComponent/geoencoderComponent.js"
import {generateMap} from "./mapComponent/mapComponent.js"
import {generateTable} from "./tableComponent/tableComponent.js";

const modalBody = document.getElementById("modalBody");
const tableContainer = document.getElementById("tableContainer");
const spinner = document.getElementById("spinner");
const mapContainer = document.getElementById("map");

const map = generateMap(mapContainer);
const componentGeoencoder = generateGeoencoder();

fetch("./conf.json")
.then(r => r.json())
.then(data => {
    map.build([45.4639102, 9.1906426]); // default viene usato il Duomo di Milano
    map.render();
    map.addAccident({coords: [45.4639102, 9.1906426], name: "nome", date: "11/11/2011", deaths: 5, injured: 3})
    map.render()
});