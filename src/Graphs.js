import React, { useEffect, useState } from "react";

function Graphs({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getXPData = async () => {
      const query = {
        query: `
          {
            transaction(where: { type: { _eq: "xp" } }) {
              amount
              createdAt
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
      setData(result.data.transaction);
    };

    getXPData();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Graphique XP</h2>
      <svg width="400" height="200" className="bg-white shadow rounded">
        {data.slice(0, 10).map((d, i) => (
          <rect
            key={i}
            x={i * 40}
            y={200 - d.amount / 1000}
            width="30"
            height={d.amount / 1000}
            fill="blue"
          />
        ))}
      </svg>
    </div>
  );
}

export default Graphs;
