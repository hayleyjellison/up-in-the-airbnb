//////////////////////////////////////////////////////////////////////////
// return color of circle 
//////////////////////////////////////////////////////////////////////////
function getColor(positivity) {
  if (positivity == 1){
      return 'green'
    } else {
        return 'red'
    }
}

//////////////////////////////////////////////////////////////////////////
// return what positivity rating is from boolean
//////////////////////////////////////////////////////////////////////////
function positivityClass(positivity){
  if (positivity == 1){
      return 'Positive'
    } else {
        return 'Negative'
    }
}

//////////////////////////////////////////////////////////////////////////
// create sentiment map and allow markers to be switched out on command
//////////////////////////////////////////////////////////////////////////
function createMap(sentiment_data) {

  // Define streetmap layer
  const streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  const votePosMarkers  = [];
  const highConfMarkers = [];
  const longConfMarkers = [];
  const classifyMarkers = [];

  // plot each type of marker
  sentiment_data.forEach(d => {
      
    // vote sentiment markers
    votePosMarkers.push(
      L.circle([d.latitude, d.longitude], {
      color: getColor(d.vote_sentiment_positivity),
      fillColor: getColor(d.vote_sentiment_positivity),
      radius: 100
      }).bindPopup("<h5>" + d.name + "</h5> <hr>" + 
          "Review Scores Rating: " + d.review_scores_rating/20 + " stars <br>" + 
          "Host Name: " + d.host_name + "<br>" + 
          "Positivity Rating: " + "<font color=" + getColor(d.vote_sentiment_positivity) + ">" + positivityClass(d.vote_sentiment_positivity) + "</font>" + "<br>" + 
          "Price per Night: $" + Math.round(d.price) + "<br>" +
          "Property Type: " + d.property_type + "<br>" +
          "Link: " + "<a href=\"" + d.listing_url + "\" target=\"_blank\">" + d.listing_url + "</a>"
          )
    );

    // high confidence sentiment markers
    highConfMarkers.push(
      L.circle([d.latitude, d.longitude], {
      color: getColor(d.high_conf_sentiment_positivity),
      fillColor: getColor(d.high_conf_sentiment_positivity),
      radius: 100
      }).bindPopup("<h4>" + d.name + "</h4> <hr>" + 
          "Review Scores Rating: " + d.review_scores_rating/20 + " stars <br>" + 
          "Host Name: " + d.host_name + "<br>" + 
          "Positivity Rating: " + "<font color=" + getColor(d.high_conf_sentiment_positivity) + ">" + positivityClass(d.high_conf_sentiment_positivity) + "</font>" + "<br>" + 
          "Price per Night: $" + Math.round(d.price) + "<br>" + 
          "Property Type: " + d.property_type + "<br>" +
          "Link: " + "<a href=\"" + d.listing_url + "\" target=\"_blank\">" + d.listing_url + "</a>"
          )
    );

    // longest confidence sentiment markers
    longConfMarkers.push(
      L.circle([d.latitude, d.longitude], {
      color: getColor(d.long_conf_sentiment_positivity),
      fillColor: getColor(d.long_conf_sentiment_positivity),
      radius: 100
      }).bindPopup("<h4>" + d.name + "</h4> <hr>" + 
          "Review Scores Rating: " + d.review_scores_rating/20 + " stars <br>" + 
          "Host Name: " + d.host_name + "<br>" + 
          "Positivity Rating: " + "<font color=" + getColor(d.long_conf_sentiment_positivity) + ">" + positivityClass(d.long_conf_sentiment_positivity) + "</font>" + "<br>" + 
          "Price per Night: $" + Math.round(d.price) + "<br>" + 
          "Property Type: " + d.property_type + "<br>" +
          "Link: " + "<a href=\"" + d.listing_url + "\" target=\"_blank\">" + d.listing_url + "</a>"
          )
    );

    // classify sentiment markers
    classifyMarkers.push(
      L.circle([d.latitude, d.longitude], {
      color: getColor(d.classified_sentiment_positivity),
      fillColor: getColor(d.classified_sentiment_positivity),
      radius: 100
      }).bindPopup("<h4>" + d.name + "</h4> <hr>" + 
          "Review Scores Rating: " + d.review_scores_rating/20 + " stars <br>" + 
          "Host Name: " + d.host_name + "<br>" + 
          "Positivity Rating: " + "<font color=" + getColor(d.classified_sentiment_positivity) + ">" + positivityClass(d.classified_sentiment_positivity) + "</font>" + "<br>" + 
          "Price per Night: $" + Math.round(d.price) + "<br>" + 
          "Property Type: " + d.property_type + "<br>" +
          "Link: " + "<a href=\"" + d.listing_url + "\" target=\"_blank\">" + d.listing_url + "</a>"
          )
    );

  })

  // place each marker type in a layer
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
    layers: [streetmap, votePos],
    scrollWheelZoom: false,
    zoomControl: false
  });
  
  // note that L.Control and L.control totally different
  
  // add home button to reset to default center and zoom level
  L.Control.zoomHome().addTo(myMap);

  // add layers to map
  L.control.layers(overlayMaps).addTo(myMap);
}

