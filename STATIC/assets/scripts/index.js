var user_selected = "";
var bigc_selected = "";
var error = false;

function updateFormUser(u) {
  alert(u);
  if(u === "doctor") {
    user_selected = "c";
  }
  else if(u === "warrior") {
    user_selected = "w";
  }
  else {
    error = true;
  }
}

function updateFormBigC(c) {
  alert(c);
  if(c === "c") {
    bigc_selected = "c";
  }
  else if(c === "a") {
    bigc_selected = "a";
  }
  else if(c === "b") {
    bigc_selected = "b";
  }
  else if(c === "m") {
    bigc_selected = "m";
  }
  else {
    error = true;
  }
}

function redirCalc() {
  
  if(!error) {
    // alert(user_selected);
    // alert(bigc_selected);
    window.location.href = "./calculator.html?c=" + bigc_selected + "&u=" + user_selected;
  }
  else {
    alert("Sorry, there's been an error - please select your user type and condition");
    return false;
  }

}