import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

const BetterFetch = () => {
  const client_id = "2c5d627bc9cf4778ac7226de71949b4e";
  const redirect_uri = "https://spotifyapioefenen.netlify.app/betterfetch";
  const auth_endpoint = "https://accounts.spotify.com/authorize";
  const response_type = "token";
  const [searchTracks, setSearchTracks] = useState("baby");
  const [track, setTracks] = useState([]);
  const [token, setToken] = useState("");

  console.log(auth_endpoint, client_id, redirect_uri, response_type);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchTrack = async (e) => {
    e.preventDefault();
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchTracks,
        type: "track",
      },
    });

    const { data } = response;
    console.log(data.tracks.items);
    setTracks(data.tracks.items);
  };

  const renderTrack = () => {
    return track.map((tracks) => (
      <div key={tracks.id}>
        {tracks.album.images[0].url ? (
          <img width={"50%"} src={tracks.album.images[0].url} alt="" />
        ) : (
          <div>geen foto</div>
        )}
        {tracks.name}{" "}
      </div>
    ));
  };

  return (
    <div className="BetterFetch">
      <header className="App-header">
        <h1>Spoopidei</h1>
        {!token ? (
          <a
            href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`}
          >
            Login
          </a>
        ) : (
          <button onClick={logout}>loguit</button>
        )}
      </header>

      <form onSubmit={searchTrack}>
        <input
          type="text"
          placeholder="track"
          onChange={(e) => setSearchTracks(e.target.value)}
        />
        <button type={"submit"}>zoek</button>
      </form>
      {renderTrack()}
    </div>
  );
};

export default BetterFetch;
