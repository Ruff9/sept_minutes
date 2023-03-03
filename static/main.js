const currentURL = location.hostname === "0.0.0.0" ? "" : "/sept_minutes";
const exercises = await getExercises();

async function getExercises() {
  const res = await fetch(currentURL + '/static/exercises.json')
  let data = await res.json();
  
  return data.exercises;
}

const playButton = document.querySelector("#play-button");

playButton.onclick = async function() {
  document.getElementById("play-button-container").remove();
  startWorkout();
};

async function startWorkout() {
  for (let i = 0; i < exercises.length; i++) { 
    await startRest(exercises[i])
      .then(function () {
        return startExercise(exercises[i]);
      })
      .catch((error) => console.error(error));
  };
}

let timerResolve;

function startExercise(exercise) {
  return new Promise(function (resolve) {
    timerResolve = resolve;

    displayTitle(exercise.name)
    startTimer(30);
  });
}

function startRest(exercise) {
  return new Promise(function (resolve) {
    timerResolve = resolve;
    displayTitle("Rest")
    startTimer(10);

    playInfoSound(exercise);
  });
}

function playInfoSound(exercise) {
  function playNextExercice() {
    let sound = new Audio(currentURL + '/static/sound/next_exercise.m4a');
    sound.play();

    setTimeout(playExerciseName, 1800);
  }
  
  function playExerciseName() {
    const exo_audio = new Audio(currentURL + '/static/sound/' + exercise.sound + '.m4a')
    exo_audio.play();
  }

  playNextExercice();
}

function startTimer(maxTime) {
  let timerEl = document.getElementById("timer-container");
  let current = 0;

  timerEl.innerHTML = current;

  function add_time() {
    current++;
    timerEl.innerHTML = current;
    if (current >= maxTime) {
      clearInterval(timer);
      timerResolve();
    }
  };

  let timer = setInterval(add_time, 1000);
}

function displayTitle(title) {
  let exerciseEl = document.getElementById("exercise-container");
    
  exerciseEl.innerHTML = "";
  exerciseEl.append(title);
}