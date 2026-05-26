import { useEffect, useRef, useState } from "react";

type SoundStatus = "idle" | "listening" | "stopped" | "denied";

export function useSoundMeter() {
  const [status, setStatus] = useState<SoundStatus>("idle");
  const [soundLevel, setSoundLevel] = useState<number | null>(null);
  const [readings, setReadings] = useState<number[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  const startMeter = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      streamRef.current = stream;

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      setStatus("listening");

      const dataArray = new Uint8Array(analyser.fftSize);

      const updateMeter = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteTimeDomainData(dataArray);

        let sum = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const value = (dataArray[i] - 128) / 128;
          sum += value * value;
        }

        const rms = Math.sqrt(sum / dataArray.length);

        const estimatedDb = Math.min(
          120,
          Math.max(0, Math.round(20 * Math.log10(rms) + 100)),
        );

        setSoundLevel(estimatedDb);
        setReadings((prev) => [...prev, estimatedDb]);

        animationRef.current = requestAnimationFrame(updateMeter);
      };

      updateMeter();
    } catch (error) {
      console.log("Microphone error:", error);
      setStatus("denied");
    }
  };

  const stopMeter = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setStatus("stopped");
  };

  const resetReadings = () => {
    setSoundLevel(null);
    setReadings([]);
    setStatus("idle");
  };

  useEffect(() => {
    return () => stopMeter();
  }, []);

  const average =
    readings.length > 0
      ? Math.round(readings.reduce((a, b) => a + b, 0) / readings.length)
      : null;

  const max = readings.length > 0 ? Math.max(...readings) : null;

  const soundCategory =
    soundLevel === null
      ? "No reading"
      : soundLevel < 60
        ? "Safe / Quiet"
        : soundLevel < 85
          ? "Moderate"
          : "Loud / Risk";

  return {
    status,
    soundLevel,
    readings,
    average,
    max,
    soundCategory,
    startMeter,
    stopMeter,
    resetReadings,
  };
}
