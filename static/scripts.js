const exercises = await getExercises();
const playButton = document.querySelector("#play-button");

async function getExercises() {
  let data;
  const res = await fetch('../static/exercises.json')
  data = await res.json();

  return data.exercises;
}

playButton.onclick = async function() {
  exercises.forEach((exo) => {
    console.log(exo.name);
  });
};


