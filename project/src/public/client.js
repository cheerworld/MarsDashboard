
let store = Immutable.Map({
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
});


// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = store.merge(newState)

    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

const clickButton = (e) => {
//  console.log(e.value)
 getRoverInfo(e.value)
}

const clickedContent = (state) => {
//console.log(store)
//console.log(state.getIn(["photos", 0, "rover", "name"]))
  return `
  <ul class="roverInfo">
    <li>Name: ${state.getIn(["photos", 0, "rover", "name"])}</li>
    <li>ID: ${state.getIn(["photos", 0, "rover", "id"])}</li>
    <li>Launch Date: ${state.getIn(["photos", 0, "rover", "launch_date"])}</li>
    <li>Landing Date: ${state.getIn(["photos", 0, "rover", "landing_date"])}</li>
    <li>Status: ${state.getIn(["photos", 0, "rover", "status"])}</li>
  </ul>
  ${roverImages(state)}
  `

}
//
const roverImages =(state) => {
  return (state.get("photos")).map(photo => {
    const photoURL = photo.get("img_src");
    return `<img src="${photoURL}" class="roverImage">`
  }).join('');
}


// create content
const App = (state) => {
    let rovers = state.get("rovers");

    let apod = state.get("apod");
    //console.log(state.get("photos"));
    if (state.get("photos")) {
     return clickedContent(state)
    }
    return `
        <header>
          <div class="roverContainer">
            <button class="roverCard curiosity" type="button" value="curiosity" onclick = "clickButton(this)">
              <h2 class="class-title">${rovers[0]}</h2>
            </button>
            <button class="roverCard opportunity" type="button" value="opportunity" onclick = "clickButton(this)">
              <h2 class="class-title">${rovers[1]}</h2>
            </button>
              <button class="roverCard spirit" type="button" value="spirit" onclick = "clickButton(this)">
              <h2 class="class-title">${rovers[2]}</h2>
            </button>
          </div>
        </header>
        <main>
            ${Greeting(store.get("user").name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer></footer>
    `

}




// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()

    const photodate = new Date(apod.date)

    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.get("date") === today.getDate() ) {
        getImageOfTheDay()

    }

    // check if the photo of the day is actually type video!
    if (apod.getIn(["image","media_type"]) === "video") {
        return (`
            <p>See today's featured video <a href="${apod.getIn(["image","url"])}">here</a></p>
            <p>${apod.getIn(["image","title"])}</p>
            <p>${apod.getIn(["image","explanation"])}</p>
        `)
    } else {
        return (`
            <img src="${apod.getIn(["image","url"])}" height="350px" width="100%" />
            <p>${apod.getIn(["image", "explanation"])}</p>
        `)
    }
}


// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = () => {

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
        //console.log(store)



    //return data
}

const getRoverInfo = (roverName) => {
  fetch(`http://localhost:3000/roverInfo/${roverName}`)
      .then(res => res.json())
      .then(roverInfo => {
        //console.log(roverInfo)
        updateStore(store, roverInfo)
      })


}
