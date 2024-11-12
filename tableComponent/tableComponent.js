/*
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
*/
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