import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = async () => {
    const { email, password } = this.state;

    try {
      const response = await axios.post("/api/login", { email, password });
  
    } catch (error) {
      // Handle login error
      this.setState({
        errorMessage: "Invalid credentials. Please try again."
      });
    }
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleLogin}>Login</button>
        {this.state.errorMessage && (
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        )}
      </div>
    );
  }
}

export default Login;
