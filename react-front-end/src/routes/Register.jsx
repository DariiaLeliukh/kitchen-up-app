import { useRef, useState, useEffect } from 'react';
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/css/forms.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [validUsername, setvalidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setvalidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage('');
  }, [username, password, matchPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMessage("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post("api/register", {
        username,
        first_name,
        last_name,
        email,
        password
      });

      const userAccessToken = response?.data?.result?.access_token || null;
      const userEmail = response?.data?.result?.email || null;
      const userId = response?.data?.result?.id || null;

      setAuth({ userEmail, userAccessToken, userId });
      setEmail('');
      setPassword('');

      navigate(from, { replace: true });

    } catch (err) {
      if (!err?.response) {
        setErrorMessage('No Server Response');
      } else if (err.response?.status === 409) {
        setErrorMessage('Username Taken');
      } else {
        setErrorMessage('Registration Failed');
      }
      errRef.current.focus();
    }
  };



  return (
    <div className='container'>

      <section className='form'>
        <h1>Register</h1>
        {errorMessage && (
          <p className={errorMessage ? "errmsg my-3" : "offscreen"} style={{ color: "red" }}>{errorMessage}</p>
        )}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className='form-label' htmlFor="username">
              Username:
              <i className={validUsername ? "valid fa-solid fa-check" : "hide"}> </i>
              <i className={validUsername || !username ? "hide" : "invalid fa-solid fa-xmark"} > </i>
            </label>
            <input
              className='form-control'
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              ref={userRef}
              autoComplete="off"
              required
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p id="uidnote" className={userFocus && username && !validUsername ? "instructions" : "offscreen"}>
              <i className="fa-solid fa-circle-info" />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          <div className='mb-3'>
            <input
              className='form-control'
              type="text"
              name="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className='form-control'
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className='form-control'
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className='form-label' htmlFor="password">
              Password:
              <i className={validPassword ? "fa-solid fa-check valid" : "hide"} />
              <i className={validPassword || !password ? "hide" : "invalid fa-solid fa-times"} />
            </label>
            <input
              className='form-control'
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
              <i className="fa-solid fa-info-cirle" />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="mb-3">
            <label className='form-label' htmlFor="confirmPassword">
              Confirm Password:
              <i className={validMatch && matchPassword ? "valid fa-solid fa-check" : "hide"} />
              <i className={validMatch || !matchPassword ? "hide" : "invalid fa-solid fa-times"} />
            </label>
            <input
              className='form-control'
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={matchPassword}
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              id="confirmPassword"
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <i className="fa-solid fa-info-circle pr-1" />
              Must match the first password input field.
            </p>
          </div>
          <button>Register</button>
        </form>
        <p className='mt-3'>Registered? Login <Link to="/login">here</Link></p>

      </section>

    </div>
  );

};

export default Register;
