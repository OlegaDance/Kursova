import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [location, setLocation] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedPhoneNumber, setSavedPhoneNumber] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const loc = `${data.city}, ${data.region}, ${data.country_name}`;
        setLocation(loc);
      })
      .catch(() => setLocation("Невідомо"));

    const storedPhone = localStorage.getItem("phoneNumber");
    if (storedPhone) {
      setSavedPhoneNumber(storedPhone);
      setPhoneNumber(storedPhone);
    }
  }, []);

  if (!isAuthenticated || !user) return null;

  const handleSavePhoneNumber = () => {
    if (phoneNumber.trim() === "") {
      setMessage("Номер телефону не може бути порожнім");
      return;
    }
    localStorage.setItem("phoneNumber", phoneNumber.trim());
    setSavedPhoneNumber(phoneNumber.trim());
    setMessage("Номер телефону збережено");
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        {user.picture && <img src={user.picture} alt={user.name} />}
        <div>
          <h2>{user.name}</h2>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      <div className={styles.info}>
        <div>
          <strong>Username:</strong> {user.nickname}
        </div>
        <div>
          <strong>Location:</strong> {location || "Завантаження..."}
        </div>
      </div>

      <div className={styles.phone}>
        <label htmlFor="phoneInput">Номер телефону:</label>
        <div className={styles.phoneInputWrapper}>
          <input
            id="phoneInput"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Введіть номер"
          />
          <button onClick={handleSavePhoneNumber}>Зберегти</button>
        </div>
        {message && (
          <p
            className={
              message.includes("збережено") ? styles.success : styles.error
            }
          >
            {message}
          </p>
        )}
      </div>
    </article>
  );
}

export default Profile;
