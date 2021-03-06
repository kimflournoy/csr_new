var bigc_selected = "";
var user_selected = "";
var percentage = 0;
var number_hearts = 0;
var survival_years = 0;

var selected_sex = "";
var selected_age = "";
var selected_stage = "";
var selected_grade = "";
var selected_time = "";

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
  // console.log(bigc_selected);


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
  // console.log(user_selected);

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

function removeClass(e, c) {
    var element, classname;
    element = e;
    classname = c;
    element.classList.remove(classname);
}

function showElement(e) {
    var element;
    element = e;
    element.classList.remove("hidden");
}

function displayUserInfo(u) {
  if(u === "warrior") {
    addClass(document.getElementById("src-calc__user-info_doctor"), "hidden");
    addClass(document.getElementById("src-calc__cta-questions_doctor"), "hidden");
  }
  else if(u === "doctor") {
    addClass(document.getElementById("src-calc__user-info_warrior"), "hidden");
    addClass(document.getElementById("src-calc__cta-questions_warrior"), "hidden");
  }
}

function displayBigCInfo(c) {
  document.getElementById("scr-calc__title").innerHTML = c;
  addClass(document.getElementById("csr-layout__main"), "csr-layout__main_" + bigc_selected);
}

function displayBigCButtons(c, u) {
  
  var button_sex = false, button_age = false, button_stage = false, button_grade = false, button_time = false;
  switch(c) {
    case "colon":
      button_sex = true;
      button_age = true;
      button_stage = true;
      button_grade = true;
      button_time = true;
      break;
    case "breast":
      button_sex = false;
      button_age = true;
      button_stage = true;
      button_grade = true;
      button_time = true;
      break;
    case "melanoma":
      button_sex = true;
      button_age = true;
      button_stage = true;
      button_grade = false;
      button_time = true;
      break;
    case "appendix":
      button_sex = false;
      button_age = false;
      button_stage = false;
      button_grade = false;
      button_time = false;
      break;
    default:
      break;
  }
  if(button_sex) {
    showElement(document.getElementById("src-calc__filter_sex"));
  }
  if(button_age) {
    showElement(document.getElementById("src-calc__filter_age"));
  }
  if(button_stage) {
    showElement(document.getElementById("src-calc__filter_stage"));
  }
  if(button_grade) {
    showElement(document.getElementById("src-calc__filter_grade"));
  }
  if(button_time) {
    showElement(document.getElementById("src-calc__filter_time"));
  }

}

function calculateRate(c) {
  // using fake data here

  switch(c) {
    case "colon":
      percentage = 23;
      survival_years = 3;
      break;
    case "breast":
      percentage = 46;
      survival_years = 10;
      break;
    case "melanoma":
      percentage = 2;
      survival_years = 2;
      break;
    case "appendix":
      percentage = 99;
      survival_years = 4;
      break;
    case "fake":
      percentage = 77;
      survival_years = 5;
      break;
    default:
      break;
  }

  calculateHearts(percentage);
  document.getElementById("src-calc__percentage").innerHTML = percentage + "%";
  document.getElementById("src-calc__rate-years").innerHTML = survival_years;

}

function calculateHearts(p) {

  var listItems = [];
  var children = document.getElementById('src-calc__desc-visual').childNodes;

  for(var i = 0, l=children.length; i<l; ++i) {
      var child = children[i];
      if(child.nodeType === 1 && child.classList.contains("src-calc__desc-icon")) {
          listItems.push(child);
      }
  }

  number_hearts = Math.floor(percentage / 10); // round down to the nearest 10

  if(number_hearts == 0) { number_hearts = 1; } // showing 0 hearts seems cruel

  for (var i = 0; i < number_hearts; i++) {
        listItems[i].className += " " + "src-calc__desc-icon_selected";
  }
}


function getCalcInfo() { // set up the form on page load
  getCalcTypes();
  if(bigc_selected === "error" || user_selected === "error") {
    alert("There appears to be an error - please try again");
    window.location.href = "./index.html";
  }
  else {
    displayUserInfo(user_selected);
    displayBigCInfo(bigc_selected);
    displayBigCButtons(bigc_selected, user_selected);
    calculateRate(bigc_selected);
    setUpSlider1();
    setUpSlider2();
  }
}


