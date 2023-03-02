const currentURL = location.hostname === "0.0.0.0" ? "" : "/sept_minutes";
const playButton = document.querySelector("#play-button");
const exercises = await getExercises();

async function getExercises() {
  let data;
  const res = await fetch(currentURL + '/static/exercises.json')
  data = await res.json();

  return data.exercises;
}

playButton.onclick = async function() {
  exercises.forEach((exo) => {
    console.log(exo.name);
  });
};
