import { useState, useEffect } from "react";
import { TOKEN } from "../../config";

export default function ProfileCard() {
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          "https://api.github.com/users/shivamchandra75",
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          },
        );
        if (!res.ok) throw new Error("some problem fetching bro 󰱶 ");
        const data = await res.json();

        setProfileData(data);
      } catch (err) {
        console.error("🔥", err.message);
      }
    }
    fetchProfile();
  }, []);
  return (
    <div className="home__profile-card">
      <div className="profile-img">
        <img src={profileData.avatar_url} alt="user shivam" />
      </div>
      <p>{profileData.name}</p>

      <span>
        {profileData.followers} followers • {profileData.following} following
      </span>
    </div>
  );
}
