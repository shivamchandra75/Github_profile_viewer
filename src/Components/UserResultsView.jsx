import { useEffect, useState } from "react";
import { TOKEN } from "../config";
import { useMyData } from "./StateProvider";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default function UserResultsView() {
  const { searchResults, dispatch, status } = useMyData();
  const [userData, SetUserData] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        dispatch({ type: "isLoading" });
        //When you use map with async functions, it returns an array of promises, and the state is being set to an array of promises rather than the resolved data.
        const promises = searchResults.map(async (user) => {
          const res = await fetch(user.url, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          // catch errors
          if (!res.ok) throw new Error("some problem fetching bro 󰱶 ");

          const data = await res.json();

          return data;
        });

        const resolvedData = await Promise.all(promises);

        SetUserData(resolvedData);
        dispatch({ type: "finishedLoading" });
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchUserData();
  }, [searchResults]);

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div className="user-container main">
          {userData.length > 0
            ? userData.map((user) => {
                console.log(user);
                const serializedObject = encodeURIComponent(
                  JSON.stringify(user)
                );
                return (
                  <Link
                    to={`/userProfile?username=${user.login}&data=${serializedObject}`}
                    className="result-card"
                    key={user.id}
                  >
                    <div className="result-card__img">
                      <img src={user.avatar_url} alt="user shivam" />
                    </div>
                    <p>{user.login}</p>

                    <span>
                      {user.followers} followers • {user.following} following
                    </span>
                  </Link>
                );
              })
            : null}
        </div>
      )}
    </>
  );
}
