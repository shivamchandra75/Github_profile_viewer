import { createContext, useContext, useReducer, useEffect } from "react";
import { TOKEN } from "../config";

const initialState = {
  status: "ready",
  searchQuery: "",
  delayedSearchQuery: "",
  searchResults: [],
  searchMode: "User",
};

export function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        status: "loading",
      };
    case "finishedLoading":
      return {
        ...state,
        status: "ready",
      };
    case "searchQueryChanged":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "delayedQueryUpdate":
      return {
        ...state,
        delayedSearchQuery: state.searchQuery,
      };
    case "SearchModeChanged":
      return {
        ...state,
        searchMode: action.payload,
      };
    case "searchResultsFetched":
      return {
        ...state,
        searchResults: action.payload,
        status: "ready",
      };
    default:
      break;
  }
}

const StateContext = createContext();

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchQuery, delayedSearchQuery, searchResults, searchMode, status } =
    state;

  //we can say if enter is pressed then immedieately setDelayedSearchQuery(serachQuery)
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "delayedQueryUpdate" });
    }, 500);

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
        dispatch({ type: "isLoading" });
        const mode = searchMode === "User" ? "users" : "repositories";
        const res = await fetch(
          `https://api.github.com/search/${mode}?q=${delayedSearchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },

            signal: controller.signal,
          }
        );
        const data = await res.json();
        dispatch({ type: "searchResultsFetched", payload: data.items });
      } catch (err) {
        console.error(err.message);
      }
    }
    getSearchResults();

    return function () {
      controller.abort();
    };
  }, [delayedSearchQuery, searchMode]);

  return (
    <StateContext.Provider
      value={{
        status,
        searchQuery,
        delayedSearchQuery,
        searchResults,
        searchMode,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

function useMyData() {
  const context = useContext(StateContext);
  return context;
}

export { StateProvider, useMyData };
