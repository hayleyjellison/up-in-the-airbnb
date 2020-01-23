(function tabViz() {

  let bookingMapContainer = document.getElementById("bookingMap");
  let bookingMapURL = "https://public.tableau.com/views/AirbnbAustinRegions/GroupBookingStory";

  let airbnbTypesContainer = document.getElementById("airbnbTypes");
  let airbnbTypesURL = "https://public.tableau.com/views/AirbnbType/AirbnbTypesStory";

  let airbnbPropertyContainer = document.getElementById("airbnbProperty");
  let airbnbPropertyURL = "https://public.tableau.com/views/AirBnB-metrics-by-region/AirBnBPropertyDetailsbyRegion";

  let zipcodeContainer = document.getElementById("zipcode");
  let zipcodeURL = "https://public.tableau.com/views/AustinZipcodeMap/AustinZipcodeMap";

  let hideOptions = {
      hideTabs: true
  };

  new tableau.Viz(bookingMapContainer, bookingMapURL, hideOptions);
  new tableau.Viz(airbnbTypesContainer, airbnbTypesURL, hideOptions);
  new tableau.Viz(airbnbPropertyContainer, airbnbPropertyURL);
  new tableau.Viz(zipcodeContainer, zipcodeURL);
  
})()
