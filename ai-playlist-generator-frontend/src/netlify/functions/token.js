export async function handler(event) {
  const code = event.queryStringParameters.code;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://aiplaylistspotify.netlify.app/callback",
    }),
  });

  const data = await response.json();
  console.log("CLIENT ID:", process.env.SPOTIFY_CLIENT_ID);
console.log("SECRET:", process.env.SPOTIFY_CLIENT_SECRET);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}