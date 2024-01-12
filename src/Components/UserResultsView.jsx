import React, { useEffect, useState } from "react";
import { TOKEN } from "../config";

export default function UserResultsView({ data }) {
  const [userData, SetUserData] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        //When you use map with async functions, it returns an array of promises, and the state is being set to an array of promises rather than the resolved data.
        const promises = data.map(async (user) => {
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
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchUserData();
  }, [data]);

  return (
    <div className="user-container">
      {userData.length > 0 ? (
        userData.map((user) => {
          console.log(user);
          return (
            <div className="result-card" key={user.id}>
              <div className="result-card__img">
                <img src={user.avatar_url} alt="user shivam" />
              </div>
              <p>{user.login}</p>

              <span>
                {user.followers} followers • {user.following} following
              </span>
            </div>
          );
        })
      ) : (
        <button style={{ margin: "1rem" }}>Loading...</button>
      )}
    </div>
  );
}
