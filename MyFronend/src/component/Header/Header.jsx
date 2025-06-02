import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LoginBtn from "../../component/loginBtn/LoginBtn.jsx";
import SyncUser from "../../component/Syncuser/SyncUser.jsx";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated && user) {
      const rawSub = user.sub || "";
      const idString = rawSub.split("|")[1];
      const idInt = parseInt(idString, 10);

      if (!isNaN(idInt)) {
        localStorage.setItem("userId", idInt.toString());
      } else {
        console.warn("User sub does not contain a valid numeric ID");
      }

      localStorage.setItem("userName", user.name || "");
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("userPicture", user.picture || "");
    }
  }, [isAuthenticated, user]);

  return (
    <main className={styles.header}>
      <nav className={styles.navigationTarget}>
        <Link to={"/"}>Головна</Link>
        <Link to={"./TestVin"}>Провірка VIN</Link>
        <Link to={"./profilePage"}>Профіль</Link>
      </nav>

      {/* Рендеримо кнопку тільки якщо користувач авторизований */}
      {isAuthenticated && (
        <Link to={"./AddCarPage"}>
          <button>Додати авто</button>
        </Link>
      )}

      {isAuthenticated && user ? (
        <>
          <button
            onClick={() => logout({ returnTo: "http://localhost:5173/" })}
          >
            Вийти
          </button>
          <SyncUser user={user} />
        </>
      ) : (
        <LoginBtn onClick={() => loginWithRedirect()} />
      )}
    </main>
  );
}

export default Header;
