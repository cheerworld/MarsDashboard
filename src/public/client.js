//Set store to ImmutableJS
let store = Immutable.Map({
  user: Immutable.Map({
    name: "Human"
  }),
  apod: "",
  rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit"]),
});

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = store.merge(newState);
  render(root, store);
};

//Render the page by changing root's innerHTML
const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  const rovers = state.get("rovers");
  const apod = state.getIn(["apod", "image"]);

  //After update the store with a new rover "photos" property, if "photos" exists, return the contents inside "photos"
  if (state.get("photos")) {
    return clickedRoverContent(state);
  }

  //After update the store with daily image data from API, if "image" object exists and is insde "apod" property,
  //then call the function to show the daily image contents
  if (apod) {
    return DailyImageContentClick(state);
  }

  //After update the store with a new property key: "MarsWeather", value: "Mars Weatherr", if key "MarsWeather" exists,
  //run Mars Weather function
  if (state.get("MarsWeather")) {
    return MarsWeatherContentCliked(state.get("MarsWeather"));
  }

  return `
        <header>
        <div class="star-2 stars"></div>
        <div class="title">
        <h1>Mars Rover Dashboard</h1>
        </div>
        <div class="star-1 stars"></div>

          <div class="roverButton">
            <button class="roverCard curiosity" type="button" value=${rovers.get(0)} onclick = "clickRoverButton(this)">
              <h2 class="class-title">${rovers.get(0)}</h2>
            </button>

            <button class="roverCard opportunity" type="button" value=${rovers.get(1)} onclick = "clickRoverButton(this)">
              <h2 class="class-title">${rovers.get(1)}</h2>
            </button>

              <button class="roverCard spirit" type="button" value=${rovers.get(2)} onclick = "clickRoverButton(this)">
              <h2 class="class-title">${rovers.get(2)}</h2>
            </button>
          </div>

          <div class="newDataButtonDiv">
           <button class="getNewDataButton" type="button" value="apod" onclick = "clickDailyImageButton(this)">
           <h2 class="newDataTitle">Daily Image From NASA</h2>
           </button>

           <button class="getNewDataButton" type="button" value="Mars Weather" onclick = "marsWeathercliked(this)">
           <h2 class="newDataTitle">Mars Weather Report</h2>
           </button>
          </div>
          <div class="star-3 stars"></div>
        </header>
        <footer>🚀🌌 Made by Cheer Zhao on 🌏 with ❤️‍🔥</footer>
    `
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
  render(root, store)
})

// ------------------------------------------------------  COMPONENTS

//When rover buttons clicked, send rover button value to get rover info API
const clickRoverButton = (e) => getRoverInfo(e.value);

//Content for each rover after rover button clicked
const clickedRoverContent = (state) => {
  //console.log(state.get("photos"))
  //console.log(state.getIn(["photos", 0, "rover", "name"]))
  const roverData = state.get("photos").find(roverData => roverData.get("rover"));
  //console.log(roverData);
  return EachRoverContent(roverData, state);

};

//Each rover component
const EachRoverContent = (roverData, state) => {

  return `
  <div class="roverDiv">
  <ul class="roverInfo">
    <li>Name: ${roverData.getIn(["rover", "name"])}</li>
    <li>ID: ${roverData.getIn(["rover", "id"])}</li>
    <li>Launch Date: ${roverData.getIn(["rover", "launch_date"])}</li>
    <li>Landing Date: ${roverData.getIn(["rover", "landing_date"])}</li>
    <li>Status: ${roverData.getIn(["rover", "status"])}</li>
    <li>Latest Photos taken on Earth Date: ${roverData.get("earth_date")}</li>
  </ul>
  </div>

  <button onclick="backButton()" class="backButton">Back</button>

  <div class="roverImagesDiv">
  ${roverImages(state)}
  </div>

  <button onclick="backButton()" class="backButton">Back</button>
  `
}

//button to be clicked to go back to choose which rover button to see next
const backButton = () => {
  //Remove "photos" property inside store, then render root's innerHTML
  store = store.remove("photos");
  render(root, store);
};

