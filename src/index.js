import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

  const winningSquareStyle = {
    backgroundColor: 'blue'
  };

  return (
    <button className="square" onClick={props.onClick} style={props.winning ? winningSquareStyle : null}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, status) {
    return (
      <Square
        value={this.props.squares[i]}
        winning={status}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner  = getWinningSquare(this.props.squares);
    let squares = [];
    
    for(var row=0; row < 3; row++) {
      let bordrow = [];
      for(var col=0; col < 3; col++){
        let val = (row * 3) + col
        bordrow.push(<span key={val}  >{this.renderSquare(val,winner.includes(val))}</span>);
      }
      squares.push(<div className="board-row" key={row}>{bordrow}</div>);
    }
    return (
      <div>
        {squares}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {

    super(props);
    this.state  = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }

  }

  restartGame(){
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });

  }

  handleClick(i) {
    const squares = this.state.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });


  }

  render() {
    const winner  = calculateWinner(this.state.squares);


    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    }  else if(isDraw(this.state.squares)) {
      status = 'Game is Draw, please restart';
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <h1> Welcome to Tic Tac Toe</h1>
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}

          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.restartGame()}> Restart</button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



function isDraw(squares) {
  console.log(squares)
  for(let i=0; i<squares.length; i++) {
      if(squares[i] === null) {
        return false;
      }
  }

  return true;
}

function calculateWinner(squares) {

  var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  console.log(squares);

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}



function getWinningSquare(squares) {
  var lines = [
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
      return [a,b,c];
    }
  }
  return [];
}