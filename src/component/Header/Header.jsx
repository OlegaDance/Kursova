import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import btnProfile from '../../assets/svg/btnProfile.jsx'


function Header() {
  return (
    <div className={styles.header}>
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
      <Link to={'/Singin'}>
						<button className={styles.btnLogReg}>Увійти</button>
				</Link>
    </div>
  );
}

export default Header;