function showBottomPanel(cat) {

  // reset everything first
  addClass(document.getElementById("scr-calc__fieldset_sex"), "hidden");
  addClass(document.getElementById("scr-calc__fieldset_age"), "hidden");
  addClass(document.getElementById("scr-calc__fieldset_stage"), "hidden");
  addClass(document.getElementById("scr-calc__fieldset_grade"), "hidden");
  addClass(document.getElementById("scr-calc__fieldset_time"), "hidden");
  
  addClass(document.getElementById("scr-calc__help"), "hidden");
  addClass(document.getElementById("scr-calc__questions_warrior"), "hidden");
  addClass(document.getElementById("scr-calc__questions_doctor"), "hidden");
  addClass(document.getElementById("scr-calc__share"), "hidden");

  removeClass(document.getElementById("src-calc__filter_sex"), "src-calc__filter_active");
  removeClass(document.getElementById("src-calc__filter_age"), "src-calc__filter_active");
  removeClass(document.getElementById("src-calc__filter_stage"), "src-calc__filter_active");
  removeClass(document.getElementById("src-calc__filter_grade"), "src-calc__filter_active");
  removeClass(document.getElementById("src-calc__filter_time"), "src-calc__filter_active");
  removeClass(document.getElementById("src-calc__cta-share"), "src-calc__filter_active");
  removeClass(document.getElementById("src-calc__cta-questions_warrior"), "src-calc__filter_active");
  removeClass(document.getElementById("src-calc__cta-questions_doctor"), "src-calc__filter_active");


  
  switch(cat) {
    case "sex":
      showElement(document.getElementById("scr-calc__fieldset_sex"));
      addClass(document.getElementById("src-calc__filter_sex"), "src-calc__filter_active");
      break;
    case "age":
      showElement(document.getElementById("scr-calc__fieldset_age"));
      addClass(document.getElementById("src-calc__filter_age"), "src-calc__filter_active");
      break;
    case "stage":
      showElement(document.getElementById("scr-calc__fieldset_stage"));
      addClass(document.getElementById("src-calc__filter_stage"), "src-calc__filter_active");
      break;
    case "grade":
      showElement(document.getElementById("scr-calc__fieldset_grade"));
      addClass(document.getElementById("src-calc__filter_grade"), "src-calc__filter_active");
      break;
    case "time":
      showElement(document.getElementById("scr-calc__fieldset_time"));
      addClass(document.getElementById("src-calc__filter_time"), "src-calc__filter_active");
      break;
    case "share":
      showElement(document.getElementById("scr-calc__share"));
      addClass(document.getElementById("src-calc__cta-share"), "src-calc__filter_active");
      break;
    case "questions_warrior":
      showElement(document.getElementById("scr-calc__questions_warrior"));
      addClass(document.getElementById("src-calc__cta-questions_warrior"), "src-calc__filter_active");
      break;
    case "questions_doctor":
      showElement(document.getElementById("scr-calc__questions_doctor"));
      addClass(document.getElementById("src-calc__cta-questions_doctor"), "src-calc__filter_active");
      break;
    case "help":
      showElement(document.getElementById("scr-calc__help"));
      break;
    default:
      break;
  }
  
}


function updateBigCButtons(e, type) {

  var element = e;
  var parent = e.parentNode;
  
  // remove active class on any previously selected buttons
  function resetButtons() {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      removeClass(child, "active");
    }
  }
  
  

  switch(type) {
    case "sex":
      resetButtons();
      selected_sex = ": " + e.value;
      document.getElementById("src-calc__filter-value_sex").innerHTML = selected_sex;
      addClass(e, "active");
      break;

    case "age":
      selected_age = ": " + e.value;
      document.getElementById("src-calc__filter-value_age").innerHTML = selected_age;
      break;

    case "stage":
      resetButtons();
      selected_stage = ": " + e.value;
      document.getElementById("src-calc__filter-value_stage").innerHTML = selected_stage;
      addClass(e, "active");
      break;
    case "grade":
      resetButtons();
      selected_grade = ": " + e.value;
      document.getElementById("src-calc__filter-value_grade").innerHTML = selected_grade;
      addClass(e, "active");
      break;
    case "time":
      resetButtons();
      selected_time = ": " + e.value;
      document.getElementById("src-calc__filter-value_diagnosed").innerHTML = selected_time;
      addClass(e, "active");
      break;
    default:
      break;
  }
  
  calculateRate("fake");


  // var selected_sex = "";
  // var selected_age = "";
  // var selected_stage = "";
  // var selected_grade = "";
  // var selected_time = "";
}



/* Slider */

function setUpSlider1() {
  var slider = document.getElementById("csr-calc__slider_age");
  var output = document.getElementById("csr-calc__slider-label_age");
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;
    updateBigCButtons(this, 'age');
  }

}

function setUpSlider2() {
  var slider = document.getElementById("csr-calc__slider_time");
  var output = document.getElementById("csr-calc__slider-label_time");
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;
    updateBigCButtons(this, 'time');
  }

}

