import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/css/forms.css";
import "../styles/css/login.css";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  console.log('here test');


  const emailRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });

      const userAccessToken = response?.data?.result?.access_token || null;
      const userEmail = response?.data?.result?.email || null;
      const userId = response?.data?.result?.id || null;


      setAuth({ userEmail, userAccessToken, userId });
      setEmail('');
      setPassword('');

      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage('Login Failed');
    }
  };

  return (
    <div className="container">
      <section className="form">
        <h1>Login</h1>
        {errorMessage && (
          <p className='my-3' style={{ color: "red" }}>{errorMessage}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button>Login</button>
        </form>
        <p className="mt-3">Not registered? Register <Link to="/register">here</Link></p>




      </section>
    </div>
  );

};

export default Login;
