import React from "react";
import "./Square.css";

class Square extends React.Component {
  handleClick() {
    this.props.onClick({
      val: this.props.val,
      row: this.props.row,
      col: this.props.col,
      box: this.props.box,
    });
  }

  render() {
    let classNames = ["square"];
    if ([2, 5].includes(this.props.col)) {
      classNames.push("rightBorder");
    }
    if (this.props.isUserSquare) {
      classNames.push("userSquare");
    }

    const sq = this.props.selectedSquare;
    if (this.props.conflicts.includes(this.props.row * 9 + this.props.col)) {
      classNames.push("conflict");
    } else if (this.props.row === sq.row && this.props.col === sq.col) {
      classNames.push("selectionSquare");
    } else if (
      (this.props.val !== 0 && this.props.val === sq.val) ||
      this.props.row === sq.row ||
      this.props.col === sq.col ||
      this.props.box === sq.box
    ) {
      classNames.push("selectionRelated");
    }

    return (
      <td className={classNames.join(" ")} onClick={() => this.handleClick()}>
        {this.props.val > 0 ? this.props.val : ""}
      </td>
    );
  }
}

export default Square;
