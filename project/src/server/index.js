require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
app.get("/roverInfo/:rover_name", async (req, res) => {
  const url = "https://api.nasa.gov/mars-photos/api/v1/";
  try {
    let roverManifest = await fetch(`${url}manifests/${req.params.rover_name}?api_key=${process.env.API_KEY}`)
        .then(res => res.json())
  //  res.send({roverManifest})
    let max_date = roverManifest["photo_manifest"]["max_date"]
    let roverPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.rover_name}/photos?earth_date=${max_date}&api_key=${process.env.API_KEY}`)
        .then(res => res.json())
        res.send(roverPhotos)

  }catch (err) {
    console.log("errors:", err);
  }
})



// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send( { image } )

    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
