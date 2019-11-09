import React, { Component } from "react"
import { Container, Row } from "react-bootstrap"
import BoardSquare from "../components/BoardSquare"

export default class Board extends Component {
  render() {
    var board = this.props.boardState.slice()
    // Draw the board from the top down
    board.reverse()
    return (
      <Container fluid='true'>
        {
          board.map((row, i) => (
          <Row 
            key={'board_row_' + i}
            noGutters='true' 
            className="checker-row">
            {
              row.map((sq, j) => (
                <BoardSquare
                  key={"" + j.toString() + (7 - i).toString()}
                  id={"UI-" + j.toString() + (7 - i).toString()}
                  square={sq}
                />
              ))
            }
          </Row>
          ))
        }
      </Container>
    )
  }
}

