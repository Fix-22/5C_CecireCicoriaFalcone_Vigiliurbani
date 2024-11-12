export const generateTable = (parentElement) => {
    let data = []
    let header = []
    return {
        build: (collums) => {
            header = collums
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
                    html += "<td>" + data[i][header[j]] + "</td>"
                }
                html += "</tr>"
            }
            parentElement.innerHTML += html;
        },
        search: (address) => {
            let searchResults = []
            for(let i = 0; i < data.length; i++) {
                if (data[i].address == address) {
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