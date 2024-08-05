import React from 'react';
import { Link } from 'react-router-dom';

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1_data: null,
      player2_data: null,
      winner: '',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let value = e.target[0].value;
    let name = e.target[0].name;
    if (name === 'player1') {
      this.fetchData(value, name);
    } else if (name === 'player2') {
      this.fetchData(value, name);
    }
  };
  fetchData = (value, name) => {
    fetch(`https://api.github.com/users/${value}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState((prevState) => {
          if (name === 'player1') {
            return { player1_data: data };
          } else if (name === 'player2') {
            return { player2_data: data };
          }
        })
      );
  };
  calculateScore = (data) => {
    return data.followers * 20 + data.public_repos;
  };
  handleBattle = () => {
    let { player1_data, player2_data } = this.state;
    let player1_score = this.calculateScore(player1_data);
    let player2_score = this.calculateScore(player2_data);
    if (player1_score > player2_score) {
      this.setState({ winner: player1_data.login });
    } else if (player1_score < player2_score) {
      this.setState({ winner: player2_data.login });
    } else {
      this.setState({ winner: 'draw' });
    }
  };
  render() {
    let players = ['player1', 'player2'];
    return (
      <>
        <div className="links flex">
          <div>
            <Link to="/" exact>
              Popular
            </Link>
          </div>
          <div>
            <Link to="/battle" exact>
              Battle
            </Link>
          </div>
        </div>
        <h1 className="instruction">Instructions</h1>
        <div className="flex wrap">
          <div className="instructions">
            <h2>Enter Two Github Users</h2>
            <i class="fa-solid fa-user-group"></i>
          </div>
          <div className="instructions">
            <h2>Battle</h2>
            <i class="fa-solid fa-jet-fighter"></i>
          </div>
          <div className="instructions">
            <h2>Winner</h2>
            <i class="fa-solid fa-trophy"></i>
          </div>
        </div>
        <div className="players">
          <h2>Players</h2>
          <div className="flex wrap">
            <Form players={players} handleSubmit={this.handleSubmit} />
          </div>
        </div>
        {this.state.player1_data && this.state.player2_data && (
          <button onClick={this.handleBattle} className="battle-btn">
            {' '}
            Battle
          </button>
        )}
        {this.state.winner ? (
          <h1 className="winner">{this.state.winner} is winner</h1>
        ) : (
          ''
        )}
      </>
    );
  }
}
function Form({ players, handleSubmit }) {
  return (
    <>
      {players.map((player, i) => (
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor={player}>
            <input
              type="text"
              placeholder="github username"
              id={player}
              name={player}
            />
          </label>
          <input type="submit" className="submit-btn" />
        </form>
      ))}
    </>
  );
}

export default Battle;
