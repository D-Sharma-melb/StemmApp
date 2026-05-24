import * as Haptics from "expo-haptics";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

export function useEarthquakeSensors(
  isRecording: boolean,
  earthquakeMode: string,
) {
  const [currentVibration, setCurrentVibration] = useState(0);
  const [maxAcceleration, setMaxAcceleration] = useState(0);
  const [currentTilt, setCurrentTilt] = useState(0);
  const [maxTilt, setMaxTilt] = useState(0);
  const [graphData, setGraphData] = useState<number[]>(new Array(20).fill(0));

  const hapticInterval = useRef<any>(null);

  useEffect(() => {
    let accSub: any;
    let gyroSub: any;

    if (isRecording) {
      // Reset stats
      setMaxAcceleration(0);
      setMaxTilt(0);
      setCurrentVibration(0);
      setCurrentTilt(0);
      setGraphData(new Array(20).fill(0));

      Accelerometer.setUpdateInterval(100);
      Gyroscope.setUpdateInterval(100);

      accSub = Accelerometer.addListener(({ x, y, z }) => {
        // Calculate magnitude of acceleration vector minus gravity ~1G
        const totalForce = Math.sqrt(x * x + y * y + z * z);
        const vibration = Math.abs(totalForce - 1);

        setCurrentVibration(vibration);
        setMaxAcceleration((prev) => Math.max(prev, vibration));

        setGraphData((prev) => {
          const newData = [...prev.slice(1), vibration * 10]; // Scale up for visual graph
          return newData;
        });
      });

      gyroSub = Gyroscope.addListener(({ x, y, z }) => {
        // Gyro measures rotation rate in rad/s, we estimate tilt activity over time
        const tiltMagnitude = Math.sqrt(x * x + y * y + z * z);
        setCurrentTilt(tiltMagnitude);
        setMaxTilt((prev) => Math.max(prev, tiltMagnitude));
      });

      // Haptics simulation based on mode
      let delay = 500;
      let hapticStyle = Haptics.ImpactFeedbackStyle.Light;

      if (earthquakeMode === "Moderate") {
        delay = 250;
        hapticStyle = Haptics.ImpactFeedbackStyle.Medium;
      } else if (earthquakeMode === "Severe") {
        delay = 100;
        hapticStyle = Haptics.ImpactFeedbackStyle.Heavy;
      }

      hapticInterval.current = setInterval(() => {
        Haptics.impactAsync(hapticStyle);
      }, delay);
    } else {
      if (accSub) accSub.remove();
      if (gyroSub) gyroSub.remove();
      if (hapticInterval.current) clearInterval(hapticInterval.current);
    }

    return () => {
      if (accSub) accSub.remove();
      if (gyroSub) gyroSub.remove();
      if (hapticInterval.current) clearInterval(hapticInterval.current);
    };
  }, [isRecording, earthquakeMode]);

  return { currentVibration, maxAcceleration, currentTilt, maxTilt, graphData };
}
