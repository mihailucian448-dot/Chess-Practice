import { useEffect, useRef, useCallback, useState } from "react";

export type Difficulty = "incepator" | "intermediar" | "avansat";

const SETTINGS: Record<Difficulty, { skill: number; depth: number; movetime: number; label: string }> = {
  incepator: { skill: 2, depth: 4, movetime: 200, label: "Începător" },
  intermediar: { skill: 10, depth: 10, movetime: 600, label: "Intermediar" },
  avansat: { skill: 20, depth: 18, movetime: 1500, label: "Avansat" },
};

export function getDifficultyLabel(d: Difficulty) {
  return SETTINGS[d].label;
}

export function useStockfish() {
  const workerRef = useRef<Worker | null>(null);
  const resolverRef = useRef<((move: string) => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = new Worker("/stockfish/stockfish.js");
    workerRef.current = w;

    w.onmessage = (e: MessageEvent) => {
      const line = typeof e.data === "string" ? e.data : "";
      if (line === "uciok" || line.startsWith("readyok")) {
        setReady(true);
      }
      if (line.startsWith("bestmove")) {
        const parts = line.split(" ");
        const move = parts[1];
        if (resolverRef.current && move && move !== "(none)") {
          resolverRef.current(move);
          resolverRef.current = null;
        }
      }
    };

    w.postMessage("uci");
    w.postMessage("isready");

    return () => {
      w.terminate();
      workerRef.current = null;
    };
  }, []);

  const getBestMove = useCallback(
    (fen: string, difficulty: Difficulty): Promise<string> => {
      return new Promise((resolve) => {
        const w = workerRef.current;
        if (!w) return resolve("");
        const cfg = SETTINGS[difficulty];
        resolverRef.current = resolve;
        w.postMessage(`setoption name Skill Level value ${cfg.skill}`);
        w.postMessage(`position fen ${fen}`);
        w.postMessage(`go depth ${cfg.depth} movetime ${cfg.movetime}`);
      });
    },
    []
  );

  return { ready, getBestMove };
}
