import React from "react";
import Board from "./Board";
import Controls from "./Controls";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSquare: { val: null, row: null, col: null, box: null },
      board: [
        [0, 0, 2, 0, 5, 0, 8, 3, 0],
        [3, 5, 1, 0, 0, 0, 2, 7, 9],
        [9, 6, 8, 0, 7, 0, 0, 0, 0],
        [7, 0, 0, 1, 8, 4, 3, 0, 0],
        [5, 0, 0, 7, 0, 0, 4, 1, 2],
        [0, 0, 0, 0, 0, 0, 6, 0, 0],
        [2, 4, 0, 0, 1, 0, 0, 6, 0],
        [8, 0, 9, 6, 0, 7, 0, 4, 3],
        [6, 3, 0, 0, 9, 8, 7, 2, 0],
      ],
      solution: [
        [4, 7, 2, 9, 5, 1, 8, 3, 6],
        [3, 5, 1, 8, 4, 6, 2, 7, 9],
        [9, 6, 8, 3, 7, 2, 1, 5, 4],
        [7, 2, 6, 1, 8, 4, 3, 9, 5],
        [5, 8, 3, 7, 6, 9, 4, 1, 2],
        [1, 9, 4, 2, 3, 5, 6, 8, 7],
        [2, 4, 7, 5, 1, 3, 9, 6, 8],
        [8, 1, 9, 6, 2, 7, 5, 4, 3],
        [6, 3, 5, 4, 9, 8, 7, 2, 1],
      ],
      conflicts: [],
    };
  }

  handleSelectedSquareChanged(sq) {
    this.setState({ selectedSquare: sq });
  }

  canChangeSquare() {
    let sq = this.state.selectedSquare;
    return sq.row !== null && this.state.board[sq.row][sq.col] <= 0;
  }

  handleNumButtonClick(num) {
    if (this.canChangeSquare()) {
      this.updateBoard(-num);
    }
  }

  handleDelete() {
    if (this.canChangeSquare()) {
      this.updateBoard(0);
    }
  }

  handleHint() {
    if (this.canChangeSquare()) {
      let sq = this.state.selectedSquare;
      this.updateBoard(this.state.solution[sq.row][sq.col]);
    }
  }

  handleUndo() {
    alert("Not Implemented Yet!");
  }

  updateBoard(val) {
    let sq = this.state.selectedSquare;
    let rows = [...this.state.board];
    let vals = [...rows[sq.row]];
    vals[sq.col] = val;
    rows[sq.row] = vals;

    let conflicts = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let value = Math.abs(rows[i][j]);
        if (value === 0) {
          continue;
        }
        for (let k = 0; k < 9; k++) {
          if (k !== i && Math.abs(rows[k][j]) === value) {
            conflicts.push(i * 9 + j);
          }
          if (k !== j && Math.abs(rows[i][k]) === value) {
            conflicts.push(i * 9 + j);
          }
        }
        let box = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        let diffK = Math.floor(box / 3) * 3;
        let diffL = (box % 3) * 3;
        for (let k = diffK; k < diffK + 3; k++) {
          for (let l = diffL; l < diffL + 3; l++) {
            if (k === i && l === j) {
              continue;
            }
            if (Math.abs(rows[k][l]) === value) {
              conflicts.push(i * 9 + j);
            }
          }
        }
      }
    }

    this.setState({ board: rows, conflicts: conflicts });
  }

  render() {
    return (
      <div>
        <Board
          board={this.state.board}
          selectedSquare={this.state.selectedSquare}
          conflicts={this.state.conflicts}
          onSelectedSquareChanged={(sq) => this.handleSelectedSquareChanged(sq)}
        ></Board>
        <Controls
          onClick={(num) => this.handleNumButtonClick(num)}
          onUndo={() => this.handleUndo()}
          onDelete={() => this.handleDelete()}
          onHint={() => this.handleHint()}
        ></Controls>
      </div>
    );
  }
}

export default App;
