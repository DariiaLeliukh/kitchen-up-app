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
import Recipe from "./routes/Recipe";
import CreateNewCookingSession from "./routes/CreateNewCookingSession";

const App = () => {
  return (
    <div className="App">
      <TopNavigation />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/recipe-lists" element={<RecipeLists />} />
        <Route path="/recipe-list/:id" element={<RecipeListItem />} />
        <Route path="/recipe-list/:id/grocery-list" element={<GroceryList />} />
        <Route path="/recipes/:id" element={<Recipe />} />

        {/* protected routes for logged in users */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
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
        </Route>
      </Routes>
    </div>
  );
};

export default App;
