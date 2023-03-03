const currentURL = location.hostname === "0.0.0.0" ? "" : "/sept_minutes";
const exercises = await getExercises();

import observable from "./observable.js";

async function getExercises() {
  const res = await fetch(currentURL + '/static/exercises.json')
  let data = await res.json();
  
  return data.exercises;
}

const playButton = document.querySelector("#play-button");

playButton.onclick = async function() {
  document.getElementById("play-button-container").remove();
  startClock(520);
};

function workout(data) {
  const position = Math.trunc(data / 40)
  const currentExercise = exercises[position]

  displayExercise(currentExercise)
}

function displayExercise(exercise) {
  let exerciseEl = document.getElementById("exercise-container");
  
  exerciseEl.innerHTML = "";
  exerciseEl.append(exercise.name);
}

function displayClock(data) {
  let timerEl = document.getElementById("timer-container");

  timerEl.innerHTML = "";
  timerEl.append(data);
}

observable.subscribe(workout);
observable.subscribe(displayClock);

function startClock(maxTime) {
  let current = 0;
  observable.notify(current);

  function add_time() {
    current++;
    observable.notify(current);

    if (current >= maxTime) { clearInterval(timer);}
  };

  let timer = setInterval(add_time, 1000);
}