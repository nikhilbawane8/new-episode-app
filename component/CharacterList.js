"use client";
import { useState, useEffect, useContext } from "react";
import { EpisodeContext } from "../context/episodeProvider";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const ctx = useContext(EpisodeContext);
  const [episodeName, setEpisodeName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ctx.activeId) {
      fetch("https://rickandmortyapi.com/api/character")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCharacters(data.results);
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(`https://rickandmortyapi.com/api/episode/${ctx.activeId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("data", data);
          setEpisodeName(data.name);
          const promises = data.characters.map((url) => fetch(url));
          Promise.all(promises)
            .then((responses) => {
              const characterPromises = responses.map((response) =>
                response.json()
              );
              Promise.all(characterPromises)
                .then((characterData) => {
                  console.log("characterData", characterData);
                  setCharacters(characterData);
                  setLoading(false);
                })
                .catch((error) => {
                  console.error("Error fetching character data:", error);
                });
            })
            .catch((error) => {
              console.error("Error fetching responses:", error);
            });
          setCharacters([]);
        });
    }
  }, [ctx.activeId]);

  return (
    <>
      {episodeName && (
        <h3 className="characters-head ">
          {`${characters.length} Characters in episode "${episodeName}"`}
        </h3>
      )}
      {!loading && (
        <div className="char-container">
          {characters.map((character) => {
            return (
              <ul className="char-item" key={character.id}>
                <li>
                  <img
                    className="card"
                    src={character.image}
                    alt="Rick & Morty Character"
                    width="90"
                    height="90"
                  />
                </li>
                <li className="characters-text">
                  <h4>{character.name}</h4>
                </li>
              </ul>
            );
          })}
        </div>
      )}
      {loading && <h1 className="text-center characters-text">Loading...</h1>}
    </>
  );
};

export default CharacterList;
