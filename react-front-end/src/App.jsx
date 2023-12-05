import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import TopNavigation from "./components/TopNavigation";
import HomeRoute from "./routes/HomeRoute";
import Login from "./routes/Login";
import Register from "./routes/Register";
import SearchResults from "./routes/Search";
import RecipeLists from "./routes/RecipeLists";
import RecipeListItem from "./routes/RecipeListItem";
import GroceryList from "./routes/GroceryList";
import Dashboard from "./routes/Dashboard";
import CookingSessionList from "./routes/CookingSessionList";
import CookingSessionInfo from "./routes/CookingSessionInfo";
import CookingSession from "./routes/CookingSession";
import useAuth from './hooks/useAuth';
import { useEffect } from 'react';
import axios from 'axios';
import Recipe from "./routes/Recipe";
import Favorites from './routes/Favorites';
import CreateNewCookingSession from "./routes/CreateNewCookingSession";

const App = () => {
  const { auth, setAuth } = useAuth(null);

  useEffect(() => {
    async function checkJWTcookie() {
      try {
        await axios.post("/api/verifyJWT")
          .then((response) => {
            const userAccessToken = response?.data?.result?.access_token || null;
            const userEmail = response?.data?.result?.email || null;
            const userId = response?.data?.result?.id || null;
            const profilePictureUrl = response?.data?.result?.profile_picture_url || `${response?.data?.result?.first_name[0]} ${response?.data?.result?.last_name[0]}`;
            
            setAuth({ userEmail, userAccessToken, userId, profilePictureUrl });
          });
      } catch (error) {
        // If verify didn't work then user is not logged in
        setAuth({});
      }
    }
    checkJWTcookie();
  }, []);

  return (
    <div className="App">
      {auth !== null &&
        <>
          <TopNavigation />
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />

            <Route path="/recipes/:id" element={<Recipe />} />

            {/* protected routes for logged in users */}
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cooking-sessions" element={<CookingSessionList />} />
              <Route
                path="/cooking-sessions/:id"
                element={<CookingSessionInfo />}
              />
              <Route
                path="/cooking-sessions/new"
                element={<CreateNewCookingSession />}
              />
              <Route
                path="/cooking-sessions/:id/join"
                element={<CookingSession />}
              />
              <Route path="/recipe-lists" element={<RecipeLists />} />
              <Route path="/recipe-list/:id" element={<RecipeListItem />} />
              <Route path="/recipe-list/:id/grocery-list" element={<GroceryList />} />
            </Route>
          </Routes>
        </>
      }
    </div>
  );
};

export default App;