//////////////////////////////////////////////////////////////////////////
// create anychart bar chart for top 10 ngram results
//////////////////////////////////////////////////////////////////////////
function buildBarChart(wordData, id, zipcode){

  // wipe out HTML under div id for refresh
  document.getElementById(id).innerHTML = "";

  anychart.onDocumentReady(function() {
    let barData = wordData[zipcode].slice(0,10);

    // create a bar chart
    let chart = anychart.bar();

    // set series
    let series = chart.bar(barData);
    series.name("Word Count");

    // display the bar chart
    chart.container(id);
    chart.draw();

  })
}

//////////////////////////////////////////////////////////////////////////
// create anychart word clouds for ngram results
//////////////////////////////////////////////////////////////////////////
function buildWordCloud(wordData, id, zipcode){

  // wipe out HTML under div id for refresh
  document.getElementById(id).innerHTML = "";

  anychart.onDocumentReady(function() {
    let wordCloudData = wordData[zipcode];

    // create a tag (word) cloud chart
    let chart = anychart.tagCloud(wordCloudData);

    // set an array of angles at which the words will be laid out
    chart.angles([0, 270]);

    // display the word cloud chart
    chart.container(id);
    chart.draw();

  })
}

//////////////////////////////////////////////////////////////////////////
// change plots based on zipcode
//////////////////////////////////////////////////////////////////////////
async function getZipcode(zipcode_id){
  // show user which zipcode is selected
  document.getElementById("myZipcode").innerHTML = zipcode_id;

  // anychart word clouds and bar charts
  const wordCloudDataUnigram = await d3.json("static/data/unigrams.json").catch(error => console.warn(error));
  buildWordCloud(wordCloudDataUnigram, 'unigram-cloud', zipcode_id);
  buildBarChart(wordCloudDataUnigram, 'unigram-barchart', zipcode_id);

  const wordCloudDataBigram = await d3.json("static/data/bigrams.json").catch(error => console.warn(error));
  buildWordCloud(wordCloudDataBigram, 'bigram-cloud', zipcode_id);
  buildBarChart(wordCloudDataBigram, 'bigram-barchart', zipcode_id);
}

//////////////////////////////////////////////////////////////////////////
// Load initial plots
//////////////////////////////////////////////////////////////////////////
(async function(){
  // show user which zipcode is selected
  let init_zipcode = "78701";
  document.getElementById("myZipcode").innerHTML = init_zipcode;

  // sentiment analysis leaflet map
  const sentimentData = await d3.csv("static/data/nlp_sentiment_results.csv").catch(error => console.warn(error));
  createMap(sentimentData);

  // initial anychart word clouds and bar charts
  const wordCloudDataUnigram = await d3.json("static/data/unigrams.json").catch(error => console.warn(error));
  buildWordCloud(wordCloudDataUnigram, 'unigram-cloud', init_zipcode);
  buildBarChart(wordCloudDataUnigram, 'unigram-barchart', init_zipcode);

  const wordCloudDataBigram = await d3.json("static/data/bigrams.json").catch(error => console.warn(error));
  buildWordCloud(wordCloudDataBigram, 'bigram-cloud', init_zipcode);
  buildBarChart(wordCloudDataBigram, 'bigram-barchart', init_zipcode);
})()
