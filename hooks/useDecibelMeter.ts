import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";

export function useDecibelMeter() {
  const [isRecording, setIsRecording] = useState(false);
  const [decibels, setDecibels] = useState(0);
  const [maxDecibels, setMaxDecibels] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    return () => {
      stopMetering();
    };
  }, []);

  const startMetering = async () => {
    if (!hasPermission) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        (status) => {
          if (status.isRecording && status.metering !== undefined) {
            // metering is roughly -160 to 0. We'll map it to a positive scale 0-120
            // Since -160 is silence and 0 is loudest, this is a rough calibration.
            const dbSPL = Math.max(0, status.metering + 100);
            const roundedDb = Math.round(dbSPL);
            setDecibels(roundedDb);
            setMaxDecibels((prev) => Math.max(prev, roundedDb));
          }
        },
        // update interval in ms
        100,
      );

      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopMetering = async () => {
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }
      setIsRecording(false);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const resetMax = () => setMaxDecibels(0);

  return {
    isRecording,
    decibels,
    maxDecibels,
    startMetering,
    stopMetering,
    resetMax,
    hasPermission,
  };
}
