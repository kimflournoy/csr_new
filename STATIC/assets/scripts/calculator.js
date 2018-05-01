var bigc_selected = "";
var user_selected = "";


function getUrlVars() { // Parse URL parameters
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    vars[key] = value;
  });
  return vars;
}


function getCalcTypes() { // Assign URL parameters, assigning to local variables to avoid XSS
  var bigc_url = getUrlVars()["c"];
  
  switch(bigc_url) {
    case "c":
      bigc_selected = "colon";
      break;
    case "b":
      bigc_selected = "breast";
      break;
    case "m":
      bigc_selected = "melanoma";
      break;
    case "a":
      bigc_selected = "appendix";
      break;
    default:
      bigc_selected = "error";
      break;
  }
  console.log(bigc_selected);


  var user_url = getUrlVars()["u"];
  
  switch(user_url) {
    case "w":
      user_selected = "warrior";
      break;
    case "d":
      user_selected = "doctor";
      break;
    default:
      user_selected = "error";
      break;
  }
  console.log(user_selected);

}


function addClass(e, c) {
    var element, classname, arr;
    element = e;
    classname = c;
    arr = element.className.split(" ");
    if (arr.indexOf(classname) == -1) {
        element.className += " " + classname;
    }
}

function displayUserInfo(u) {
  if(u === "warrior") {
    addClass(document.getElementById("src-calc__user-info_doctor"), "hidden");
  }
  else if(u === "doctor") {
    addClass(document.getElementById("src-calc__user-info_warrior"), "hidden");
  }
}

function displayCancerInfo(c) {
  document.getElementById("scr-calc__title").innerHTML = c;
  addClass(document.getElementById("csr-layout__main"), "csr-layout__main_" + bigc_selected);
}


function getCalcInfo() {
  getCalcTypes();
  if(bigc_selected === "error" || user_selected === "error") {
    alert("There appears to be an error - please try again");
    window.location.href = "./index.html";
  }
  else {
    displayUserInfo(user_selected);
    displayCancerInfo(bigc_selected);
  }
}




