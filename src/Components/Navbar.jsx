import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../icons/Logo";
import SearchIcon from "../icons/SearchIcon";
import TerminalIcon from "../icons/TerminalIcon";

const activeBtnStyle = {
  backgroundColor: "#131D2E",
  color: "#3081F7",
  borderColor: "#3081f7",
};
export default function Navbar({ setSearchQuery, searchMode, setSearchMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogoClick() {
    console.log("logoclick");
    navigate("/");
  }

  function handleSubmit(e) {
    e.preventDefault();
    searchMode === "User"
      ? navigate("/users/results")
      : navigate("/repositories/results");
  }

  return (
    <nav className="navbar">
      <Logo onClick={handleLogoClick} />
      <form className="search-bar" onSubmit={(e) => handleSubmit(e)}>
        <SearchIcon />
        <input
          className="search-bar__input"
          type="text"
          placeholder={`Search Github ${searchMode}`}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TerminalIcon />
      </form>
      <button
        style={searchMode === "Repo" ? activeBtnStyle : {}}
        className="navbar__btn"
        onClick={() => {
          if (location.pathname === "/") setSearchMode("Repo");
        }}
      >
        Search Repo
      </button>
      <button
        style={searchMode === "User" ? activeBtnStyle : {}}
        className="navbar__btn"
        onClick={() => {
          if (location.pathname === "/") setSearchMode("User");
        }}
      >
        Search User
      </button>
    </nav>
  );
}
