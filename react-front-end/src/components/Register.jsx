import React, { Component } from "react";
import axios from "axios";



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegister = async () => {
    const { username, first_name, last_name, email, password, confirmPassword } =
      this.state;

    // Validate input (add more validation as needed)
    if (password !== confirmPassword) {
      this.setState({
        errorMessage: "Passwords do not match."
      });
      return;
    }

    try {
      // Send registration request to the server
      const response = await axios.post("api/register", {
        username,
        first_name,
        last_name,
        email,
        password
      });

      // Handle successful registration (e.g., redirect to login page)
      console.log("Registration successful:", response.data);
      // Redirect to the login page or update the UI accordingly
      this.props.history.push("/login");
    
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error.response.data);
      this.setState({
        errorMessage: "Registration failed. Please try again."
      });
    }
  };

  render() {
    
    return (
      <div>
        <h2>Register</h2>
      

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={this.state.first_name}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={this.state.last_name}
          onChange={this.handleInputChange}
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={this.state.confirmPassword}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleRegister}>Register</button>
        {this.state.errorMessage && (
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        )}
      </div>
    );
  }
}

export default Register;
