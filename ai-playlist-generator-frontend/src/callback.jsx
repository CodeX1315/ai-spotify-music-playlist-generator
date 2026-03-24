import { useEffect } from "react";

function Callback() {
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  console.log("CODE:", code);

  fetch(`/.netlify/functions/token?code=${code}`)
    .then(res => {
      console.log("RESPONSE STATUS:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("FULL DATA:", data);
    })
    .catch(err => {
      console.error("FETCH ERROR:", err);
    });
}, []);

  return <h1>Logging you in...</h1>;
}

export default Callback;