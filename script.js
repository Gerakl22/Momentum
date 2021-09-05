const timeNode = document.querySelector("#time");
const dateNode = document.querySelector("#date");
const greetingNode = document.querySelector("#greeting");
const nameNode = document.querySelector("#name");
const focusNode = document.querySelector("#focus");
const blockquoteNode = document.querySelector("blockquote");
const figcaptionNode = document.querySelector("figcaption");
const cityNode = document.querySelector("#city");
const wrongCityNode = document.querySelector("#wrongCity");
const countryNode = document.querySelector("#country");
const weatherIconNode = document.querySelector("#weatherIcon");
const weatherDescriptionNode = document.querySelector("#weatherDescription");
const temperatureCurrentNode = document.querySelector("#temperatureCurrent");
const humidityNode = document.querySelector("#humidity");
const windDegNode = document.querySelector("#windDeg");
const iconWindDegNode = document.querySelector("#iconWindDeg");
const windSpeedNode = document.querySelector("#windSpeed");
const weatherNode = document.querySelector("#weather");

const btnUpdateImageNode = document.querySelector("#btnUpdateImage");
const btnQuoteNode = document.querySelector("#btnQuote");

// lively обои contentEditable не работает там
cityNode.textContent = 'Minsk'

const baseNode = [
  "https://raw.githubusercontent.com/Gerakl22/Momentum/master/assets/images/night/",
  "https://raw.githubusercontent.com/Gerakl22/Momentum/master/assets/images/morning/",
  "https://raw.githubusercontent.com/Gerakl22/Momentum/master/assets/images/day/",
  "https://raw.githubusercontent.com/Gerakl22/Momentum/master/assets/images/evening/",
];
const imagesNode = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];

// Variables

let i = 0;
const listBaseImagesNode = [];
const keyNode = "41f37afd456c1f43b4a1a9b36d63f076";
const img = document.createElement("img");

// Function shuffle array and get array of base images

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const getArrayOfBaseImages = () => {
  for (let i = 0; i < 4; i++) {
    shuffleArray(imagesNode);
    for (let j = 0; j < 6; j++) {
      listBaseImagesNode.push(
        baseNode[i].toString() + imagesNode[j].toString()
      );
    }
  }

  return listBaseImagesNode;
};

// Basic functionality

const showTime = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let week = today.getDay();
  let day = today.getDate();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  dateNode.innerHTML = `${selectWeek(week)}, ${day} ${selectMonth(
    month
  )} ${year} <span>year</span>`;

  timeNode.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
};

const addZero = (n) => {
  return n < 10 ? "0" + n : n;
};

const selectWeek = (n) => {
  let weekIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekIndex[n];
};

const selectMonth = (n) => {
  let montIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return montIndex[n];
};

const setBackgroundGreeting = () => {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  if (min === 0 && sec === 0) {
    i = listBaseImagesNode.indexOf(listBaseImagesNode[hour]);
    img.src = listBaseImagesNode[i];
    img.onload = () => {
      document.body.style.backgroundImage = `url${img.src}`;
    };
  }

  if (hour >= 0 && hour < 6) {
    greetingNode.textContent = "Good Night, ";
  } else if (hour >= 6 && hour < 12) {
    greetingNode.textContent = "Good Morning, ";
  } else if (hour >= 12 && hour < 18) {
    greetingNode.textContent = "Good Day, ";
  } else {
    greetingNode.textContent = "Good Evening, ";
  }

  setTimeout(setBackgroundGreeting, 1000);
};

const getName = () => {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name") === ""
  ) {
    nameNode.textContent = "[Enter name]";
    // lively обои contentEditable не работает там
    nameNode.textContent = 'Ivan'
  } else {
    nameNode.textContent = localStorage.getItem("name");
  }
};

const setName = (e) => {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      localStorage.setItem("name", e.target.innerText);
      nameNode.blur();
    }
  }
};

const getFocus = () => {
  if (
    localStorage.getItem("focus") === null ||
    localStorage.getItem("focus") === ""
  ) {
    // focusNode.textContent = "[Enter focus]";
    // lively обои contentEditable не работает там
    focusNode.textContent = 'Never Give Up!'
  } else {
    focusNode.textContent = localStorage.getItem("focus");
  }
};

