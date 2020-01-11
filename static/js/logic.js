function createMap(data) {

    // Define streetmap layer
    const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 13,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    const myMap = L.map("map", {
        center: [30.2672, -97.7431],
        zoom: 18,
        layers: streetmap
    });
}

// Load data from nlp_sentiment_results.csv
(async function(){
    const sentimentData = await d3.csv("data/nlp_sentiment_results.csv").catch(error => console.warn(error));
    console.log(sentimentData);

    createMap(sentimentData)
})()

