import React from 'react';

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'All',
      data: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.fetchData();
    }
  }
  fetchData = () => {
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${this.state.filter}&sort=stars&order=desc&type=Repositories`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  };
  handleClick = (value) => {
    if (value !== this.state.filter) {
      this.setState({
        filter: value,
        data: '',
      });
    }
  };
  render() {
    let langArr = ['All', 'Javascript', 'Python', 'Ruby', 'Java', 'CSS'];
    return (
      <>
        <div className="filter">
          <Languages
            langArr={langArr}
            handleClick={this.handleClick}
            filter={this.state.filter}
          />
        </div>
        {this.state.data ? (
          <Repo items={this.state.data.items} />
        ) : (
          <div className="loader"></div>
        )}
      </>
    );
  }
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
