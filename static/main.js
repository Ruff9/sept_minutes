const currentURL = location.hostname === "0.0.0.0" ? "" : "/sept_minutes";
const exercises = await getExercises();

import observable from "./observable.js";

async function getExercises() {
  let data;
  const res = await fetch(currentURL + '/static/exercises.json')
  data = await res.json();
  
  return data.exercises;
}

const playButton = document.querySelector("#play-button");

playButton.onclick = async function() {
  startWorkout();
};

function startWorkout() {
  startClock(520);
}

function workout(data) {
  const position = Math.trunc(data / 40)
  const currentExercise = exercises[position]

  displayExercise(currentExercise)
}

function displayExercise(exercise) {
  let exerciseEl = document.getElementById("exercise-container");
  
  if (exerciseEl === null) {
    const container = document.querySelector("#workout-container");

    exerciseEl = document.createElement("div");
    exerciseEl.classList.add("exercise-container");
    exerciseEl.setAttribute("id", "exercise-container");
    container.prepend(exerciseEl)
  }

  exerciseEl.innerHTML = "";
  exerciseEl.append(exercise.name);
}

function displayClock(data) {
  let timerEl = document.getElementById("timer-container");
  
  if (timerEl === null) {
    const container = document.querySelector("#workout-container");
    empty(container);
    
    timerEl = document.createElement("div");
    timerEl.classList.add("timer-container");
    timerEl.setAttribute("id", "timer-container");
    container.append(timerEl)
  }

  timerEl.innerHTML = "";
  timerEl.append(data);
}

observable.subscribe(workout);
observable.subscribe(displayClock);

function startClock(maxTime) {
  let current = 0;

  function add_time() {
    current++;
    observable.notify(current);

    if (current >= maxTime) { clearInterval(timer);}
  };

  let timer = setInterval(add_time, 1000);
}

function empty(element) {
  while(element.firstElementChild) {
     element.firstElementChild.remove();
  }
}