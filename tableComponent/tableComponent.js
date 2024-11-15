export const generateTable = (parentElement) => {
    let data = [];
    let header = [];
    let configuration = [];

    return {
        build: (inputHeader, inputConfiguration) => {
            header = inputHeader;
            configuration = inputConfiguration;
        },
        render: () => {
            let html = "<table class='table table-bordered'><tr>"
            for(let i = 0; i < header.length; i++) {
                html += "<th class='table-secondary'>" + header[i] + "</th>"
            }
            html += "</tr>"
            for(let i = 0; i < data.length; i++) {
                html += "<tr>"
                for(let j = 0; j < header.length; j++) {
                    if (configuration[j] === "plates") {
                        html += "<td>" + data[i][configuration[j]].join(", ") + "</td>"
                    } else if (configuration[j] === "dateTime") {
                        let dateTime = data[i][configuration[j]];
                        html += "<td>" + dateTime.split("T")[0].split("-")[2] + "/" + dateTime.split("T")[0].split("-")[1] + "/" + dateTime.split("T")[0].split("-")[0] + " " + dateTime.split("T")[1] + "</td>";
                    } else {
                        html += "<td>" + data[i][configuration[j]] + "</td>"
                    }
                }
                html += "</tr>"
            }
            parentElement.innerHTML = html;
        },
        search: (address) => { // cerca nei dati le righe che ontengono gli indirizzi
            let searchResults = []
            for(let i = 0; i < data.length; i++) {
                if (data[i].address.toLowerCase().includes(address.toLowerCase())) {
                    searchResults.push(data[i])
                }
            }
            return searchResults;
        },
        renderFilter: (newData) => { // metodo che fa la render di specifici dati, senza salvarli
            let html = "<table class='table table-bordered'><tr>"
            for(let i = 0; i < header.length; i++) {
                html += "<th class='table-secondary'>" + header[i] + "</th>"
            }
            html += "</tr>"
            for(let i = 0; i < newData.length; i++) {
                html += "<tr>"
                for(let j = 0; j < header.length; j++) {
                    if (configuration[j] === "plates") {
                        html += "<td>" + newData[i][configuration[j]].join(", ") + "</td>"
                    } else if (configuration[j] === "dateTime") {
                        let dateTime = newData[i][configuration[j]];
                        html += "<td>" + dateTime.split("T")[0].split("-")[2] + "/" + dateTime.split("T")[0].split("-")[1] + "/" + dateTime.split("T")[0].split("-")[0] + " " + dateTime.split("T")[1] + "</td>";
                    } else {
                        html += "<td>" + newData[i][configuration[j]] + "</td>"
                    }
                }
                html += "</tr>"
            }
            parentElement.innerHTML = html;
        },
        setData: (values) => {
            data = values
        },
        getData: () => {
            return data;
        }
    }
};