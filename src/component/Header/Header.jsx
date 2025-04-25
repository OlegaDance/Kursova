import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LoginBtn from "../../component/loginBtn/LoginBtn.jsx";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <main className={styles.header}>
      <nav className={styles.navigationTarget}>
        <Link className="navigatorTarget" to={"/"}>
          Головна
        </Link>
        <Link className="navigatorTarget" to={"./KatalogCar"}>
          Всі авто
        </Link>
        <Link className="navigatorTarget" to={"./profilePage"}>
          Профіль
        </Link>
      </nav>

      {isAuthenticated ? (
        <button
          onClick={() => {
            console.log("Logging out...");
            logout({ returnTo: "http://localhost:5173/" });
          }}
        >
          Вийти
        </button>
      ) : (
        <LoginBtn onClick={() => loginWithRedirect()} />
      )}
    </main>
  );
}

export default Header;
