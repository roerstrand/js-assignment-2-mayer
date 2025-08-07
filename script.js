// ========================================
// ROCK PAPER SCISSORS GAME - IMPROVED VERSION
// ========================================

class RockPaperScissorsGame {
    constructor() {
        // Game state
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 0;
        this.maxRounds = 5;
        this.isGameActive = false;
        this.gameHistory = [];
        
        // Game choices
        this.choices = ['rock', 'paper', 'scissors'];
        this.choiceEmojis = {
            rock: '🪨',
            paper: '📄',
            scissors: '✂️'
        };
        
        // DOM elements
        this.elements = {
            playerScore: document.getElementById('playerScore'),
            computerScore: document.getElementById('computerScore'),
            currentRound: document.getElementById('currentRound'),
            statusText: document.getElementById('statusText'),
            choiceButtons: document.querySelectorAll('.choice-btn'),
            roundResults: document.getElementById('roundResults'),
            playerChoice: document.getElementById('playerChoice'),
            computerChoice: document.getElementById('computerChoice'),
            roundResult: document.getElementById('roundResult'),
            startGame: document.getElementById('startGame'),
            quitGame: document.getElementById('quitGame'),
            gameHistory: document.getElementById('gameHistory'),
            historyList: document.getElementById('historyList'),
            finalResults: document.getElementById('finalResults'),
            finalMessage: document.getElementById('finalMessage'),
            finalScore: document.getElementById('finalScore')
        };
        
        // Initialize the game
        this.initializeEventListeners();
        this.updateUI();
    }

    // ========================================
    // INITIALIZATION METHODS
    // ========================================

