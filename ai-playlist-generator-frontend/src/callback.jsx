import { useEffect } from "react";

function Callback() {
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  fetch(`/.netlify/functions/token?code=${code}`)
    .then(res => res.json())
    .then(data => {
      console.log("ACCESS TOKEN:", data.access_token);
    });
}, []);

  return <h1>Logging you in...</h1>;
}

export default Callback;