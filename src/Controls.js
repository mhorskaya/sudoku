import React from "react";
import "./Controls.css";

class Controls extends React.Component {
  getValue(i, j) {
    return i * 3 + j + 1;
  }

  render() {
    return (
      <div className="buttons">
        <table className="buttonsTable">
          <tbody>
            <tr key="numButtonRow0">
              <td
                key="undoButton"
                className="button"
                onClick={() => this.props.onUndo()}
              >
                Undo
              </td>
              <td
                key="deleteButton"
                className="button"
                onClick={() => this.props.onDelete()}
              >
                Del
              </td>
              <td
                key="hintButton"
                className="button"
                onClick={() => this.props.onHint()}
              >
                Hint
              </td>
            </tr>
            {[0, 1, 2].map((i) => (
              <tr key={"numButtonRow" + (i + 1)}>
                {[0, 1, 2].map((j) => (
                  <td
                    key={"numButton" + this.getValue(i, j)}
                    className="button"
                    onClick={() => this.props.onClick(this.getValue(i, j))}
                  >
                    {this.getValue(i, j)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Controls;
