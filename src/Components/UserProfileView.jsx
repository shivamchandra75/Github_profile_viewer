import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { formatCompactNumber } from "./StateProvider";
import Spinner from "./Spinner";

export default function UserProfileView() {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("username");
  const serializedObject = searchParams.get("data");
  const data = JSON.parse(decodeURIComponent(serializedObject));
  const [repos, setRepos] = useState([]);

  function copyToClipboard() {
    navigator.clipboard.writeText(data.html_url);
  }

  useEffect(() => {
    async function getUserRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${userName}/repos`
        );
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    getUserRepos();
  }, [userName]);

  return (
    <div className="user-profile-section main">
      <div className="user-info">
        <div className="img">
          <img src={data.avatar_url} alt="" />
        </div>
        <h3 className="name">{data?.name}</h3>
        <p className="user-name">{data.login}</p>
        <a href={data.html_url} target="_blank" rel="noreferrer">
          <button>Visit On Github</button>
        </a>
        <button onClick={copyToClipboard}>Copy Profile Link</button>
        <p>{data.bio}</p>
        <div>
          {formatCompactNumber(data.followers)} followers •
          {formatCompactNumber(data.following)} following
        </div>
      </div>
      <div className="repo-list">
        <h3>Repositories</h3>
        <span className="repos">
          {repos.length > 0 ? (
            repos.map((repo) => {
              return <Repo key={repo.id} repo={repo} />;
            })
          ) : (
            <Spinner />
          )}
        </span>
      </div>
    </div>
  );
}

function Repo({ repo }) {
  return (
    <Link to={repo.html_url} className="repo-list__repo">
      <span>{repo.name}</span>

      <div className="repo-visibility">{repo.visibility}</div>
    </Link>
  );
}
