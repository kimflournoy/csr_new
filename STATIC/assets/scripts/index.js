var user_selected = "";
var bigc_selected = "";
var error = false;

function updateFormUser() {
  var e = document.getElementById("scr-start__selector_user");
  var u = e.options[e.selectedIndex].value;

  if(u === "doctor") {
    user_selected = "d";
  }
  else if(u === "warrior") {
    user_selected = "w";
  }
  else {
    error = true;
  }
}

function updateFormBigC() {
  var e = document.getElementById("scr-start__selector_bigc");
  var c = e.options[e.selectedIndex].value;

  if(c === "appendix") {
    bigc_selected = "a";
  }
  else if(c === "colon") {
    bigc_selected = "c";
  }
  else if(c === "breast") {
    bigc_selected = "b";
  }
  else if(c === "melanoma") {
    bigc_selected = "m";
  }
  else {
    error = true;
  }

}



function redirCalc() {
  
  updateFormUser();
  updateFormBigC();

  if(error) {
    alert("Sorry, there's been an error - please select your user type and condition");
    return false;
  }
  else {
    window.location.href = "./calculator.html?c=" + bigc_selected + "&u=" + user_selected;
  }

}