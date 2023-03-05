const currentURL = location.hostname === "0.0.0.0" ? "" : "/sept_minutes";
let timerResolve;

document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.querySelector("#play-button");
  
  playButton.onclick = async function() {
    document.getElementById("play-button-container").remove();
    workout();
  };
});

async function workout() {
  const exercises = await getExercises();

  for (let i = 0; i < exercises.length; i++) { 
    await timedRest(exercises[i])
      .then(function () { return timedExercise(exercises[i]); })
      .catch((error) => console.error(error));
  };

  setTimeout(playSound("congratulation.m4a"), 1500);
}

async function getExercises() {
  const res = await fetch(currentURL + '/static/exercises.json')
  let data = await res.json();

  return data.exercises;
}

function timedExercise(exercise) {
  return new Promise(function (resolve) {
    timerResolve = resolve;

    displayTitle(exercise.name)
    setTimer(30);
  });
}

function timedRest(exercise) {
  return new Promise(function (resolve) {
    timerResolve = resolve;
    displayTitle("Rest")
    setTimer(10);

    playInfoSound(exercise);
  });
}

function playInfoSound(exercise) {
  function playNextExercice() {
    playSound("next_exercise.m4a");
    setTimeout(playExerciseName, 1800);
  }
  
  function playExerciseName() { playSound(exercise.sound + '.m4a'); }

  setTimeout(playNextExercice, 1500);
}

function playSound(file) {
  const audio = new Audio(currentURL + '/static/sound/' + file)
  audio.play();
}

function setTimer(maxTime) {
  let timerEl = document.getElementById("timer-container");
  let current = 0;
  timerEl.innerHTML = current;

  function add_time() {
    current++;
    timerEl.innerHTML = current;

    if (current == maxTime - 2) { playSound("countdown.wav") }

    if (current >= maxTime) {
      clearInterval(timer);
      timerResolve();
    }
  };

  const timer = setInterval(add_time, 1000);
}

function displayTitle(title) {
  let exerciseEl = document.getElementById("exercise-container");
    
  exerciseEl.innerHTML = "";
  exerciseEl.append(title);
}