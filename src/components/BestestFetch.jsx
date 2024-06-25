import { useEffect, useState } from "react";

const client_id = "64c3c51d0f344446852be408b3949acf";
const client_secret = "00e41c2f0e32408b86caf4f966e99a98";

async function getToken() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },
    });
    if (!response.ok) {
      throw new Error("geen acces token");
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("error token", error);
    return null;
  }
}

const BestestFetch = ({ onDataFetched }) => {
  useEffect(() => {
    async function fetchData() {
      const accessToken = await getToken();
      if (!accessToken) {
        console.error("geen access token");
        return;
      }
      onDataFetched(accessToken);
    }
    fetchData();
  }, [onDataFetched]);
  return null;
};

export default BestestFetch;
