import { useEffect, useRef, useState } from "react";

type Status = "idle" | "waiting" | "ready" | "finished" | "early";

export function useReactionTimer() {
  const [status, setStatus] = useState<Status>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startChallenge = () => {
    setStatus("waiting");
    setReactionTime(null);

    const delay = Math.random() * 3000 + 1500;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setStatus("ready");
    }, delay);
  };

  const handlePress = () => {
    if (status === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setStatus("early");
      return;
    }

    if (status === "ready") {
      const time = Date.now() - startTimeRef.current;

      setReactionTime(time);
      setAttempts((prev) => [...prev, time]);

      setBestScore((prev) => {
        if (prev === null || time < prev) return time;
        return prev;
      });

      setStatus("finished");
    }
  };

  const resetScores = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setStatus("idle");
    setReactionTime(null);
    setBestScore(null);
    setAttempts([]);
  };

  const average =
    attempts.length > 0
      ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)
      : null;

  return {
    status,
    reactionTime,
    bestScore,
    average,
    attempts,
    startChallenge,
    handlePress,
    resetScores,
  };
}
