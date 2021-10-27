import React from "react";
import Square from "./Square";
import "./Board.css";

class Board extends React.Component {
  render() {
    return (
      <table className="board">
        <tbody>
          {this.props.board.map((row, i) => (
            <tr
              key={"row" + i}
              className={[2, 5].includes(i) ? "bottomBorder" : ""}
            >
              {row.map((val, j) => (
                <Square
                  key={"row" + i + "col" + j}
                  val={val < 0 ? -val : val}
                  row={i}
                  col={j}
                  box={Math.floor(i / 3) * 3 + Math.floor(j / 3)}
                  selectedSquare={this.props.selectedSquare}
                  isUserSquare={val < 0}
                  conflicts={this.props.conflicts}
                  onClick={(sq) => this.props.onSelectedSquareChanged(sq)}
                ></Square>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Board;
