import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// ---------------------- Square ----------------------------
// <button> 렌더링
// Square는 controlled components이다. 상태 관리를 하지 않고 Board 컴포넌트에서 값을 받아오고 값을 전달함.
// Board has full conter over Square component.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// ---------------------- Board ----------------------------
// 사각형 9개를 렌더링
class Board extends React.Component {
  constructor(props) {
    super(props); // 모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출 구문부터 작성해야 함.
    this.state = {
      // 배열 값을 null로 초기화
      squares: Array(9).fill(null),
      xIsNext: true,
      // 생성자의 초기 state를 수정하는 것으로 기본값을 설정할 수 있음.
    };
  }

  // Square에서 onClick 이벤트가 Board의 handelClick을 호출함.
  handleClick(i) {
    // To create a copy of the sqaures array to modify instead of modifiying the existing array, slice() is used.
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  // Board에서 Square로 value와 onClick 두개의 props를 전달하는 함수 코드
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner.name;
    } else {
      status = "Next player : " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// ---------------------- Game ----------------------------
// 게임판을 렌더링, 최상위 단계
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
    };
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ------------------- 승자 결정하기 ---------------------------
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ============================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
