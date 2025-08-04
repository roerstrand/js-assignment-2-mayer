function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getPlayerChoice(roundNumber) {
    const validMoves = ['rock', 'paper', 'scissors'];

    while (true) {
        const input = prompt(`Round ${roundNumber}: Enter Rock, Paper, or Scissors. Press Cancel to chicken out:`);

        if (input === null) {
            return null;
        }

        const move = input.trim().toLowerCase();

        if (validMoves.includes(move)) {
            return move;
        }

        alert("❌ Invalid input! Rock, Paper, or Scissors only.");
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function playRound(player, computer) {
    if (player === computer) {
        return `It's a tie! You both chose ${capitalize(player)}.`;
    }

    const win = (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    );

    return win
        ? `You Win! ${capitalize(player)} beats ${capitalize(computer)}.`
        : `You Lose! ${capitalize(computer)} beats ${capitalize(player)}.`;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let round = 1;

    alert("Welcome! Face The Mighty Bot in 5 rounds of Rock, Paper, Scissors.");

    while (round <= 5) {
        const playerMove = getPlayerChoice(round);

        if (playerMove === null) {
            alert("👋 Game cancelled. Backed out, huh? Bit of a sissy move.");
            return;
        }

        const computerMove = getComputerChoice().toLowerCase();
        const result = playRound(playerMove, computerMove);

        alert(result);

        if (result.startsWith("You Win")) {
            playerScore++;
        } else if (result.startsWith("You Lose")) {
            computerScore++;
        }

        alert(`📊 Scoreboard → You: ${playerScore} | The Mighty Bot: ${computerScore}`);
        round++;
    }

    alert(`🏁 Final Results - You: ${playerScore} | The Mighty Bot: ${computerScore}`);

    if (playerScore > computerScore) {
        alert("🎉 You defeated The Mighty Bot! Not bad, not a sissy at all.");
    } else if (playerScore < computerScore) {
        alert("💀 The Mighty Bot wins. Better luck next time.");
    } else {
        alert("🤝 It's a tie! You and The Mighty Bot fought equally... like true champs.");
    }
}

game();