import { useNavigate } from "react-router-dom";
import StarIcon from "../icons/StarIcon";

export default function RepoResultsView({ data }) {
  console.log(data);
  return (
    <section className="results">
      <div className="repo-owner"></div>
      <div className="list-container">
        <button className="filter">filter</button>
        <ul className="results__list">
          {data.map((item) => {
            return <ResultCard key={item.id} item={item} />;
          })}
        </ul>
      </div>
      <div className="tip"></div>
    </section>
  );
}

function ResultCard({ item }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/repo");
  }

  return (
    <li className="result-card" onClick={handleClick}>
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
  );
}

function TopicsButton({ text }) {
  return <button className="topic-btn">{text}</button>;
}
