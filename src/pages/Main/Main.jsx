import React from "react";
import { useState } from "react";
import styles from "./Main.module.scss";
import Profile from "../../component/Profile/Profile";
import VinCoder from "../../component/VinCoder/VinCoder";

export const Main = () => {
  return (
    <div>
      <Profile />
      <VinCoder />
    </div>
  );
};
