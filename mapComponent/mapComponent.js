export const generateMap = (parentElement) => {
    let map;
    let places = [];
    
    return {
        build: (startCoords) => {
            map = L.map(parentElement).setView(startCoords, 14);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
             }).addTo(map);
        },
        render: () => {
            places.forEach((place) => {
                const marker = L.marker(place.coords).addTo(map);
                marker.bindPopup("<b>" + place.name + "</b>");
             });
            
             if (places.length > 0) {
                map.setView(places[places.length -1].coords, 14);
             }
        },
        addPlace: (place) => {
            if (places.indexOf(place) === -1) {
                places.push(place);
            }
        }
    };
};