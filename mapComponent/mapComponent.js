export const generateMap = (parentElement) => {
    let map;
    let accidents = [];
    
    return {
        build: (startCoords) => {
            map = L.map(parentElement).setView(startCoords, 11);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        },
        render: () => {
            accidents.forEach((accident) => {
                if (accident) {
                    const marker = L.marker(accident.coords).addTo(map);
                    marker.bindPopup("<b>" + accident.address + "</b><br><b>Data e ora:</b> " + accident.dateTime.split("T")[0].split("-")[2] + "/" + accident.dateTime.split("T")[0].split("-")[1] + "/" + accident.dateTime.split("T")[0].split("-")[0] + " " + accident.dateTime.split("T")[1] + "<br><b>Targhe coinvolte:</b> " + accident.plates.join(", ") + "<br><b>Feriti:</b> " + accident.injured + "<br><b>Morti:</b> " + accident.deaths);
                }
            });
        },
        addAccident: (accident) => {
            if (accidents.indexOf(accident) === -1) {
                accidents.push(accident);
            }
        },
        getAccidents: () => {
            return accidents;
        },
        setAccidents: (inputAccidents) => {
            accidents = inputAccidents;
        }
    };
};