    initializeEventListeners() {
        // Choice buttons
        this.elements.choiceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const choice = e.currentTarget.dataset.choice;
                this.handlePlayerChoice(choice);
            });
        });
        
        // Start new game button
        this.elements.startGame.addEventListener('click', () => this.startNewGame());
        
        // Quit game button
        this.elements.quitGame.addEventListener('click', () => this.quitGame());
    }

    // ========================================
    // GAME LOGIC METHODS
    // ========================================

    computerPlay() {
        // Generate a random choice for the computer
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }

    playRound(playerSelection, computerSelection) {
        // Determine the winner of a single round
        const player = playerSelection.toLowerCase();
        const computer = computerSelection.toLowerCase();

        // Validate player input
        if (!this.choices.includes(player)) {
            return { result: 'invalid', message: 'Invalid choice! Please choose Rock, Paper, or Scissors.' };
        }

        // Check for tie
        if (player === computer) {
            return { 
                result: 'tie', 
                message: `It's a tie! You both chose ${this.capitalize(computer)}.`,
                winner: 'tie'
            };
        }

        // Determine winner based on game rules
        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        if (winConditions[player] === computer) {
            return { 
                result: 'win', 
                message: `You Win! ${this.capitalize(player)} beats ${this.capitalize(computer)}.`,
                winner: 'player'
            };
        } else {
            return { 
                result: 'lose', 
                message: `You Lose! ${this.capitalize(computer)} beats ${this.capitalize(player)}.`,
                winner: 'computer'
            };
        }
    }

    capitalize(str) {
        // Capitalize the first letter of a string
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    // ========================================
    // GAME STATE METHODS
    // ========================================

    startNewGame() {
        // Reset game state and start a new game
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 0;
        this.isGameActive = true;
        this.gameHistory = [];
        
        // Update UI
        this.updateUI();
        this.updateStatus('Choose your weapon to start the battle!', 'blue');
        
        // Hide final results
        this.elements.finalResults.classList.add('hidden');
        
        console.log('New Rock Paper Scissors game started');
    }

    quitGame() {
        // Quit the current game
        if (this.isGameActive) {
            this.isGameActive = false;
            this.updateStatus('Game quit. Click "Start New Game" to play again.', 'gray');
            this.disableChoiceButtons();
        }
    }

    endGame() {
        // End the current game and show final results
        this.isGameActive = false;
        this.disableChoiceButtons();
        
        // Determine winner
        let finalMessage, finalScore;
        if (this.playerScore > this.computerScore) {
            finalMessage = '🎉 Congratulations! You defeated the AI!';
            finalScore = `Final Score: You ${this.playerScore} - AI ${this.computerScore}`;
            this.updateStatus('You won the match!', 'green');
        } else if (this.computerScore > this.playerScore) {
            finalMessage = '💀 The AI wins. Better luck next time!';
            finalScore = `Final Score: You ${this.playerScore} - AI ${this.computerScore}`;
            this.updateStatus('The AI won the match!', 'red');
        } else {
            finalMessage = '🤝 It\'s a tie! You both played equally well.';
            finalScore = `Final Score: You ${this.playerScore} - AI ${this.computerScore}`;
            this.updateStatus('The match ended in a tie!', 'yellow');
        }
        
        // Show final results
        this.elements.finalMessage.textContent = finalMessage;
        this.elements.finalScore.textContent = finalScore;
        this.elements.finalResults.classList.remove('hidden');
    }

    // ========================================
    // USER INTERACTION METHODS
    // ========================================

    handlePlayerChoice(choice) {
        // Handle the player's choice
        if (!this.isGameActive) {
            this.updateStatus('Please start a new game first.', 'yellow');
            return;
        }

        // Increment round counter
        this.currentRound++;
        
        // Get computer's choice
        const computerChoice = this.computerPlay();
        
        // Play the round
        const roundResult = this.playRound(choice, computerChoice);
        
        // Update scores
        if (roundResult.winner === 'player') {
            this.playerScore++;
        } else if (roundResult.winner === 'computer') {
            this.computerScore++;
        }
        
        // Add to history
        this.addToHistory(choice, computerChoice, roundResult);
        
        // Update UI
        this.updateUI();
        this.showRoundResults(choice, computerChoice, roundResult);
        
        // Check if game is over
        if (this.currentRound >= this.maxRounds) {
            setTimeout(() => this.endGame(), 2000);
        } else {
            setTimeout(() => this.hideRoundResults(), 2000);
        }
    }

    // ========================================
    // UI UPDATE METHODS
    // ========================================

    updateUI() {
        // Update score display
        this.elements.playerScore.textContent = this.playerScore;
        this.elements.computerScore.textContent = this.computerScore;
        this.elements.currentRound.textContent = this.currentRound;
        
        // Update choice buttons state
        this.updateChoiceButtonsState();
        
        // Show/hide game history
        if (this.gameHistory.length > 0) {
            this.elements.gameHistory.classList.remove('hidden');
        } else {
            this.elements.gameHistory.classList.add('hidden');
        }
    }

    updateStatus(message, color = 'blue') {
        // Update the status message with color coding
        this.elements.statusText.textContent = message;
        
        // Remove existing color classes
        this.elements.statusText.className = 'text-blue-800 font-medium text-center';
        
        // Add new color class
        switch (color) {
            case 'green':
                this.elements.statusText.className = 'text-green-800 font-medium text-center';
                break;
            case 'red':
                this.elements.statusText.className = 'text-red-800 font-medium text-center';
                break;
            case 'yellow':
                this.elements.statusText.className = 'text-yellow-800 font-medium text-center';
                break;
            case 'gray':
                this.elements.statusText.className = 'text-gray-800 font-medium text-center';
                break;
            default:
                this.elements.statusText.className = 'text-blue-800 font-medium text-center';
        }
    }

    updateChoiceButtonsState() {
        // Enable or disable choice buttons based on game state
        this.elements.choiceButtons.forEach(button => {
            if (this.isGameActive) {
                button.disabled = false;
                button.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                button.disabled = true;
                button.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });
    }

    disableChoiceButtons() {
        // Disable all choice buttons
        this.elements.choiceButtons.forEach(button => {
            button.disabled = true;
            button.classList.add('opacity-50', 'cursor-not-allowed');
        });
    }

    showRoundResults(playerChoice, computerChoice, roundResult) {
        // Show the round results
        this.elements.playerChoice.textContent = this.choiceEmojis[playerChoice];
        this.elements.computerChoice.textContent = this.choiceEmojis[computerChoice];
        this.elements.roundResult.textContent = roundResult.message;
        
        // Color code the result
        let resultColor = 'text-gray-800';
        switch (roundResult.result) {
            case 'win':
                resultColor = 'text-green-600';
                break;
            case 'lose':
                resultColor = 'text-red-600';
                break;
            case 'tie':
                resultColor = 'text-yellow-600';
                break;
        }
        
        this.elements.roundResult.className = `text-center mt-3 text-lg font-semibold ${resultColor}`;
        this.elements.roundResults.classList.remove('hidden');
    }

    hideRoundResults() {
        // Hide the round results
        this.elements.roundResults.classList.add('hidden');
    }

    addToHistory(playerChoice, computerChoice, roundResult) {
        // Add round to game history
        const historyItem = {
            round: this.currentRound,
            playerChoice: playerChoice,
            computerChoice: computerChoice,
            result: roundResult.result,
            message: roundResult.message
        };
        
        this.gameHistory.push(historyItem);
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        // Update the history display
        this.elements.historyList.innerHTML = '';
        
        this.gameHistory.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = 'flex justify-between items-center p-3 bg-gray-50 rounded-lg';
            
            const resultIcon = item.result === 'win' ? '✅' : 
                             item.result === 'lose' ? '❌' : '🤝';
            
            historyElement.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-sm font-medium text-gray-600">Round ${item.round}:</span>
                    <span class="text-lg">${this.choiceEmojis[item.playerChoice]} vs ${this.choiceEmojis[item.computerChoice]}</span>
                </div>
                <span class="text-sm font-medium">${resultIcon} ${item.result.toUpperCase()}</span>
            `;
            
            this.elements.historyList.appendChild(historyElement);
        });
    }

    // ========================================
    // UTILITY METHODS
    // ========================================

    resetGame() {
        // Reset all game state and UI
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 0;
        this.isGameActive = false;
        this.gameHistory = [];
        
        this.elements.finalResults.classList.add('hidden');
        this.elements.gameHistory.classList.add('hidden');
        this.elements.roundResults.classList.add('hidden');
        
        this.updateStatus('Choose your weapon to start the battle!', 'blue');
        this.updateUI();
    }
}

// ========================================
// GAME INITIALIZATION
// ========================================

// Wait for DOM to load, then initialize the game
document.addEventListener('DOMContentLoaded', () => {
    console.log('✂️ Rock Paper Scissors Game - Improved Version');
    console.log('Features: Modern UI, Quit functionality, Game history, Visual feedback');
    
    // Initialize the game
    const game = new RockPaperScissorsGame();
    
    // Make game globally accessible for debugging
    window.rockPaperScissorsGame = game;
});