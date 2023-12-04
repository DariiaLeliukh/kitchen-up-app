import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import axios from 'axios';

const CreateNewCookingSession = (props) => {
  const { auth } = useAuth();
  const { userId } = auth;

  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = useState(false);
  const [failedEmails, setFailedEmails] = useState([]);
  const [successEmails, setSuccessEmails] = useState([]);
  const [success, setSuccess] = useState(false);
  const [newCookingSessionId, setNewCookingSessionId] = useState();


  let { state } = useLocation();
  const { recipeId, recipeTitle } = state;

  const createNewSession = async (e) => {
    console.log('Clicked to submit new session');
    e.preventDefault();

    try {
      await axios.post("/api/cooking-sessions/", {
        emails,
        host_id: userId,
        api_recipe_id: recipeId,
        api_recipe_name: recipeTitle
      }).then((response) => {
        console.log(response.data);
        setNewCookingSessionId(response.data.newCookingSessionId);

        let failedUserEmails = [];
        let sucessUserEmails = [];
        response.data.dataMessage.forEach((el) => {
          if (el.status === "fail") failedUserEmails.push(el.email);
          sucessUserEmails.push(el.email);
        });

        setSuccess(true);
        setFailedEmails(failedUserEmails);
        setSuccessEmails(sucessUserEmails);
      });
    } catch (error) {
      console.log(error);

    }
  };


  return (
    <div className='container'>
      {success ? (

        <>
          <h1>The invitations has been sent.</h1>
          <p>Emails were sent successfully to:</p>
          <p>{successEmails.join(", ")}</p>

          <p>Failed Emails:</p>
          <p>{failedEmails.join(", ")}</p>
          {successEmails.length > 0 &&
            // need to correct URL to the one with parameters (?)
            <Link to={`/cooking-sessions/${newCookingSessionId}`} >Coocking Session Info</Link>}
        </>
      ) :
        (
          <form>
            <h1>Create a cooking session with your friend!</h1>
            Recipe: <Link to={`/recipes/${recipeId}`}>
              {recipeTitle}</Link>

            <ReactMultiEmail
              placeholder='Input your email'
              emails={emails}
              onChange={(_emails) => {
                setEmails(_emails);
              }}
              autoFocus={true}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              getLabel={(email, index, removeEmail) => {
                return (
                  <div data-tag key={index}>
                    <div data-tag-item>{email}</div>
                    <span data-tag-handle onClick={() => removeEmail(index)}>
                      ×
                    </span>
                  </div>
                );
              }}
            />
            <small
              id="emailHelp"
              className="form-text text-muted">
              We will never share your email with anyone else.
            </small>
            <button onClick={createNewSession}>Submit</button>
          </form>
        )
      }

    </div >

  );
};

export default CreateNewCookingSession;