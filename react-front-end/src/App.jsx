import { Route, Routes } from 'react-router-dom';
import TopNavigation from "./components/TopNavigation";
import HomeRoute from "./routes/HomeRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchResults from "./routes/Search";
import RecipeLists from "./components/RecipeLists";
import RecipeListItem from "./components/RecipeListItem";
import GroceryList from "./components/GroceryList";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./routes/Dashboard";
import CookingSessionList from "./routes/CookingSessionList";

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

        {/* protected routes for logged in users */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cooking-sessions" element={<CookingSessionList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
