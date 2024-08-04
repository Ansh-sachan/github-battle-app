import React from 'react';

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      player1: '',
      player2: '',
      player1_data: [],
      player2_data: [],
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let value = e.target[0].value;
    let name = e.target[0].name;
    if (name === 'player1') {
      this.setState({
        player1: value,
      });
      this.fetchData(value, name);
    } else if (name === 'player2') {
      this.setState({
        player2: value,
      });
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
  render() {
    let players = ['player1', 'player2'];
    return (
      <>
        <h1>Instructions</h1>
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
            {players.map((p) => (
              <form action="" onSubmit={this.handleSubmit}>
                <label htmlFor={p}>
                  <input
                    type="text"
                    placeholder="github username"
                    id={p}
                    name={p}
                  />
                </label>
                <input type="submit" className="submit-btn" />
              </form>
            ))}
            {/* <form action="" onSubmit={this.handleSubmit}>
              <label htmlFor="player-1">
                <input
                  type="text"
                  placeholder="github username"
                  id="player-1"
                  name="player1"
                />
              </label>
              <input type="submit" className="submit-btn" />
            </form>
            <form action="" onSubmit={this.handleSubmit}>
              <label htmlFor="player-2">
                <input
                  type="text"
                  placeholder="github username"
                  id="player-2"
                  name="player2"
                />
              </label>
              <input type="submit" className="submit-btn" />
            </form> */}
          </div>
        </div>
      </>
    );
  }
}
export default Battle;
