let playerScore = 0;
let computerScore = 0;

// Load sound files
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const drawSound = document.getElementById('draw-sound');

// Adjust volume for audio files
winSound.volume = 0.5;
loseSound.volume = 0.5;
drawSound.volume = 0.5;

// Add event listeners to buttons for playing the game
document.getElementById('rock-btn').addEventListener('click', () => playGame('rock'));
document.getElementById('paper-btn').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors-btn').addEventListener('click', () => playGame('scissors'));

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    displayResult(playerChoice, computerChoice, result);
    updateScore(result);
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) return 'draw';
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return 'player';
    }
    return 'computer';
}

function displayResult(player, computer, result) {
    const resultDiv = document.getElementById('result');
    let message;

    if (result === 'draw') {
        playSound(drawSound);
        message = `It's a draw! You both chose ${player}.`;
    } else if (result === 'player') {
        playSound(winSound);
        message = `You win! ${player} beats ${computer}.`;
    } else {
        playSound(loseSound);
        message = `You lose! ${computer} beats ${player}.`;
    }

    resultDiv.textContent = message;
}

function updateScore(result) {
    if (result === 'player') {
        playerScore++;
    } else if (result === 'computer') {
        computerScore++;
    }
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
}

function playSound(sound) {
    if (sound) {
        sound.pause(); // Reset the sound
        sound.currentTime = 0; // Ensure it plays from the beginning
        sound.play().catch(err => console.error("Error playing sound:", err));
    }
}
