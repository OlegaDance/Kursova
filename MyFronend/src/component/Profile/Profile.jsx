import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const loc = `${data.city}, ${data.region}, ${data.country_name}`;
        setLocation(loc);
      })
      .catch((err) => {
        console.error("Не вдалося отримати локацію:", err);
        setLocation("Невідомо");
      });
  }, []);

  if (!isAuthenticated || !user) return null;

  return (
    <article className={styles.profileCard}>
      {user.picture && (
        <img src={user.picture} alt={user.name} className={styles.avatar} />
      )}
      <h2>{user.name}</h2>
      <p className={styles.email}>{user.email}</p>

      <div className={styles.details}>
        <p>
          <strong>Username:</strong> {user.nickname}
        </p>
        <p>
          <strong>Location:</strong> {location || "Завантаження..."}
        </p>
      </div>
    </article>
  );
}

export default Profile;
