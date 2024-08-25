import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Popular() {
  let [filter, setFilter] = useState('');
  let [data, setData] = useState('');
  let langArr = ['All', 'Javascript', 'Python', 'Ruby', 'Java', 'CSS'];

  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${filter}&sort=stars&order=desc&type=Repositories`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [filter]);
  const handleClick = (value) => {
    if (value !== filter) {
      setFilter(value);
    }
  };
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

      <div className="filter">
        <Languages
          langArr={langArr}
          handleClick={handleClick}
          filter={filter}
        />
      </div>
      {this.state.data ? (
        <Repo items={data.items} />
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
}

function Languages({ langArr, handleClick, filter }) {
  let languages = langArr.map((language) => (
    <span
      key={language}
      onClick={() => handleClick(language)}
      className={filter !== language ? 'black' : 'crimson'}
    >
      {language}
    </span>
  ));
  return languages;
}
function Repo({ items }) {
  return (
    <>
      <ul className="flex wrap">
        {items.map((item, i) => {
          return (
            <>
              <li className="box" key={i}>
                <p># {i + 1}</p>
                <img src={item.owner.avatar_url} alt="error to load" />
                <h3>
                  <a href={item.owner.url}>{item.owner.login}</a>
                </h3>
                <ul>
                  <li>
                    {' '}
                    <a href={item.owner.repos_url}>
                      <i class="fa-solid fa-user"></i>
                      {item.owner.login}
                    </a>
                  </li>
                  <li className="stars">
                    <i class="fa-solid fa-star"></i>
                    {item.stargazers_count} stars
                  </li>
                  <li className="forks">
                    <i class="fa-solid fa-code-branch"></i>
                    {item.forks_count} forks{' '}
                  </li>
                  <li className="triangle">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    {item.open_issues_count} open issues
                  </li>
                </ul>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}
export default Popular;
