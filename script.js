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

        console.log(result);

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
        console.log(`Your score weakling: ${playerScore}, The Best (Shitty) AI: ${computerScore}`);
    }

    console.log("🏁 Final Results:");
    console.log(`You: ${playerScore} | Evil AI: ${computerScore}`);

    if (playerScore > computerScore) {
        console.log("🎉 You defeated the Shitty AI!");
    } else if (playerScore < computerScore) {
        console.log("💀 The Shitty AI wins. You are even more shitty");
    } else {
        console.log("Tie! For now, you both suck equally.");
    }
}
