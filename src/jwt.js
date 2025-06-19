let token = localStorage.getItem("jwt");

if (token) {
  showProfile();
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("error");
  error.textContent = "";

  const headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(`${user}:${pass}`));

  fetch("https://zone01normandie.org/api/auth/signin", {
    method: "POST",
    headers: headers,
  })
    .then((res) => {
      if (!res.ok) throw new Error("Identifiants invalides");
      return res.text();
    })
    .then((jwt) => {
      localStorage.setItem("jwt", jwt);
      token = jwt;
      showProfile();
    })
    .catch((err) => {
      error.textContent = err.message;
    });
}

function logout() {
  localStorage.removeItem("jwt");
  token = null;
  document.getElementById("profile").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function showProfile() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("profile").classList.remove("hidden");

  fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: `{ user { id login } }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const user = data.data.user[0];
      document.getElementById(
        "welcome"
      ).textContent = `Bienvenue ${user.login} (ID: ${user.id})`;
      loadGraph();
    });
}

function loadGraph() {
  fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: `
        {
          transaction(where: { type: { _eq: "xp" } }, order_by: {createdAt: asc}) {
            amount
            createdAt
          }
        }
      `,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const svg = document.getElementById("graph");
      svg.innerHTML = "";

      const points = data.data.transaction.slice(0, 10);

      points.forEach((point, i) => {
        const height = point.amount / 1000;
        svg.innerHTML += `<rect x="${i * 50}" y="${
          200 - height
        }" width="40" height="${height}" fill="steelblue" />`;
      });
    });
}
