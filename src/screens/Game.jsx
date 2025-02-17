import { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import "../Game.css" // import the CSS file 

export default function Game() {
  const choices = [
    { name: "rock", icon: <FaHandRock className="choice-icon" size={40} /> },
    { name: "paper", icon: <FaHandPaper className="choice-icon" size={40} /> },
    { name: "scissors", icon: <FaHandScissors className="choice-icon" size={40} /> },
  ];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ wins: 0, losses: 0 });

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
    const computer = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(determineWinner(choice, computer));
  };

  return (
    <div className="game-container">
      <h1>Rock Paper Scissors</h1>

      <div className="choices">
        {choices.map((item) => (
          <button key={item.name} className="choice-btn" onClick={() => handleChoice(item.name)}>
            {item.icon}
          </button>
        ))}
      </div>

      {playerChoice && (
        <div className="results">
          <p>You chose: {playerChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>{result}</p>
        </div>
      )}

      <div className="scoreboard">
        <p>Wins: {score.wins}</p>
        <p>Losses: {score.losses}</p>
      </div>

      <button className="play-again-btn" onClick={() => setPlayerChoice(null)}>
        Play Again
      </button>
    </div>
  );
}
