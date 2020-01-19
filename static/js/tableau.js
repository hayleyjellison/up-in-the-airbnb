(function tabViz() {

  let bookingMapContainer = document.getElementById("bookingMap");
  let bookingMapURL = "https://public.tableau.com/views/AirbnbAustinRegions/GroupBookingStory";

  let airbnbTypesContainer = document.getElementById("airbnbTypes");
  let airbnbTypesURL = "https://public.tableau.com/views/AirbnbType/AirbnbTypesStory";

  let airbnbPropertyContainer = document.getElementById("airbnbProperty");
  let airbnbPropertyURL = "https://public.tableau.com/views/AirBnB-metrics-by-region/AirBnBPropertyDetailsbyRegion";

  let options = {
      // hideTabs: true
  };

  new tableau.Viz(bookingMapContainer, bookingMapURL, options);
  new tableau.Viz(airbnbTypesContainer, airbnbTypesURL, options);
  new tableau.Viz(airbnbPropertyContainer, airbnbPropertyURL, options);
  
})()
