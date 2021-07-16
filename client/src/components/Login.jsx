import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { usernameField: "", passwordField: "" };
    this.handleGetFields = this.handleGetFields.bind(this);
    this.handleSubmitLoginInfo = this.handleSubmitLoginInfo.bind(this);
  }

  handleGetFields(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmitLoginInfo(e) {
    e.preventDefault();
    const { usernameField, passwordField } = this.state;
    let loginObj = { email: usernameField, password: passwordField };
    axios
      .post("http://localhost:3000/auth/login", loginObj)
      .then((response) => {
        const token = response.data.token;
        console.log(response.data.userInfo);
        JSON.stringify(token);
        localStorage.setItem("token", token);
        this.props.setAuth(true);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div>
        Log In
        <form>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="usernameField"
              onChange={this.handleGetFields}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="passwordField"
              onChange={this.handleGetFields}
            />
          </div>
          <button onClick={this.handleSubmitLoginInfo}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
