// function App() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [delayedSearchQuery, setDelayedSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchMode, setSearchMode] = useState("User");
//
//
//   //we can say if enter is pressed then immedieately setDelayedSearchQuery(serachQuery)
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDelayedSearchQuery(searchQuery);
//     }, 500);
//
//     //cleanup fn
//     return function () {
//       clearTimeout(timeout);
//     };
//   }, [searchQuery]);
//
//   useEffect(() => {
//     if (delayedSearchQuery === "") return;
//     const controller = new AbortController();
//
//     async function getSearchResults() {
//       try {
//         const mode = searchMode === "User" ? "users" : "repositories";
//         const res = await fetch(
//           `https://api.github.com/search/${mode}?q=${delayedSearchQuery}`,
//           {
//             headers: {
//               Authorization: `Bearer ${TOKEN}`,
//             },
//
//             signal: controller.signal,
//           },
//         );
//         const data = await res.json();
//         // console.log(
//         //   "Remaining requests:",
//         //   res.headers.get("X-RateLimit-Remaining"),
//         // );
//         setSearchResults(data.items);
//       } catch (err) {
//         console.error(err.message);
//       }
//     }
//     getSearchResults();
//
//     return function () {
//       controller.abort();
//     };
//   }, [delayedSearchQuery]);
//
//   return (
//     <>
//       <Navbar
//         setSearchQuery={setSearchQuery}
//         searchMode={searchMode}
//         setSearchMode={setSearchMode}
//       />
//       <Routes>
//         <Route path="/" element={<HomeView />} />
//
//         <Route
//           path="/repositories/results"
//           element={<RepoResultsView data={searchResults} />}
//         />
//
//         <Route
//           path="/users/results"
//           element={<UserResultsView data={searchResults} />}
//         />
//
//         <Route path="/repo" element={<RepoDetailView />} />
//         <Route path="/userProfile" element={<UserProfileView />} />
//       </Routes>
//     </>
//   );
// }
