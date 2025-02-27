import { useState } from "react";
import "../Game.css"; // Regular CSS file

// Importing images for Rock, Paper, Scissors
// import rockImg from "../assets/Rock.jpg";
// import paperImg from "../assets/paper.png";
// import scissorsImg from "../assets/scissors.png";

const choices = [
  { name: "rock", image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEyL2pvYjk1OS1lbGVtZW50LWItMDEzNi1wXzEucG5n.png" },
  { name: "paper", image: " https://static.thenounproject.com/png/88662-200.png " },
  { name: "scissors", image: "https://static.thenounproject.com/png/477919-200.png" },
];


export default function Game() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ wins: 0, losses: 0 });
  const [rounds, setRounds] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)].name;
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return "It's a tie!";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
      return "You win!";
    } else {
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
      return "You lose!";
    }
  };

  const handleChoice = (choice) => {
    if (gameOver) return;
    const computer = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(determineWinner(choice, computer));

    setRounds((prev) => prev + 1);
    if (rounds + 1 === 5) setGameOver(true);
  };

  const resetGame = () => {
    setScore({ wins: 0, losses: 0 });
    setRounds(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setGameOver(false);
  };

  return (
    <div className="game-container">
      {/* Navbar with logo and score */}
      <nav className="navbar">
        <div className="logo">Rock Paper Scissors</div>
        <div className="score-display">Wins: {score.wins} | Losses: {score.losses}</div>
      </nav>

      <h1>Rock Paper Scissors</h1>
      <div className="choices">
        {choices.map((item) => (
          <button
            key={item.name}
            className={`choice-btn ${gameOver ? "disabled" : ""}`}
            onClick={() => handleChoice(item.name)}
            disabled={gameOver}
          >
            <img src={item.image} alt={item.name} className="choice-image" />
          </button>
        ))}
      </div>

      {playerChoice && (
        <div className="results">
          <p>You chose: <span className="bold">{playerChoice}</span></p>
          <p>Computer chose: <span className="bold">{computerChoice}</span></p>
          <p className={`result ${result.includes("win") ? "win" : "lose"}`}>{result}</p>
        </div>
      )}

      <div className="buttons">
        <button className="play-again-btn" onClick={() => setPlayerChoice(null)} disabled={gameOver}>
          Play Again
        </button>
        <button className="reset-btn" onClick={resetGame}>Reset Game</button>
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>
            {score.wins > score.losses ? "🎉 You won the game!" : "😢 You lost the game!"}
          </p>
        </div>
      )}
    </div>
  );
}
