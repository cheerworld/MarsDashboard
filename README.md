# Functional Programming with Javascript


### Big Picture

I created a Mars rover dashboard that consumes the NASA API. My dashboard will allow the user to select which rover's information they want to view. Once they have selected a rover, they will be able to see the most recent images taken by that rover, as well as important information about the rover and its mission. You can see the daily image from NASA by click the "daily image" button. You can also explore Mars weather by clicking the "Mars Weather Report". You will feel that you are really in the Mars! My app will make use of all the functional concepts and practices I have learned in the course with Udacity Intermediate Javascript, and the goal is that I would become very comfortable using pure functions and iterating over, reshaping, and accessing information from complex API responses.

### Getting Started

Please follow these steps to get started:

1. We'll start with the typical setup - clone this repo and install the dependencies

 - [ ] To clone the repo:

```git clone https://github.com/cheerworld/MarsDashboard.git```

 - [ ] For this project we are using yarn as our package manager, so to install your dependencies run:

```yarn install```

**If you don’t have yarn installed globally, follow their installation documentation here according to your operating system: https://yarnpkg.com/lang/en/docs/install

2. Next you'll need a NASA developer API key in order to access the API endpoints. To do that, go here: https://api.nasa.gov/. If you want to simply look around at what api endpoints NASA offers, you can use their provided DEMO_KEY to do this.

3. In your repo, you will see a .env-example file with a place for your API key. Rename or copy the file to one called `.env` and enter in your key. Now that you have your key, just remember to add it as a parameter to every request you make to NASA.

5. Run `yarn start` in your terminal and go to `http:localhost:3000` to check that your app is working. If you don't see an image on the page, check that your api key is set up correctly.

6. Remember to commit frequently, use branches, and leave good commit messages! You'll thank yourself later.

### A glimpse of the project, it will look like the images below,

![Mars Dashboard](./webImg/mars.PNG)
![Rover Info](./webImg/rover.PNG)
![Daily Image](./webImg/img.PNG)



### Project Details

In this project, my UI show the following:

- [ ] A gallery of the most recent images sent from each mars rover
- [ ] The launch date, landing date, name and status along with any other information about the rover
- [ ] A selection bar for the user to choose which rover's information they want to see
- [ ] A button to click for the daily image from NASA
- [ ] A button to click to see the Mars Weather Report

My UI does the following:

- [ ] Responsive. Needs to look good(aka not broken) on phones(max width 768px) and desktop(min-width 991px, max-width 1824px).
- [ ] Provide a way to dynamically switch the UI to view one of the three rovers


In this project, my frontend code include:

- [ ] Use only pure functions
- [ ] Use at least one Higher Order Function
- [ ] Use the array method `map`
- [ ] Use the ImmutableJS library

In this project, my backend code include:

- [ ] Be built with Node/Express
- [ ] Make successful calls to the NASA API
- [ ] Use pure functions to do any logic necessary
- [ ] Hide any sensetive information from public view (In other words, use your dotenv file)

### Above and Beyond

The NASA API has a lot more data to offer than what we are using here. It could be fun explore their API and see what they have to offer and what strikes your creativity to add into your project. You are not limited to the API calls. Look here (https://api.nasa.gov/ at the Browse API's section) to see all that's available.

Some ideas might be to incorporate the Astronomy Photo of the Day into your design, collect weather information on Mars, etc...

### Design

Create an image gallery slider, put a full page background image, code some falling asteroids with css animations ... the visual design of this UI is up to you! There is a lot of awesome dashboard design inspiration out there. You have already been given a good start with a mobile-first stylesheet already set up for you.
