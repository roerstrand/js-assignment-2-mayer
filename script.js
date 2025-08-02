function computerPlay() {

    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}


function playRound(playerSelection, computerSelection) {

    const player = playerSelection.toLowerCase();

    const computer = computerSelection.toLowerCase();

    if (!['rock', 'paper', 'scissors'].includes(player)) {
        return 'Invalid input! Please choose Rock, Paper, or Scissors.';
    }

    if (player === computer) {
        return `It's a tie! You both chose ${computer}.`;
    }

    const win = (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    );

    if (win) {
        return `You Win! ${capitalize(player)} beats ${capitalize(computer)}.`;
    } else {
        return `You Lose! ${capitalize(computer)} beats ${capitalize(player)}.`;
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;

    alert("Never back down human. You *must* face me, the shitty AI, in 5 rounds of Rock, Paper, Scissors!");

    while (roundsPlayed < 5) {
        let playerInput;
        playerInput = prompt(`Round ${roundsPlayed + 1}: Enter Rock, Paper, or Scissors:`);

        if (playerInput === null) {
            alert("No chickening out! You must play coward. Try again.");
            continue;
        }

        const computerChoice = computerPlay();
        const result = playRound(playerInput.trim(), computerChoice);

        alert(result);

        if (result.startsWith("Invalid input")) {
            alert("Invalid choice my man! Only Rock, Paper, or Scissors are accepted.");
            continue;
        }

        if (result.startsWith("You Win")) {
            playerScore++;
        } else if (result.startsWith("You Lose")) {
            computerScore++;
        }

        roundsPlayed++;
        alert(`Your score weakling: ${playerScore}, The Best (Shitty) AI: ${computerScore}`);
    }

    alert("🏁 Final Results:");
    alert(`You: ${playerScore} | Shitty AI: ${computerScore}`);

    if (playerScore > computerScore) {
        alert("🎉 You defeated the Shitty AI!");
    } else if (playerScore < computerScore) {
        alert("💀 The Shitty AI wins. You are even more shitty");
    } else {
        alert("Tie! For now, you both suck equally.");
    }
}

game();