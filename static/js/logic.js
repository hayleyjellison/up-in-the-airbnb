(function iife() {

  // hide and show the navbar
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-75px";
    }
  }

  // populate the zipcode dropdown menu
  let zipcodes = ["78701", "78702", "78703", "78704", "78705", "78712", "78717", "78719", "78721", "78722", "78723", "78724", "78725", "78726", "78727", "78728", "78729", "78730", "78731", "78732", "78733", "78734", "78735", "78736", "78737", "78738", "78739", "78741", "78742", "78744", "78745", "78746", "78747", "78748", "78749", "78750", "78751", "78752", "78753", "78754", "78756", "78757", "78758", "78759"];

  let str = '<ul class=\"dropdown-menu scrollable-menu\" role=\"menu\">';
  
  zipcodes.forEach(function(zip) {
    str += '<li><button class=\"dropdown-item\" onclick=\"getZipcode(this.id)\" type=\"button\" id=\"'+ zip + '\">' + zip + '</button></li>';
  });

  str += '</ul>';
  document.getElementById("zipcodeContainer").innerHTML = str;
  
  // tooltip for zipcode button
  $('[data-toggle-second="tooltip"]').tooltip();
})()
