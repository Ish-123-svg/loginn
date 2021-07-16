import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastName: "",
      firstName: "",
      password: "",
      retypePassword: "",
      email: "",
      phoneNumber: "",
      organization: "",
      redirected: false,
    };
  }

  handleGetFields = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmitRegistrationInfo = (e) => {
    e.preventDefault();
    const {
      lastName,
      firstName,
      email,
      password,
      retypePassword,
      phoneNumber,
      organization,
    } = this.state;
    const loginObj = {
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
      retypePassword: retypePassword,
      phoneNumber: phoneNumber,
      organization: organization,
    };
    axios
      .post("http://localhost:3000/auth/register", loginObj)
      .then((response) => {
        this.props.redirect();
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    return (
      <div>
        Register with FRS
        <form>
          <div>
            <label>First Name: </label>
            <input
              type="text"
              name="firstName"
              onChange={this.handleGetFields}
            />
          </div>
          <div>
            <label>Last Name: </label>
            <input
              type="text"
              name="lastName"
              onChange={this.handleGetFields}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="text"
              name="password"
              onChange={this.handleGetFields}
            />
          </div>
          <div>
            <label>Retype Password: </label>
            <input
              type="text"
              name="retypePassword"
              onChange={this.handleGetFields}
            />
          </div>
          <div>
            <label>Email: </label>
            <input type="text" name="email" onChange={this.handleGetFields} />
          </div>
          <div>
            <label>Phone Number: </label>
            <input
              type="text"
              name="phoneNumber"
              onChange={this.handleGetFields}
            />
          </div>
          <div>
            <label>Organization: </label>
            <input
              type="text"
              name="organization"
              onChange={this.handleGetFields}
            />
          </div>
          <button onClick={this.handleSubmitRegistrationInfo}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