const setFocus = (e) => {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      localStorage.setItem("focus", e.target.innerText);
      focusNode.blur();
    }
  }
};

// Background image

const setBackgroundImage = () => {
  let today = new Date();
  let hour = today.getHours();
  i = listBaseImagesNode.indexOf(listBaseImagesNode[hour]);
  document.body.style.backgroundImage = `url(${listBaseImagesNode[i]})`;
};

const updateBackgroundImage = () => {
  btnUpdateImageNode.disabled = true;
  i++;
  img.src = listBaseImagesNode[i % 24];
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
  setTimeout(() => {
    btnUpdateImageNode.disabled = false;
  }, 1000);
};

// Quote

async function getQuote() {
  const url = `https://favqs.com/api/qotd`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    blockquoteNode.textContent = data.quote.body;
    figcaptionNode.textContent = data.quote.author;
  } catch (e) {
    throw new Error(e);
  }
}

// Weather

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNode.textContent}&lang=en&appid=${keyNode}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const windDeg = () => {
      if (data.wind.deg < 45) return "North";
      if (data.wind.deg < 135) return "East";
      if (data.wind.deg < 225) return "South";
      if (data.wind.deg < 315) return "West";
      if (data.wind.deg <= 360) return "North";
    };

    const createIcon = (img, src) => {
      img.src = src;
      img.alt = "No icon";

      return img;
    };

    cityNode.textContent = data.name;
    wrongCityNode.textContent = "";
    countryNode.textContent = data.sys.country;
    weatherIconNode.style.display = "inline-block";
    createIcon(
      weatherIconNode,
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    weatherDescriptionNode.textContent = data.weather[0].description;
    temperatureCurrentNode.textContent = `${Math.round(data.main.temp)} °C`;
    humidityNode.textContent = `φ ${data.main.humidity} %`;
    iconWindDegNode.classList.add("fa-compass");
    windDegNode.textContent = windDeg();
    windSpeedNode.textContent = `${data.wind.speed} m/s`;
    window.matchMedia("(max-width: 450px)").matches
      ? (weatherNode.style.display = "block")
      : (weatherNode.style.display = "flex");
  } catch (e) {
    cityNode.textContent = "[Enter city]";
    wrongCityNode.textContent = "City is not found";
    wrongCityNode.style.color = "red";
    countryNode.textContent = "";
    weatherIconNode.style.display = "none";
    weatherDescriptionNode.textContent = "";
    temperatureCurrentNode.textContent = "";
    humidityNode.textContent = "";
    iconWindDegNode.classList.remove("fa-compass");
    windDegNode.textContent = "";
    windSpeedNode.textContent = "";
    weatherNode.style.display = "inline-block";

    throw new Error(e);
  }
}

const getCity = () => {
  cityNode.textContent = localStorage.getItem("city");
};

const setCity = (e) => {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 24) {
      getWeather();
      localStorage.setItem("city", e.target.innerText);
      cityNode.blur();
    }
  }
};

//Add Event Listener

nameNode.addEventListener("keypress", setName);
focusNode.addEventListener("keypress", setFocus);
cityNode.addEventListener("keypress", setCity);

nameNode.addEventListener("blur", setName);
focusNode.addEventListener("blur", setFocus);

btnUpdateImageNode.addEventListener("click", updateBackgroundImage);
btnUpdateImageNode.addEventListener("click", () => {
  btnUpdateImageNode.classList.add("rotate--active");
  setTimeout(() => {
    btnUpdateImageNode.classList.remove("rotate--active");
  }, 2000);
});
btnQuoteNode.addEventListener("click", getQuote);
btnQuoteNode.addEventListener("click", () => {
  btnQuoteNode.classList.add("rotate--active");
  setTimeout(() => {
    btnQuoteNode.classList.remove("rotate--active");
  }, 2000);
});

document.addEventListener("DOMContentLoaded", getQuote);
document.addEventListener("DOMContentLoaded", getWeather);

getArrayOfBaseImages();
showTime();

setBackgroundGreeting();
setBackgroundImage();

getName();
getFocus();
getCity();
