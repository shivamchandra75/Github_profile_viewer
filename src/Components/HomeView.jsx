import PopularRepos from "./HomeViewComponents/PopularRepos";
import ProfileCard from "./HomeViewComponents/ProfileCard";

export default function HomeView() {
  return (
    <section className="home">
      <PopularRepos />
      <MainCard />
      <ProfileCard />
      <FeatureCard />
    </section>
  );
}

function MainCard() {
  return (
    <div className="home__main-card">
      <div className="content-container">
        <h3>Find Any Repo From Anywhere.</h3>
        <p>
          With this website you can find repositories of your friend on Github
          and view their details, Copy their profile link and share it.
        </p>
        <button>Type `/`</button>
      </div>
      <div className="img">
        <img src="./assets/homeView.png" alt="" />
      </div>
      <div className="glow"></div>
    </div>
  );
}
function FeatureCard() {
  return (
    <div className="home__featured-card">
      <div className="faded-border">
        <div className="border">
          <div className="copy-div">Copy Profile Link</div>
        </div>
      </div>
      <h3>Seamless Sharing</h3>
      <p>
        Copy Your GitHub Profile Link with a Single Click for Effortless Profile
        Sharing and Visibility
      </p>
    </div>
  );
}
