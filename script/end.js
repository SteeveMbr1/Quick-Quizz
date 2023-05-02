const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = localStorage.getItem('mostResentScore');
const scoreTxt = document.querySelector('#finalScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


scoreTxt.innerHTML = finalScore;


username.addEventListener('keyup', () => {
    console.log(username.value.length > 3);
    saveScoreBtn.disabled = !(username.value.length >= 3);
});

saveHighScore = e => {
    e.preventDefault();
    const score = {
        name: username.value,
        score: finalScore
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
}