import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Імпортуємо хук

import LoginBtn from "../../component/loginBtn/LoginBtn.jsx";
import LogOutBtn from "../../component/logOutBtn/logOutBtn.jsx";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0(); // Використовуємо хук для отримання статусу авторизації

  return (
    <main className={styles.header}>
      <nav className={styles.navigationTarget}>
        <Link className="navigatorTarget" to={"/"}>
          Головна
        </Link>
        <Link className="navigatorTarget" to={"./KatalogCar"}>
          Всі авто
        </Link>
        <Link className="navigatorTarget" to={"./MyProfile"}>
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
