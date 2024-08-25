import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Battle() {
  let [player1, setPlayer1] = useState('');
  let [player2, setPlayer2] = useState('');
  let [player1Data, setPlayer1Data] = useState(null);
  let [player2Data, setPlayer2Data] = useState(null);
  let [winner, setWinner] = useState('');
  let players = ['player1', 'player2'];
  // fetch data whenever player1 and player2 is changing
  useEffect(() => {
    if (player1) {
      fetch(`https://api.github.com/users/${player1}`)
        .then((res) => res.json())
        .then((data) => setPlayer1Data(data));
    }
  }, [player1]);
  useEffect(() => {
    if (player2) {
      fetch(`https://api.github.com/users/${player2}`)
        .then((res) => res.json())
        .then((data) => setPlayer2Data(data));
    }
  }, [player2]);
  //   submit handle
  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, value } = e.target[0];
    console.log(name, value);
    if (name === 'player1') {
      setPlayer1(value);
    } else if (name === 'player2') {
      setPlayer2(value);
    }
  };
  //   handleBattle
  const handleBattle = () => {
    let player1Data_score = calculateScore(player1Data);
    let player2Data_score = calculateScore(player2Data);
    if (player1Data_score > player2Data_score) {
      setWinner(player1);
    } else if (player1Data_score < player2Data_score) {
      setWinner(player2);
    } else {
      setWinner('draw');
    }
  };
  const calculateScore = (data) => {
    return data.followers * 20 + data.public_repos;
  };
  //   ui of the battle page
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
          <i className="fa-solid fa-trophy"></i>
        </div>
      </div>
      <div className="players">
        <h2>Players</h2>
        <div className="flex wrap">
          <Form players={players} handleSubmit={handleSubmit} />
        </div>
      </div>
      {player1Data && player2Data && (
        <button onClick={handleBattle} className="battle-btn">
          {' '}
          Battle
        </button>
      )}
      {winner ? <h1 className="winner">{winner} is winner</h1> : ''}
    </>
  );
}
// dynamic form to get fetch user info
function Form({ players, handleSubmit }) {
  return (
    <>
      {players.map((player, i) => (
        <form action="" onSubmit={handleSubmit} key={i}>
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
