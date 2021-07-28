import "./App.css";
import { useState, useEffect } from "react"
import Square from "./Components/Square";
import { Patterns } from "./Pattern";

function App() {
    const [board, setBoard] = useState(["","","","","","","","",""]);
    const [player, setPlayer] = useState(["X"]);
    const [result, setResult] = useState({ winner: "none", state:"none"})

    useEffect(() => {
        checkWinner();
        checkIfTie();
        if(player == "X"){
          setPlayer("O");
        }
        else{
          setPlayer("X");
        }
    }, [board]);

    useEffect(() =>{
      if (result.state !== "none"){
        alert(`Game Finished! Wining Player: ${result.winner}`);
        restartGame();
      }
    }, [result]);
    const chooseSquare = (square) =>{
      setBoard(board.map((val, idx) => {
        if( idx == square && val == ""){
          return player;
        }
        return val;
      })
      );
   
    };

    const checkWinner = () => {
      Patterns.forEach((currentPattern) => {
        const firstPlayer = board[currentPattern[0]];
        if( firstPlayer == "") return;
        let foundWinPattern = true
        currentPattern.forEach((idx) => {
          if(board[idx] != firstPlayer){
            foundWinPattern = false
          }
        })
        if( foundWinPattern ){
          setResult({ winner: player, state:"won"});
        }
      });
    };
    const checkIfTie = () => {
      let full = true;
      board.forEach((square) => {
        if( square == ""){
          full = false
        }
      })
      if(full){
        setResult({winner: "No One", state: "Tie"});
      }
    };

    const restartGame = () =>{
      setBoard(["","","","","","","","",""])
      setPlayer("O");
    };

    return (
      <div className="App">
        {/* <div className="text-header">Tic Tac Toe</div> */}
        <div className="board">
          <div className="row">
              <Square val = {board[0]} chooseSquare={() => {chooseSquare(0);}}/>
              <Square val = {board[1]} chooseSquare={() => {chooseSquare(1);}}/>
              <Square val = {board[2]} chooseSquare={() => {chooseSquare(2);}}/>
          </div>
          <div className="row">
              <Square val = {board[3]} chooseSquare={() => {chooseSquare(3);}}/>
              <Square val = {board[4]} chooseSquare={() => {chooseSquare(4);}}/>
              <Square val = {board[5]} chooseSquare={() => {chooseSquare(5);}}/>
          </div>
          <div className="row">
              <Square val = {board[6]} chooseSquare={() => {chooseSquare(6);}}/>
              <Square val = {board[7]} chooseSquare={() => {chooseSquare(7);}}/>
              <Square val = {board[8]} chooseSquare={() => {chooseSquare(8);}}/>
          </div>
        
        </div>
      </div>
    )  

}
export default App;
