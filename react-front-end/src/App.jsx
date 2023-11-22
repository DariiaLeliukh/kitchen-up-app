import { Component } from "react";
import axios from "axios";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import TopNavigation from "./components/TopNavigation";
import HomeRoute from "./routes/HomeRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchResults from "./routes/Search";
import RecipeLists from "./components/RecipeLists";
import RecipeListItem from "./components/RecipeListItem"

class App extends Component {

  render() {
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
        </Routes>
      </div>
    );
  }
}

export default App;
