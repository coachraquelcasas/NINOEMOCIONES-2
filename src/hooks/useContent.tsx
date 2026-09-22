import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Emotion, Guardian, AdventureScene } from "../types";
import { fetchEmotions, fetchGuardians, fetchScenes } from "../lib/content";
import { EMOTIONS as LOCAL_EMOTIONS } from "../data/emotions";
import { GUARDIANS as LOCAL_GUARDIANS } from "../data/guardians";
import { SCENES as LOCAL_SCENES } from "../data/adventure";

interface ContentState {
  emotions: Emotion[];
  guardians: Guardian[];
  scenes: AdventureScene[];
  loading: boolean;
  reload: () => void;
}

const ContentContext = createContext<ContentState>({
  emotions: LOCAL_EMOTIONS,
  guardians: LOCAL_GUARDIANS,
  scenes: LOCAL_SCENES,
  loading: false,
  reload: () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [emotions, setEmotions] = useState<Emotion[]>(LOCAL_EMOTIONS);
  const [guardians, setGuardians] = useState<Guardian[]>(LOCAL_GUARDIANS);
  const [scenes, setScenes] = useState<AdventureScene[]>(LOCAL_SCENES);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([fetchEmotions(), fetchGuardians(), fetchScenes()])
      .then(([e, g, s]) => {
        if (!active) return;
        setEmotions(e);
        setGuardians(g);
        setScenes(s);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [reloadKey]);

  return (
    <ContentContext.Provider
      value={{ emotions, guardians, scenes, loading, reload: () => setReloadKey((k) => k + 1) }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
