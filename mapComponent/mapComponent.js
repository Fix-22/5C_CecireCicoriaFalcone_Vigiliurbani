export const generateMap = (parentElement) => {
    let map;
    let accidents = [];
    
    return {
        build: (startCoords) => {
            map = L.map(parentElement).setView(startCoords, 14);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
             }).addTo(map);
        },
        render: () => {
            accidents.forEach((accident) => {
                const marker = L.marker(accident.coords).addTo(map);
                marker.bindPopup("<b>" + accident.name + "</b><br><b>Data:</b> " + accident.date + "<br><b>Morti:</b> " + accident.deaths + "<br><b>Feriti:</b> " + accident.injured);
             });
            
             if (accidents.length > 0) {
                map.setView(accidents[accidents.length - 1].coords, 14);
             }
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