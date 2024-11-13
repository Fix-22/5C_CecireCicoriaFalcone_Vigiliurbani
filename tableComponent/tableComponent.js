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
            let html = "<table class='table'><tr>"
            for(let i = 0; i < header.length; i++) {
                html += "<th>" + header[i] + "</th>"
            }
            html += "</tr>"
            for(let i = 0; i < data.length; i++) {
                html += "<tr>"
                for(let j = 0; j < header.length; j++) {
                    if (configuration[j] == "plates") {
                        html += "<td>" + data[i][configuration[j]].join(", ") + "</td>"
                    } else {
                        html += "<td>" + data[i][configuration[j]] + "</td>"
                    }
                }
                html += "</tr>"
            }
            parentElement.innerHTML = html;
        },
        search: (address) => {
            let searchResults = []
            for(let i = 0; i < data.length; i++) {
                if (data[i].address.includes(address)) {
                    searchResults.push(data[i])
                }
            }
            return searchResults;
        },
        newData: (values) => {
            data = values
        }
    }
};