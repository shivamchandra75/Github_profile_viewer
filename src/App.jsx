import { useState, useEffect } from "react";
import "./index.scss";
import { TOKEN } from "./config";
import HomeView from "./Components/HomeView";
import Navbar from "./Components/Navbar";
import RepoResultsView from "./Components/RepoResultsView";
import UserResultsView from "./Components/UserResultsView";
import UserProfileView from "./Components/UserProfileView";
import { Route, Routes } from "react-router-dom";
import RepoDetailView from "./Components/RepoDetailView";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [delayedSearchQuery, setDelayedSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMode, setSearchMode] = useState("User");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedSearchQuery(searchQuery);
      console.log("ran");
    }, 300);

    //cleanup fn
    return function () {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (delayedSearchQuery === "") return;
    const controller = new AbortController();

    async function getSearchResults() {
      try {
        const mode = searchMode === "User" ? "users" : "repositories";
        const res = await fetch(
          `https://api.github.com/search/${mode}?q=${delayedSearchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },

            signal: controller.signal,
          },
        );
        const data = await res.json();
        // console.log(
        //   "Remaining requests:",
        //   res.headers.get("X-RateLimit-Remaining"),
        // );
        setSearchResults(data.items);
      } catch (err) {
        console.error(err.message);
      }
    }
    getSearchResults();

    return function () {
      controller.abort();
    };
  }, [delayedSearchQuery]);

  return (
    <>
      <Navbar
        setSearchQuery={setSearchQuery}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
      />
      <Routes>
        <Route path="/" element={<HomeView />} />

        <Route
          path="/repositories/results"
          element={<RepoResultsView data={searchResults} />}
        />

        <Route
          path="/users/results"
          element={<UserResultsView data={searchResults} />}
        />

        <Route path="/repo" element={<RepoDetailView />} />
        <Route path="/userProfile" element={<UserProfileView />} />
      </Routes>
    </>
  );
}

export default App;

// sidha panday kothi siwas public school right tinu public school road ss public school matke wali gali kaam chal rha hoga 4-5
