import React, { useEffect, useState } from "react";
import StarIcon from "../../icons/StarIcon";
import ForkIcon from "../../icons/forkIcon";
import { TOKEN } from "../../config";

export default function PopularRepos() {
  const [fetchedRepos, setFetchedRepos] = useState([]);
  useEffect(() => {
    async function fetchPopularRepos() {
      try {
        const res = await fetch(
          "https://api.github.com/search/repositories?q=stars:>210000",
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          },
        );
        const data = await res.json();

        setFetchedRepos(data.items);
      } catch (err) {
        console.error("🔥", err.message);
      }
    }
    fetchPopularRepos();
  }, []);
  return (
    <div className="home__popular-repos">
      <p>Popular Repos</p>
      <ul className="repo-list-container">
        {fetchedRepos.map((repo) => {
          return <Repo key={repo.id} repo={repo} />;
        })}
      </ul>
    </div>
  );
}

function Repo({ repo }) {
  return (
    <li className="popular-repo">
      <div className="avatar-img">
        <img src={repo.owner.avatar_url} alt="" />
      </div>
      <p className="repo-name">{repo.name}</p>
      <span>
        <StarIcon /> {repo.stargazers_count}
      </span>
      <span>
        <ForkIcon /> {repo.forks_count}
      </span>
    </li>
  );
}
