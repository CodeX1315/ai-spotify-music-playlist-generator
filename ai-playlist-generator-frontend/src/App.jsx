import { useState } from "react";

function App() {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Spotify Config
  const CLIENT_ID = "5a5b6a6516714068a6c69530a8acfed8"; // <-- yaha apna daal
  const REDIRECT_URI = "https://localhost:5173/callback";

  const loginWithSpotify = () => {
    const scope = "user-read-private user-top-read user-read-recently-played";

    window.location.href =
      `https://accounts.spotify.com/authorize?` +
      `client_id=${CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(scope)}`;
  };

  const callAPI = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://54poxu5lq8.execute-api.us-east-1.amazonaws.com/default/playlistGeneratorFunction"
      );
      const data = await res.json();
      setPlaylist(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center pt-16">
      
      <h1 className="text-4xl font-bold mb-6">
        🎧 AI Playlist Generator
      </h1>

      {/* 🔥 Spotify Login Button */}
      <button
        onClick={loginWithSpotify}
        className="mb-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
      >
        Login with Spotify
      </button>

      {/* Existing Button */}
      <button
        onClick={callAPI}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-semibold transition 
        ${loading 
          ? "bg-gray-600 cursor-not-allowed" 
          : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {loading ? "Generating..." : "Generate Playlist"}
      </button>

      {playlist && (
        <div className="mt-10 bg-slate-800 p-6 rounded-xl w-80 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            {playlist.name}
          </h2>

          <p className="text-slate-400 mb-4">
            {playlist.mood}
          </p>

          <ul className="space-y-2">
            {playlist?.songs?.map((song, index) => (
              <li key={index} className="border-b border-slate-700 pb-1">
                {song}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;