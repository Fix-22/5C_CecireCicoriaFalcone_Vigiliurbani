import {generateFetchComponent} from "./fetchComponent/fetchComponent.js";
import {generateForm} from "./formComponent/formComponent.js"
import {generateGeoencoder} from "./geoencoderComponent/geoencoderComponent.js"
import {generateMap} from "./mapComponent/mapComponent.js"
import {generateTable} from "./tableComponent/tableComponent.js";

const modalBody = document.getElementById("modalBody");
const tableContainer = document.getElementById("tableContainer");
const spinner = document.getElementById("spinner");

fetch("./config.json")
.then(r => r.json())
.then(data => {
    
});