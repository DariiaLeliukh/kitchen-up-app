import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const emailRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

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
      console.log('JSON.stringify(response?.data)');
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      setAuth({ email, password, accessToken });
      setEmail('');
      setPassword('');
      // setSuccess(true);
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage('Login Failed');
    }
  };

  return (
    <div>
      {success ? (
        <section>
          <div>You are logged In</div>
          <p>Go <Link to="/">home</Link></p>
        </section>
      ) : (
        <section>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              ref={emailRef}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button>Login</button>
          </form>
          <p>Not registered? Register <Link to="/register">here</Link></p>



          {errorMessage && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
        </section>
      )}
    </div>
  );

};

export default Login;
