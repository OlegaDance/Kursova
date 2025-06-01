import React, { useEffect } from "react";

function SyncUser() {
  useEffect(() => {
    const user = {
      Id: localStorage.getItem("userId"),
      Name: localStorage.getItem("userName"),
      Email: localStorage.getItem("userEmail"),
      PictureUrl: localStorage.getItem("userPicture"),
    };

    if (!user.Id) {
      console.log("No user ID found, skipping sync.");
      return;
    }

    fetch("http://localhost:5158/api/auth/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json(); 
      })
      .then((data) => {
        console.log("User synced:", data.message);
      })
      .catch((err) => {
        console.error("Sync failed:", err);
      });
  }, []);

  return null; 
}

export default SyncUser;
