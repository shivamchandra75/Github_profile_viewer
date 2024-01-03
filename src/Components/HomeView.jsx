import React from "react";
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
    </div>
  );
}
function FeatureCard() {
  return <div className="home__featured-card"></div>;
}
