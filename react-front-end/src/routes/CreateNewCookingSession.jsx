import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Select from "react-select";
import axios from "axios";
import Loading from "../components/Loading";
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import '../styles/css/date-time-picker.css';

const CreateNewCookingSession = () => {
  const { auth } = useAuth();
  const { userId } = auth;
  const [guests, setGuests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [focused, setFocused] = useState(false);
  const [failedEmails, setFailedEmails] = useState([]);
  const [successEmails, setSuccessEmails] = useState([]);
  const [success, setSuccess] = useState(false);
  const [newCookingSessionId, setNewCookingSessionId] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  // date-time for cooking session
  const [dateTime, changeDateTime] = useState(new Date());

  let { state } = useLocation();
  const { recipeId, recipeTitle } = state;

  // Fetch the user's friend list using the
  useEffect(() => {
    axios
      .get(`/api/users/${userId}/friends`)
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) =>
        console.error("Error fetching the friends list:", error)
      );
  }, []);

  const handleChange = (selectedUsers) => {
    setErrorMessage("");
    setGuests(selectedUsers);
  };

  const createNewSession = async (e) => {
    e.preventDefault();

    if (guests.length === 0) {
      setErrorMessage("The guest list is empty");
    } else {
      try {
        await axios
          .post("/api/cooking-sessions/", {
            emails: guests.map((user) => user.email),
            host_id: userId,
            api_recipe_id: recipeId,
            api_recipe_name: recipeTitle,
            time_date: dateTime
          })
          .then((response) => {
            setNewCookingSessionId(response.data.newCookingSessionId);

            let failedUserEmails = [];
            let sucessUserEmails = [];
            response.data.dataMessage.forEach((el) => {
              if (el.status === "fail") failedUserEmails.push(el.name);
              else sucessUserEmails.push(el.name);
            });

            setSuccess(true);
            setFailedEmails(failedUserEmails);
            setSuccessEmails(sucessUserEmails);
          });
      } catch (error) {
        console.log(error);
      }
    }


  };

  return (
    <div className="container ">
      < div className="new-cooking-session" >
        {
          success ? (
            <>
              <h1>The invitations have been sent.</h1>
              {
                successEmails.length > 0 && (
                  <div className="successEmails">
                    <p>Emails were sent successfully to:</p>
                    <p>{successEmails.join(", ")}</p>
                  </div>
                )
              }

              {
                failedEmails.length > 0 ? (
                  <div className="failedEmails">
                    <p>
                      These users do not have valid e-mails. Invite could not be
                      sent to:
                    </p>
                    <p>{failedEmails.join(", ")}</p>
                  </div>
                ) : (
                  <></>
                )
              }

              {successEmails.length > 0 && (
                // need to correct URL to the one with parameters (?)
                <Link
                  to={`/cooking-sessions/${newCookingSessionId}`}
                  className="button mt-2"
                >
                  Cooking Session Info
                </Link>
              )}
            </>
          ) : (
            <div className="row">
              <div className="col-12">
                <h1>Create a cooking session with your friends!</h1>
                <p>
                  Recipe: <Link to={`/recipes/${recipeId}`}>{recipeTitle}</Link>
                </p>
                {
                  friends.length <= 0 ? (
                    <Loading />
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-6">
                          <p className="mb-3">Who is coming:</p>
                          <Select
                            className="mb-3"
                            autoFocus={true}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            closeMenuOnSelect={false}
                            value={guests}
                            onChange={handleChange}
                            options={friends}
                            isMulti
                            isClearable
                            placeholder="Search for guests by name..."
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.email}
                          />
                        </div>
                        <div className="col-6">
                          <p>When:</p>
                          <DateTimePicker
                            onChange={changeDateTime}
                            value={dateTime}
                            disableClock={true}
                          />
                        </div>
                      </div>
                      {errorMessage && (
                        <p className="text-danger">{errorMessage}</p>
                      )}
                      <button onClick={createNewSession}>Create Cooking Session</button>
                    </>

                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CreateNewCookingSession;
