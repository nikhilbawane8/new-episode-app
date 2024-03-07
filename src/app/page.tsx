"use client";
import React from "react";

import EpisodeProvider from "../../context/episodeProvider";

import EpisodeList from "../../component/EpisodeList";
import CharacterList from "../../component/CharacterList";

const Home: React.FC = () => {
  return (
    <EpisodeProvider>
      <div className="h-100">
        <h1 className="heading">Rick & Morty Characters</h1>
        <div className="container">
          <div className="side-bar">
            <h2 className="text-center">Episodes</h2>
            <div className="episode-list">
              <EpisodeList />
            </div>
          </div>
          <div className="main-panel">
            <CharacterList />
          </div>
        </div>
      </div>
    </EpisodeProvider>
  );
};

export default Home;
