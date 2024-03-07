"use client";
import { useState, useEffect, useContext } from "react";
import { EpisodeContext } from "../context/episodeProvider";

const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const ctx = useContext(EpisodeContext);
  console.log("ctx.....", ctx);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/episode")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEpisodes(data.results);
      });
  }, []);

  return (
    <ul>
      {episodes.map((episode) => {
        return (
          <li
            className={`episode-item ${
              ctx.activeId == episode.id ? "highlight" : ""
            }`}
            key={episode.id}
            onClick={() => {
              ctx.setActiveId(ctx.activeId == episode.id ? "" : episode.id);
            }}
          >
            <h3>{episode.name}</h3>
          </li>
        );
      })}
    </ul>
  );
};

export default EpisodeList;
