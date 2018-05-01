import document from "document";
import * as messaging from "messaging";
import clock from "clock";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as leaderboard from "../common/leaderboard";
import * as animate from "../common/animate";

let persons = {
  joris: {
      steps: 0,
      name: 'Joris'
  },
  roy: {
      steps: 0,
      name: 'Roy'
  },
  laurens: {
      steps: 0,
      name: 'Laurens'
  },
  elias: {
      steps: 0,
      name: 'Elias'
  },
  julian: {
      steps: 0,
      name: 'Julian'
  },
  thibaut: {
      steps: 0,
      name: 'Thibaut'
  },
  philippe: {
      steps: 0,
      name: 'Philippe'
  },
  nils: {
      steps: 0,
      name: 'Nils'
  },
  stijn: {
      steps: 0,
      name: 'Stijn'
  },
  arnaud: {
      steps: 0,
      name: 'Arnoud'
  },
  klaas: {
      steps: 0,
      name: 'Klaas'
  }
}

let toNextArc = document.getElementById("todoArc");
let beforePreviousArc = document.getElementById("beforeArc");
let stepsText = document.getElementById("steps");
let stepsShadow = document.getElementById("stepsShadow");
let positionLabel = document.getElementById("positionLabel");
let positionShadowLabel = document.getElementById("positionShadowLabel");
let nextChallengerShadowLabel = document.getElementById("nextChallengerShadowLabel");
let nextChallengerLabel = document.getElementById("nextChallengerLabel");
let previousChallengerShadowLabel = document.getElementById("previousChallengerShadowLabel");
let previousChallengerLabel = document.getElementById("previousChallengerLabel");
let timeLabel = document.getElementById("time");
let timeLabelShadow = document.getElementById("timeShadow");
let winAnimation = document.getElementById("winAnimation");
let loseAnimation = document.getElementById("loseAnimation");
let caughtUp = document.getElementById("caughtUp");
let nextVictim = document.getElementById("nextVictim");
let lostPlace = document.getElementById("lostPlace");
let watchOut = document.getElementById("watchOut");

// Message is received
messaging.peerSocket.onmessage = evt => {
  const id = evt.data.key;
  if (!!persons[id]) {
    const person = persons[id] || {};
    const previousInfo = leaderboard.calculateInformation(persons, 'joris');
    const changedSteps = JSON.parse(evt.data.newValue).name;
    persons = leaderboard.setPersonSteps(id, { ...person, steps: changedSteps }, persons);
    const { steps, toNext, beforePrevious, position, nextChallenger, previousChallenger } = leaderboard.calculateInformation(persons, 'joris');
    
    animate.animateArc(previousInfo.toNext, toNext, toNextArc);
    animate.animateArc(previousInfo.beforePrevious, beforePrevious, beforePreviousArc);
    stepsText.textContent = steps;
    stepsShadow.textContent = steps;
    positionLabel.textContent = position;
    positionShadowLabel.textContent = position;
    nextChallengerShadowLabel.textContent = nextChallenger;
    nextChallengerLabel.textContent = nextChallenger;
    previousChallengerShadowLabel.textContent = previousChallenger;
    previousChallengerLabel.textContent = previousChallenger;
    
    if (position < previousInfo.position) {
      caughtUp.textContent = `You caught up ${previousChallenger}.`;
      nextVictim.textContent = `Next victim is ${nextChallenger}!!`;
      animate.fadeInAndOut(winAnimation, 1000, 5000);
    } else if (position > previousInfo.position) {
      lostPlace.textContent = `You lost a place to ${nextChallenger}.`;
      watchOut.textContent = `Watch out for ${previousChallenger}.`;
      animate.fadeInAndOut(loseAnimation, 1000, 5000);
    }
  }
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = util.zeroPad(hours % 12 || 12);
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  timeLabel.text = `${hours}:${mins}`;
  timeLabelShadow.text = `${hours}:${mins}`;
}
