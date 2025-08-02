# JavaScript Assignment - Rock, Paper, Scissors Game

This repository contains a complete Rock, Paper, Scissors game implementation as part of a JavaScript assignment.

## 🎮 Game Description

An interactive Rock, Paper, Scissors game where you play against the computer. The game features:
- 5 rounds of gameplay
- Score tracking
- Input validation
- Fun "evil AI" theme
- Clear win/loss/tie detection

## 🚀 How to Play

1. Clone this repository
2. Open `index.html` in a web browser
3. The game will start automatically with popup prompts
4. Enter "Rock", "Paper", or "Scissors" (case-insensitive)
5. Play 5 rounds and see who wins!

## 📁 File Structure

- `index.html` - Main HTML file
- `script.js` - JavaScript file containing the game logic
- `README.md` - This documentation file

## 🎯 Game Features

- **Computer AI**: Randomly selects Rock, Paper, or Scissors
- **Input Validation**: Handles invalid inputs gracefully
- **Score Tracking**: Keeps track of player vs computer score
- **Case Insensitive**: Accepts input in any case (rock, ROCK, Rock, etc.)
- **5-Round Game**: Plays exactly 5 rounds as specified
- **Clear Results**: Shows results for each round and final winner

## 🛠️ Technical Implementation

- `computerPlay()` - Generates random computer choice
- `playRound()` - Handles single round logic and winner determination
- `capitalize()` - Utility function for proper text formatting
- `game()` - Main game loop with score tracking

## 🏆 Game Rules

- Rock beats Scissors
- Scissors beats Paper  
- Paper beats Rock
- Ties occur when both players choose the same option

## 📊 Expected Output

The game will show:
- Round-by-round results
- Current score after each round
- Final score and winner declaration
- Fun themed messages throughout gameplay