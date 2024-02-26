import { Link } from "react-router-dom";
import StarIcon from "../icons/StarIcon";
import { useMyData } from "./StateProvider";
import Spinner from "./Spinner";

export default function RepoResultsView() {
  const { searchResults, status } = useMyData();
  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <section className="results main">
          <div className="list-container">
            <button className="filter">filter</button>
            <ul className="results__list">
              {searchResults.map((item) => {
                return <ResultCard key={item.id} item={item} />;
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function ResultCard({ item }) {
  return (
    <Link to={item.html_url} target="_blank">
      <li className="result-card">
        <div className="data">
          <div className="img-heading-container">
            <div className="img">
              <img src={item.owner.avatar_url} alt="user DP" />
            </div>
            <h3 className="repo-name">{item.full_name}</h3>
          </div>

          <p className="repo-desc">{item.description}</p>

          <div className="topic-btn-container">
            {item.topics.slice(0, 5).map((topic) => {
              return <TopicsButton key={topic} text={topic} />;
            })}
          </div>

          <span>
            {item.language ? `${item.language} •` : ``} <StarIcon />{" "}
            {item.stargazers_count} • {item.updated_at}
          </span>
        </div>

        <div className="repo-visibility">{item.visibility}</div>
      </li>
    </Link>
  );
}

function TopicsButton({ text }) {
  return <button className="topic-btn">{text}</button>;
}
