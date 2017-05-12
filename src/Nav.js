import React from "react";

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">Yummy Penguin</a>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >


            <ul className="nav navbar-nav navbar-right">


              <li><a onClick={this.props.auth.login.bind(this)}>Login</a></li>

            </ul>
          </div>
        </div>
      </nav>


    );

  }
}

export default Nav;
