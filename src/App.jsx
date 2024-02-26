import { Route, Routes } from "react-router-dom";

import HomeView from "./Components/HomeView";
import Navbar from "./Components/Navbar";
import RepoResultsView from "./Components/RepoResultsView";
import UserResultsView from "./Components/UserResultsView";
import UserProfileView from "./Components/UserProfileView";
import "./index.scss";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/repositories/results" element={<RepoResultsView />} />
        <Route path="/users/results" element={<UserResultsView />} />
        <Route path="/userProfile" element={<UserProfileView />} />
      </Routes>
    </>
  );
}

export default App;
