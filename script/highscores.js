const highscoresList = document.querySelector('#highscoresList');
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

console.log(highScores);

highScores.forEach(score => {
    let li = document.createElement('li');
    li.innerText = `${score.name} : ${score.score}`;
    highscoresList.appendChild(li);
});