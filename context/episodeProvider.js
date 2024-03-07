import React, { useState } from "react";

export const EpisodeContext = React.createContext({
  activeId: "",
  setActiveId: () => {},
});

const EpisodeProvider = (props) => {
  const [activeId, setActiveId] = useState("");

  const episodeContext = {
    activeId,
    setActiveId,
  };

  return (
    <EpisodeContext.Provider value={episodeContext}>
      {props.children}
    </EpisodeContext.Provider>
  );
};

export default EpisodeProvider;
