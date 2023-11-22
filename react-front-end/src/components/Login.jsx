import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/css/login.css"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      success: false
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await axios.post("/api/login", { email, password });
      console.log(response);
      this.setState({ success: true });
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
        {this.state.success ? (
          <section>
            <div>You are logged In</div>
            <p>Go <Link to="/">home</Link></p>
          </section>
        ) : (
          <section className="login-form">
            <h2>Login</h2>
            <form onSubmit={this.handleLogin}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <button>Login</button>
            </form>
            <p>Not registered? Register <Link to="/register">here</Link></p>



            {this.state.errorMessage && (
              <p style={{ color: "red" }}>{this.state.errorMessage}</p>
            )}
          </section>
        )}
      </div>
    );
  }
}

export default Login;
