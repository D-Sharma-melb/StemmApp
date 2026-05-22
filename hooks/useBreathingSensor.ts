import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

export function useBreathingSensor(isRecording: boolean) {
  const [bpm, setBpm] = useState(0);
  const [smoothness, setSmoothness] = useState(0);
  const [currentZ, setCurrentZ] = useState(0);

  const zAvgRef = useRef(9.81);
  const breathCount = useRef(0);
  const isRisingRef = useRef(false);
  const lastPeakTimeRef = useRef(0);
  const gapsRef = useRef<number[]>([]);

  useEffect(() => {
    let subscription: any;
    if (isRecording) {
      // reset
      breathCount.current = 0;
      gapsRef.current = [];
      zAvgRef.current = 9.81;
      setBpm(0);
      setSmoothness(0);

      Accelerometer.setUpdateInterval(100);
      subscription = Accelerometer.addListener(({ z }) => {
        // Gravity is around -9.81 or 9.81 depending on phone orientation.
        // We use absolute value for simplicity, so up/down doesn't break logic.
        const absZ = Math.abs(z);
        setCurrentZ(absZ);

        // Low-pass filter for the baseline moving average
        const alpha = 0.02;
        zAvgRef.current = zAvgRef.current * (1 - alpha) + absZ * alpha;

        const threshold = 0.05; // g-force variation from chest movement
        const now = Date.now();

        if (absZ > zAvgRef.current + threshold) {
          if (!isRisingRef.current) {
            // Crossed the threshold going UP
            isRisingRef.current = true;

            // Check cooldown to avoid double counting (min 1 second between breaths, max 60 BPM)
            if (now - lastPeakTimeRef.current > 1000) {
              if (lastPeakTimeRef.current > 0) {
                gapsRef.current.push(now - lastPeakTimeRef.current);
              }
              lastPeakTimeRef.current = now;
              breathCount.current += 1;
              setBpm(breathCount.current);
            }
          }
        } else if (absZ < zAvgRef.current - threshold) {
          // Crossed threshold going down
          isRisingRef.current = false;
        }
      });
    } else {
      if (subscription) subscription.remove();
      // Calculate final smoothness if recording stopped
      if (gapsRef.current.length > 1) {
        const avgGap =
          gapsRef.current.reduce((a, b) => a + b, 0) / gapsRef.current.length;
        const variance =
          gapsRef.current.reduce((a, b) => a + Math.pow(b - avgGap, 2), 0) /
          gapsRef.current.length;
        const stdDev = Math.sqrt(variance);
        // Map stdDev to a 0-100 score. (Smaller stdDev = smoother = higher score)
        // Avg gap ~2000-4000ms. StdDev might be ~200-500ms.
        let rawSmooth = 100 - stdDev / 10;
        setSmoothness(Math.max(0, Math.min(100, Math.round(rawSmooth))));
      } else {
        setSmoothness(100); // Perfect if very few stable breaths, just to have a number
      }
    }

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isRecording]);

  return { bpm, smoothness, currentZ };
}
