// return color of circle
function getColor(positivity) {
    if (positivity == 1){
        return 'green'
     } else {
         return 'red'
     }
}

// return what positivity rating is from boolean
function positivityClass(positivity){
    if (positivity == 1){
        return 'Positive'
     } else {
         return 'Negative'
     }
}

// function createMap(pos_data, neg_data) {
function createMap(sentiment_data) {

    // Define streetmap layer
    const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    // const myMap = L.map("map", {
    //     center: [30.2672, -97.7431],
    //     zoom: 13,
    //     layers: streetmap
    // });

    // sentiment_data.forEach(d => {
    //     L.circle([d.latitude, d.longitude], {
    //         color: getColor(d.avg_sentiment_positivity),
    //         fillColor: getColor(d.avg_sentiment_positivity),
    //         radius: 100
    //     })
    //     .addTo(myMap)
    //     .bindPopup("<h1>" + d.listing_id + "</h1> <hr> <h3>Review Scores Rating: " + d.review_scores_rating + "</h3>" + "<h3>Positivity Rating: " + positivityClass(d.avg_sentiment_positivity) + "</h3>")
    // });

    const votePosMarkers = [];
    const highConfMarkers = [];
    const longConfMarkers = [];
    const classifyMarkers = [];

    sentiment_data.forEach(d => {
        // Setting the marker radius for the state by passing population into the markerSize function
        votePosMarkers.push(
            L.circle([d.latitude, d.longitude], {
            color: getColor(d.vote_sentiment_positivity),
            fillColor: getColor(d.vote_sentiment_positivity),
            radius: 100
            }).bindPopup("<h1>" + d.name + "</h1> <hr> Review Scores Rating: " + d.review_scores_rating + "<br>" + "Positivity Rating: " + positivityClass(d.vote_sentiment_positivity))
        );

        highConfMarkers.push(
            L.circle([d.latitude, d.longitude], {
            color: getColor(d.high_conf_sentiment_positivity),
            fillColor: getColor(d.high_conf_sentiment_positivity),
            radius: 100
            }).bindPopup("<h1>" + d.name + "</h1> <hr> Review Scores Rating: " + d.review_scores_rating + "<br>" + "Positivity Rating: " + positivityClass(d.high_conf_sentiment_positivity))
        );

        longConfMarkers.push(
            L.circle([d.latitude, d.longitude], {
            color: getColor(d.long_conf_sentiment_positivity),
            fillColor: getColor(d.long_conf_sentiment_positivity),
            radius: 100
            }).bindPopup("<h1>" + d.name + "</h1> <hr> Review Scores Rating: " + d.review_scores_rating + "<br>" + "Positivity Rating: " + positivityClass(d.long_conf_sentiment_positivity))
        );

        classifyMarkers.push(
            L.circle([d.latitude, d.longitude], {
            color: getColor(d.classified_sentiment_positivity),
            fillColor: getColor(d.classified_sentiment_positivity),
            radius: 100
            }).bindPopup("<h1>" + d.name + "</h1> <hr> Review Scores Rating: " + d.review_scores_rating + "<br>" + "Positivity Rating: " + positivityClass(d.classified_sentiment_positivity))
        );
    })

    const votePos = L.layerGroup(votePosMarkers);
    const highConf = L.layerGroup(highConfMarkers);
    const longConf = L.layerGroup(longConfMarkers);
    const classifyConf = L.layerGroup(classifyMarkers);

    // Create a baseMaps object
    const baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlay object
    const overlayMaps = {
        "Listings by Votes": votePos,
        "Listings by High Confidence": highConf,
        "Listings by Longest Sentence": longConf,
        "Listings by Classification": classifyConf
    };

    // Define a map object
    const myMap = L.map("map", {
        center: [30.2672, -97.7431],
        zoom: 13,
        layers: [streetmap, votePos]
    });

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
    
}

// Load data from nlp_sentiment_results.csv
(async function(){
    const sentimentData = await d3.csv("data/nlp_sentiment_results.csv").catch(error => console.warn(error));

    createMap(sentimentData)
})()

