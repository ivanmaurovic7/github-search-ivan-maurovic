class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      searchValue: ""
    }
  }

  handleChange(e) {
    this.setState({searchValue: e.target.value})
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark mb-5 d-flex flex-column flex-sm-row">
        <a className="navbar-brand">GitHub Search</a>
        <div className="form-inline">
          <input onChange={this.handleChange} className="form-control mr-0 mr-sm-2" type="search" placeholder="Search for user" aria-label="Search for user"/>
          <button onClick={() => this.props.fetchUserData(this.state.searchValue)} className="btn btn-outline-success my-2 my-sm-0 mx-auto mx-sm-0" type="submit">Search</button>
        </div>
      </nav>
    )
  }
}

class UserData extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row">
        <div className="card col-12 col-sm-3 mr-5 mt-5">
          <img src={this.props.userData.avatar_url} className="card-img-top mt-3" alt="..."/>
          <h5 className="card-title my-4 ml-3">{this.props.userData.login}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Bio: {this.props.userData.bio}</li>
            <li className="list-group-item">Email: <a href={`mailto:${this.props.userData.email}`}>{this.props.userData.email}</a></li>
            <li className="list-group-item">Id: {this.props.userData.id}</li>
            <li className="list-group-item">Public repos: {this.props.userData.public_repos}</li>
            <li className="list-group-item">Followers: {this.props.userData.followers}</li>
            <li className="list-group-item">Following: {this.props.userData.following}</li>
          </ul>
          <div className="card-body">
            <a href={this.props.userData.html_url} className="card-link" target="blank">Link to user's profile</a>
          </div>
        </div>
        <div className="card col-12 col-sm-8 mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            {this.props.reposData.map(repo => {
              return (
                <tr key={repo.id}>
                  <td>{repo.name}</td>
                  <td>{repo.description}</td>
                  <td><a href={repo.url} target="blank">Open</a></td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

// Above this are reusable components
// Below this is main component

const e = React.createElement

class App extends React.Component {
  constructor(props) {
    super(props)

    this.fetchUserData = this.fetchUserData.bind(this)

    this.state = {
      userData: {},
      reposData: {},
      hasData: false,
    }
  }

  componentDidMount() {
    checkIfPersistDataExists()
  }
  

  checkIfPersistDataExists() {
    let userData = JSON.parse(localStorage.getItem("userData"))
    let reposData = JSON.parse(localStorage.getItem("reposData"))
    if(userData && reposData && typeof(userData) == "object" && typeof(reposData) == "object") {
      this.setState({userData: userData, reposData: reposData, hasData: true})
    } else {
      localStorage.clear()
    }
  }

  fetchUserData(searchValue) {
    if(searchValue == "") {
      alert("Required field is empty")
      return
    }

    fetch(`https://api.github.com/users/${searchValue}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(data.message == "Not Found") {
        alert("User not found")
        return
      }

      this.setState({userData: data})
      localStorage.setItem("userData", JSON.stringify(data))

      this.fetchRepos(data.repos_url)
    })
  }

  fetchRepos(reposUrl) {
    fetch(reposUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({reposData: data, hasData: true})
      localStorage.setItem("reposData", JSON.stringify(data))
    })
  }

  render() {
    return (!this.state.hasData ?
      <div>
        <Navbar fetchUserData={this.fetchUserData}/>
        <div className="container">
          <h1 className="text-center">GitHub Search App</h1>
        </div>
      </div>
      :
      <div>
        <Navbar fetchUserData={this.fetchUserData}/>
        <div className="container">
          <UserData userData={this.state.userData} reposData={this.state.reposData}/>
        </div>
      </div>
    )

  }
}

ReactDOM.render(e(App), document.querySelector('#app'))