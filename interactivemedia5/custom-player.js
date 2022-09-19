/* retrieve the elements we'll be using and assigning them variables */

/* you can see that I'm using a mix of getElementById and getElementsByClassName to retrieve them - as
   discussed last week getElementsByClassName returns a list, however knowing that there is only one 
   element with the associated class allows me to use the array index of [0] - the first item - to
   return a singular element - if there were multiple elements with that class it would return the first
   element  */

let media = document.getElementById("media");
let controls = document.getElementsByClassName("controls")[0];

/* I have added extra buttons for the 60 second skip forward and backwards so that you could have more control (however it does not work because I couldnt get it to work)
    the idea stemmed from watching anime, people like to skip past the 2 min intro with music to continue binging content
    the reason I felt this was important was because it helps give the control over the video to the viewer
    and instead of taking more actions of pressing the scrub bar and moving your whole arm, you could click
    a few times or use  */
let rwd = document.getElementsByClassName("rwd")[0];
let play = document.getElementsByClassName("play")[0];
let stop = document.getElementsByClassName("stop")[0];
let fwd = document.getElementsByClassName("fwd")[0];
let volSlider = document.getElementsByClassName("vol")[0];
let minforward = document.getElementsByClassName("forward")[0];
let minbackward = document.getElementsByClassName("backward")[0];

let timerWrapper = document.getElementsByClassName("timer")[0];
let timer = document.getElementsByClassName("timer-span")[0];
let timerBar = document.getElementsByClassName("timer-bar")[0];

var forwardmin = document.getElementById("forwardmin");
var backwardmin = document.getElementById("backwardmin");
/* I'm also declaring some blank variables here that will later be assigned to intervals - declaring them
   outside of the functions like this means that they will have what's called "global scope" meaning they 
   will be accessible within different functions */

/* for more information check out the link on modules to JS Scope */

let intervalFwd;
let intervalRwd;

/* removing the default controls and showing the custom controls */

/* this is done in the js so that if for whatever reason the js doesn't load the player will 
   use the default controls */

media.removeAttribute("controls");
controls.style.visibility = "visible";

/* add an event listener for clicking the play/pause button and then define it's functionality */

play.addEventListener('click', playPauseMedia);

function playPauseMedia(){
  
  /* the four lines below are cancelling the fast forward or rewind functions if they are running - 
     the first two lines remove the class used and the second two make sure the intervals stop */

  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);

  /* like we've previously seen this code uses an if statement to do something based on a bool - 
     media.paused will return true if paused and false if playing so we can make the button click
     either pause or play and then change it's icon depending on the current context */

  if(media.paused){
    play.setAttribute('data-icon', 'u');
    media.play();
  } else {
    play.setAttribute('data-icon', 'P');
    media.pause();
  }
}

/* add an event listener for clicking the stop button and the media finishing, and then define 
   their functionality */

stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

function stopMedia() {
  media.pause();
  /* reset the current time to 0 - the beginning */
  media.currentTime = 0;
  play.setAttribute('data-icon', 'P');
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
}

/* add an event listener for clicking the fwd & rwd buttons and then define their functionality */

rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);
forwardmin.addEventListener("click", mediaBackward);
backwardmin.addEventListener("click", mediaForward);

function mediaBackward() {
  /* make sure the fast forward interval isn't also running */
  clearInterval(intervalFwd);
  fwd.classList.remove("active");
  /* check to see if we should stop or start the rewind function based on the presence of the "active" class */
  if(rwd.classList.contains("active")) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    /* if stopping the rewind make sure to start playback again */
    media.play();
  } else {
    rwd.classList.add("active");
    media.pause();
    /* if starting the rewind start the windBackwards function on an interval */
    intervalRwd = setInterval(windBackward, 500);
  }
}

/* see mediaBackward above for more details on how this works */

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if(fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 600);
  }
}

function windBackward(){
  /* if currentTime is back at the start stop the windback so it doesn't overshoot 0 */
  if(media.currentTime <=3) {
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward(){
  /* if currentTime is at the end of curation stop the fast forward so it doesn't overshoot */
  if(media.currentTime >= media.duration - 3) {
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}
/* this was suppose to be skip button thats suppose to skip by 60 seconds forward and backwards, but I could not get it to work.*/
forwardmin.onclick = function() {
  players[0].seek(players[0].currentTime() + 10);
  }

backwardmin.onclick = function() {
  players[0].seek(Math.max(0, players[0].currentTime() - 10));
  }
/* add an event listener for the elapsed time and then define it's functionality */

media.addEventListener("timeupdate", setTime);

function setTime(){
  console.log("update")
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);

  let minuteValue = minutes.toString().padStart(2, "0");
  let secondValue = seconds.toString().padStart(2, "0");

  /* both this line and the one four lines below uses what's called template literals to
     dynamically create strings - note the use of ` not ' or " to define the string and ${}
     to define the input variable */

  /* this is like adding strings together - the other way to write this out would be:
     minuteValue + ":" + secondValue - by adding the variables to the string you convert them 
     all into a single string, however it can get messy so instead template literals are often
     used to write them all in one easier to read statement */

  /* for more information check out the link on modules to String Interpolation */

  let mediaTime = `${minuteValue}:${secondValue}`;
  
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  timerBar.style.width = `${barLength}px`;
}

// media.volume = value of sound
media.volume = 0.1;

volSlider.addEventListener("input", (e) => {
changeVolume(e.target.value);

})

function changeVolume(newVolume){
  media.volume = newVolume;
}


