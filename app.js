var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);

    _this.state = {
      searchValue: ""
    };
    return _this;
  }

  _createClass(Navbar, [{
    key: "handleChange",
    value: function handleChange(e) {
      this.setState({ searchValue: e.target.value });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "nav",
        { className: "navbar navbar-dark bg-dark mb-5 d-flex flex-column flex-sm-row" },
        React.createElement(
          "a",
          { className: "navbar-brand" },
          "GitHub Search"
        ),
        React.createElement(
          "div",
          { className: "form-inline" },
          React.createElement("input", { onChange: this.handleChange, className: "form-control mr-0 mr-sm-2", type: "search", placeholder: "Search for user", "aria-label": "Search for user" }),
          React.createElement(
            "button",
            { onClick: function onClick() {
                return _this2.props.fetchUserData(_this2.state.searchValue);
              }, className: "btn btn-outline-success my-2 my-sm-0 mx-auto mx-sm-0", type: "submit" },
            "Search"
          )
        )
      );
    }
  }]);

  return Navbar;
}(React.Component);

var UserData = function (_React$Component2) {
  _inherits(UserData, _React$Component2);

  function UserData(props) {
    _classCallCheck(this, UserData);

    return _possibleConstructorReturn(this, (UserData.__proto__ || Object.getPrototypeOf(UserData)).call(this, props));
  }

  _createClass(UserData, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "card col-12 col-sm-3 mr-5 mt-5" },
          React.createElement("img", { src: this.props.userData.avatar_url, className: "card-img-top mt-3", alt: "..." }),
          React.createElement(
            "h5",
            { className: "card-title my-4 ml-3" },
            this.props.userData.login
          ),
          React.createElement(
            "ul",
            { className: "list-group list-group-flush" },
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Bio: ",
              this.props.userData.bio
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Email: ",
              React.createElement(
                "a",
                { href: "mailto:" + this.props.userData.email },
                this.props.userData.email
              )
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Id: ",
              this.props.userData.id
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Public repos: ",
              this.props.userData.public_repos
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Followers: ",
              this.props.userData.followers
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Following: ",
              this.props.userData.following
            )
          ),
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "a",
              { href: this.props.userData.html_url, className: "card-link", target: "blank" },
              "Link to user's profile"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "card col-12 col-sm-8 mt-5" },
          React.createElement(
            "table",
            { className: "table" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  { scope: "col" },
                  "Name"
                ),
                React.createElement(
                  "th",
                  { scope: "col" },
                  "Description"
                ),
                React.createElement(
                  "th",
                  { scope: "col" },
                  "URL"
                )
              )
            ),
            React.createElement(
              "tbody",
              null,
              this.props.reposData.map(function (repo) {
                return React.createElement(
                  "tr",
                  { key: repo.id },
                  React.createElement(
                    "td",
                    null,
                    repo.name
                  ),
                  React.createElement(
                    "td",
                    null,
                    repo.description
                  ),
                  React.createElement(
                    "td",
                    null,
                    React.createElement(
                      "a",
                      { href: repo.url, target: "blank" },
                      "Open"
                    )
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return UserData;
}(React.Component);

// Above this are reusable components
// Below this is main component

var e = React.createElement;

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this4.fetchUserData = _this4.fetchUserData.bind(_this4);

    _this4.state = {
      userData: {},
      reposData: {},
      hasData: false
    };
    return _this4;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      checkIfPersistDataExists();
    }
  }, {
    key: "checkIfPersistDataExists",
    value: function checkIfPersistDataExists() {
      var userData = JSON.parse(localStorage.getItem("userData"));
      var reposData = JSON.parse(localStorage.getItem("reposData"));
      if (userData && reposData && (typeof userData === "undefined" ? "undefined" : _typeof(userData)) == "object" && (typeof reposData === "undefined" ? "undefined" : _typeof(reposData)) == "object") {
        this.setState({ userData: userData, reposData: reposData, hasData: true });
      } else {
        localStorage.clear();
      }
    }
  }, {
    key: "fetchUserData",
    value: function fetchUserData(searchValue) {
      var _this5 = this;

      if (searchValue == "") {
        alert("Required field is empty");
        return;
      }

      fetch("https://api.github.com/users/" + searchValue).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.message == "Not Found") {
          alert("User not found");
          return;
        }

        _this5.setState({ userData: data });
        localStorage.setItem("userData", JSON.stringify(data));

        _this5.fetchRepos(data.repos_url);
      });
    }
  }, {
    key: "fetchRepos",
    value: function fetchRepos(reposUrl) {
      var _this6 = this;

      fetch(reposUrl).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this6.setState({ reposData: data, hasData: true });
        localStorage.setItem("reposData", JSON.stringify(data));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return !this.state.hasData ? React.createElement(
        "div",
        null,
        React.createElement(Navbar, { fetchUserData: this.fetchUserData }),
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "h1",
            { className: "text-center" },
            "GitHub Search App"
          )
        )
      ) : React.createElement(
        "div",
        null,
        React.createElement(Navbar, { fetchUserData: this.fetchUserData }),
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(UserData, { userData: this.state.userData, reposData: this.state.reposData })
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(e(App), document.querySelector('#app'));