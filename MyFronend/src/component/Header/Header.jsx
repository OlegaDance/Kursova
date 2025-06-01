import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LoginBtn from "../../component/loginBtn/LoginBtn.jsx";
import SyncUser from "../../component/Syncuser/SyncUser.jsx"; // скоригуй шлях, якщо треба

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("userId", user.sub);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userPicture", user.picture);
    }
  }, [isAuthenticated, user]);

  return (
    <main className={styles.header}>
      <nav className={styles.navigationTarget}>
        <Link to={"/"}>Головна</Link>
        <Link to={"./TestVin"}>Провірка VIN</Link>
        <Link to={"./profilePage"}>Профіль</Link>
      </nav>
      <Link to={"./AddCarPage"}>
        <button>Add Dick</button>
      </Link>

      {isAuthenticated ? (
        <>
          <button
            onClick={() => {
              console.log("Logging out...");
              logout({ returnTo: "http://localhost:5173/" });
            }}
          >
            Вийти
          </button>
          <SyncUser />
        </>
      ) : (
        <LoginBtn onClick={() => loginWithRedirect()} />
      )}
    </main>
  );
}

export default Header;
