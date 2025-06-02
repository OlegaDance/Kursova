import React, { useEffect } from "react";

function SyncUser({ user }) {
  useEffect(() => {
    if (!user?.sub) return;

    const syncUser = async () => {
      try {
        const dto = {
          Id: user.sub, // Відправляємо весь user.sub (наприклад "auth0|1234567890")
          Name: user.name,
          Email: user.email,
          PictureUrl: user.picture,
        };

        const response = await fetch("http://localhost:5158/api/auth/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to sync user: ${response.status} ${errorText}`
          );
        }

        const data = await response.json();
        console.log("User synced successfully:", data);

        // Якщо потрібно, збережи в localStorage id з БД
        localStorage.setItem("userId", data.userId);
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    syncUser();
  }, [user]);

  return null;
}

export default SyncUser;
