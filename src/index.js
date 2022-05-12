import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// <button> 렌더링
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

// 사각형 9개를 렌더링
class Board extends React.Component {
  constructor(props) {
    super(props); // 모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출 구문부터 작성해야 함.
    this.state = {
      squares: Array(9).fill(null),
    };
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
    const status = "Next player: X";

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

// 게임판을 렌더링, 나중에 수정할 자리 ㅛ시자 값을 가지고 있음.
class Game extends React.Component {
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

// ============================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
