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

    const votePosMarkers  = [];
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

    const votePos      = L.layerGroup(votePosMarkers);
    const highConf     = L.layerGroup(highConfMarkers);
    const longConf     = L.layerGroup(longConfMarkers);
    const classifyConf = L.layerGroup(classifyMarkers);

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
    
    L.control.layers(overlayMaps).addTo(myMap);
}

function ngramPlotly(ngram_data, id, zipcode) {
    let prefix = ""
    if (id == "unigram_plotly"){
        prefix = "uni"
    } else {
        prefix = "bi"
    }

    let data = [{
        type: 'bar',
        x: ngram_data[zipcode][prefix + "gram_count"],
        y: ngram_data[zipcode][prefix + "gram_words"],
        orientation: 'h'
      }];

    let layout = {
        autosize: false,
        width: 300,
        height: 300,
        yaxis:{
            autorange:'reversed'
        }
      }
      
    Plotly.newPlot(id, data, layout);
}

// change plots based on zipcode
async function getZipcode(zipcode_id){
    const wordCloudDataUnigram = await d3.json("data/unigram.json").catch(error => console.warn(error));
    ngramPlotly(wordCloudDataUnigram, 'unigram_plotly', zipcode_id);

    const wordCloudDataBigram = await d3.json("data/bigram.json").catch(error => console.warn(error));
    ngramPlotly(wordCloudDataBigram, 'bigram_plotly', zipcode_id);

    let unigram_image_path = "images/word_clouds/unigrams/unigram_"+ zipcode_id + ".png";
    d3.select("#unigram-cloud").attr("src", unigram_image_path);

    let bigram_image_path = "images/word_clouds/bigrams/bigram_"+ zipcode_id + ".png";
    d3.select("#bigram-cloud").attr("src", bigram_image_path);
}

// Load initial plots
(async function(){
    let init_zipcode = "78701";

    const sentimentData = await d3.csv("data/nlp_sentiment_results.csv").catch(error => console.warn(error));
    createMap(sentimentData);

    const wordCloudDataUnigram = await d3.json("data/unigram.json").catch(error => console.warn(error));
    ngramPlotly(wordCloudDataUnigram, 'unigram_plotly', init_zipcode)

    const wordCloudDataBigram = await d3.json("data/bigram.json").catch(error => console.warn(error));
    ngramPlotly(wordCloudDataBigram, 'bigram_plotly', init_zipcode)
})()
