
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZXBhbnNhYmF0ZSIsImEiOiJja21kejl5bHUxdzhoMnBwaDg0YjJ1bDRxIn0.fVRAXWvmIKHZ-4igiQQeRg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 14,
    center: [1.162395, 41.372935]
});

// Fetch stores from API
async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json(); // convert to json

    // console.log(data);
    const stores = data.data.map(store => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [store.location.coordinates[0], store.location.coordinates[1]]
                },
                properties: {
                storeId: store.storeId,
                icon: 'shop'
                }
        }
    });
    loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
    map.on('load', function() {
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: stores
                    //features: [
                        // {
                        //     type: 'Feature',
                        //     geometry: {
                        //         type: 'Point',
                        //         coordinates: [1.111318, 41.337839]
                        //     },
                        //     properties: {
                        //         storeId: '0001',
                        //         icon: 'shop'
                        //     }
                        // }
                  //  ]
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
            });
        });
}

getStores();