//Get each rover's images
const roverImages = (state) => {

  return (state.get("photos"))
    .slice(0, 30)
    .map(photo => RoverImg(photo.get("img_src"))
      //.join("");
    ).reduce((acc, curr) => acc + curr);

};

//Rover Images component
const RoverImg = (src) => `<img src="${src}" class="roverImage">`;

//Daily image button clicked, send button value "apod" to get data from API
const clickDailyImageButton = (e) => getImageOfTheDay(e.value);

//Show daily image contents after the apod button clicked
const DailyImageContentClick = (state) => {
  //console.log(state.get("apod"))
  return `
  <main>
      ${Greeting(state.getIn(["user", "name"]))}
      <section>
          <p>
              One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
              the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
              This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
              applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
              explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
              but generally help with discoverability of relevant imagery.
          </p>
          ${ImageOfTheDay(state.get("apod"))}
      </section>
  </main>
  <button onclick="apodBackButton()" class="backButton">Back</button>
  `
};

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
        <div class="apodSection">
            <h2>Welcome to Astronomy Picture of the Day ${name}!</h2>
          </div>
        `
  }

  return `
        <h1>Hello!</h1>
    `
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

  // If image does not already exist, or it is not from today -- request it again
  const today = new Date()
  //console.log(today);
  const photodate = new Date(apod.getIn(["image", "date"]))
  //console.log(photodate);
  //console.log(photodate.getDate(), today.getDate());

  //console.log(photodate.getDate() === today.getDate());
  //if (!apod || apod.get("date") === today.getDate() ) {
  //getImageOfTheDay()
  //}

  // check if the photo of the day is actually type video!
  if (apod.getIn(["image", "media_type"]) === "video") {
    return (`
            <p>See today's featured video <a href="${apod.getIn(["image", "url"])}">here</a></p>
            <p>${apod.getIn(["image", "title"])}</p>
            <p>${apod.getIn(["image", "explanation"])}</p>
        `);
  } else if (apod.getIn(["image", "code"]) === 404) {
    return (`
            <p>${apod.getIn(["image", "msg"])}</p>
            <p>Please check back after a few hours.</p>
        `);
  } else {
    return (`
            <img src="${apod.getIn(["image", "url"])}" height="350px" width="100%" />
            <p>${apod.getIn(["image", "explanation"])}</p>

        `);
  }
};

//On button click, set "apod" property back to "" empty, then render root's innerHTML
const apodBackButton = () => {
  store = store.set("apod", "");
  render(root, store);
};


//On Mars Weather Button click, send button value "Mars Weather" to update store, give store a new property
//key: "MarsWeather", value: "Mars Weather". Then render root's innerHTML.
const marsWeathercliked = (e) => {
  store = store.set("MarsWeather", e.value);
  render(root, store);
};

//Mars Weather Content with embeded iframe from NASA API
const MarsWeatherContentCliked = (marsWeather) => {
  return `
  <div class="marsWeatherSection">
      <h2>${marsWeather}</h2>
  </div>

  <div class="iframe-container">
  <iframe src='https://mars.nasa.gov/layout/embed/image/insightweather/' width='800' height='530'  scrolling='no' frameborder='0'></iframe>
  </div>

  <button onclick="marsWeatherBackButton()" class="backButton">Back</button>
  `
};

//On button click, remove "MarsWeather" property inside store, then render root's innerHTML
const marsWeatherBackButton = () => {
  store = store.remove("MarsWeather");
  render(root, store);
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = async (apod) => {
  try {
    await fetch(`http://localhost:3000/${apod}`)
      .then(res => res.json())
      .then(apod => updateStore(store, {
        apod
      }))
  } catch (error) {
    console.log("errors:", err);
  }
};
//Get roverInfo API call
const getRoverInfo = async (roverName) => {
  try {
    await fetch(`http://localhost:3000/roverInfo/${roverName}`)
      .then(res => res.json())
      .then(roverInfo => updateStore(store, roverInfo))
  } catch (error) {
    console.log("errors:", err);
  }
};
