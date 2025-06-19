import React, { useEffect, useState } from "react";
import Graphs from "./Graphs.JS";

function Profile({ token, onLogout }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const query = {
      query: `
        {
          user {
            id
            login
          }
        }
      `,
    };

    const res = await fetch(
      "https://zone01normandie.org/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(query),
      }
    );

    const result = await res.json();
    setUser(result.data.user[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <div className="text-center mt-10">Chargement...</div>;

  return (
    <div className="p-6">
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 mb-4"
      >
        Déconnexion
      </button>
      <h1 className="text-2xl font-bold mb-4">Profil de {user.login}</h1>
      {/* Tu peux ajouter d'autres composants de données ici */}
      <Graphs token={token} />
    </div>
  );
}

export default Profile;
