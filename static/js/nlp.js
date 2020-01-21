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

  // plot each type of marker
  sentiment_data.forEach(d => {
      
    // vote sentiment markers
    votePosMarkers.push(
      L.circle([d.latitude, d.longitude], {
      color: getColor(d.vote_sentiment_positivity),
      fillColor: getColor(d.vote_sentiment_positivity),
      radius: 100
      }).bindPopup("<h4>" + d.name + "</h4> <hr>" + 
          "Review Scores Rating: " + d.review_scores_rating/20 + " stars <br>" + 
          "Host Name: " + d.host_name + "<br>" + 
          "Positivity Rating: " + "<font color=" + getColor(d.vote_sentiment_positivity) + ">" + positivityClass(d.vote_sentiment_positivity) + "</font>" + "<br>" + 
          "Price per Night: $" + Math.round(d.price) + "<br>" + 
          "Link: " + "<a href=\"" + d.listing_url + "\" target=\"_blank\">" + d.listing_url + "</a>")
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
          "Link: " + "<a href=\"" + d.listing_url + "\" target=\"_blank\">" + d.listing_url + "</a>")
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
          "Link: " + "<a href=\"" + d.listing_url + "\" target=\"_blank\">" + d.listing_url + "</a>")
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
          "Link: " + "<a href=\"" + d.listing_url + "\" target=\"_blank\">" + d.listing_url + "</a>")
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
// create plotly bar charts for ngram results
//////////////////////////////////////////////////////////////////////////
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
    title: "Top 10 " + prefix + "grams",
    autosize: false,
    width: 300,
    height: 300,
    hovermode: 'closest',
      margin : {
        t:30,
        b:30
    },
    yaxis:{
      autorange:'reversed'
    }
  }
      
  Plotly.newPlot(id, data, layout, {displayModeBar: false});
}
//////////////////////////////////////////////////////////////////////////
// change plots based on zipcode
//////////////////////////////////////////////////////////////////////////
async function getZipcode(zipcode_id){
  const wordCloudDataUnigram = await d3.json("static/data/unigram.json").catch(error => console.warn(error));
  ngramPlotly(wordCloudDataUnigram, 'unigram_plotly', zipcode_id);

  const wordCloudDataBigram = await d3.json("static/data/bigram.json").catch(error => console.warn(error));
  ngramPlotly(wordCloudDataBigram, 'bigram_plotly', zipcode_id);

  let unigram_image_path = "static/images/word_clouds/unigrams/unigram_"+ zipcode_id + ".png";
  d3.select("#unigram-cloud").attr("src", unigram_image_path);

  let bigram_image_path = "static/images/word_clouds/bigrams/bigram_"+ zipcode_id + ".png";
  d3.select("#bigram-cloud").attr("src", bigram_image_path);
}
//////////////////////////////////////////////////////////////////////////
// Load initial plots
//////////////////////////////////////////////////////////////////////////
(async function(){
  let init_zipcode = "78701";

  const sentimentData = await d3.csv("static/data/nlp_sentiment_results.csv").catch(error => console.warn(error));
  createMap(sentimentData);

  const wordCloudDataUnigram = await d3.json("static/data/unigram.json").catch(error => console.warn(error));
  ngramPlotly(wordCloudDataUnigram, 'unigram_plotly', init_zipcode)

  const wordCloudDataBigram = await d3.json("static/data/bigram.json").catch(error => console.warn(error));
  ngramPlotly(wordCloudDataBigram, 'bigram_plotly', init_zipcode)
})()

// var lastScrollTop = 0;
// $(window).scroll(function(){
//   var st = $(this).scrollTop();
//   var banner = $('.banner');
//   setTimeout(function(){
//     if (st > lastScrollTop){
//       banner.addClass('hide');
//     } else {
//       banner.removeClass('hide');
//     }
//     lastScrollTop = st;
//   }, 100);
// });