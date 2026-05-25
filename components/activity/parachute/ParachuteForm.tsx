import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../../styles/typography";
import { AppButton } from "../../shared/AppButton";
import { AppInput } from "../../shared/AppInput";
import { CardContainer } from "../../shared/CardContainer";

const g = 9.8;

interface ParachuteFormProps {
  onResults?: (results: Record<string, any> | null) => void;
}

export const ParachuteForm: React.FC<ParachuteFormProps> = ({ onResults }) => {
  const [height, setHeight] = useState(0 as number | string);
  const [mass, setMass] = useState(0 as number | string);
  const [timeImpact, setTimeImpact] = useState(0 as number | string);
  const [contactTime, setContactTime] = useState(0 as number | string);
  const [didBounce, setDidBounce] = useState(false);
  const [timeToMaxHeight, setTimeToMaxHeight] = useState(0 as number | string);

  const [results, setResults] = useState<null | Record<string, any>>(null);

  const parse = (v: number | string) => {
    const n = typeof v === "string" ? parseFloat(v) : v;
    return isNaN(n) ? 0 : n;
  };

  const calculate = () => {
    const H = parse(height);
    const m = parse(mass);
    const t = parse(timeImpact);
    const tc = parse(contactTime);
    const tup = parse(timeToMaxHeight);

    const finalVelocity = t > 0 ? H / t : 0;
    const acceleration = t > 0 ? finalVelocity / t : 0;
    const netForce = m * acceleration;
    const weight = m * g;
    const drag = weight - netForce;

    let gForce: number | null = null;
    if (tc > 0) {
      if (didBounce) {
        const vUp = g * tup;
        const deltaV = finalVelocity + vUp;
        gForce = deltaV / tc / g;
      } else {
        gForce = finalVelocity / tc / g;
      }
    }

    const computed = {
      finalVelocity,
      acceleration,
      netForce,
      weight,
      drag,
      gForce,
    };

    setResults(computed);
    onResults?.(computed);
  };

  const clear = () => {
    setHeight(0);
    setMass(0);
    setTimeImpact(0);
    setContactTime(0);
    setDidBounce(false);
    setTimeToMaxHeight(0);
    setResults(null);
    onResults?.(null);
  };

  return (
    <View>
      <CardContainer style={styles.card}>
        <Text style={styles.label}>Drop Height (m)</Text>
        <AppInput
          keyboardType="decimal-pad"
          value={height?.toString()}
          onChangeText={(v) => setHeight(v)}
          placeholder="e.g. 1.0"
        />

        <Text style={styles.label}>Mass (kg)</Text>
        <AppInput
          keyboardType="decimal-pad"
          value={mass?.toString()}
          onChangeText={(v) => setMass(v)}
          placeholder="e.g. 0.20"
        />

        <Text style={styles.label}>Time to first hit (s)</Text>
        <AppInput
          keyboardType="decimal-pad"
          value={timeImpact?.toString()}
          onChangeText={(v) => setTimeImpact(v)}
          placeholder="e.g. 0.50"
        />

        <Text style={styles.label}>Contact time (s) (slow motion)</Text>
        <AppInput
          keyboardType="decimal-pad"
          value={contactTime?.toString()}
          onChangeText={(v) => setContactTime(v)}
          placeholder="e.g. 0.05"
        />

        <View style={styles.row}>
          <Text style={styles.label}>Did it bounce?</Text>
          <Switch value={didBounce} onValueChange={setDidBounce} />
        </View>

        {didBounce && (
          <>
            <Text style={styles.label}>
              Time to max height after bounce (s)
            </Text>
            <AppInput
              keyboardType="decimal-pad"
              value={timeToMaxHeight?.toString()}
              onChangeText={(v) => setTimeToMaxHeight(v)}
              placeholder="e.g. 0.15"
            />
          </>
        )}

        <View style={styles.buttons}>
          <AppButton title="Calculate" onPress={calculate} />
          <View style={{ height: 12 }} />
          <AppButton title="Clear" onPress={clear} variant="secondary" />
        </View>
      </CardContainer>

      {results && (
        <CardContainer>
          <Text style={styles.resultTitle}>Results</Text>
          <Text style={styles.resultItem}>
            Final velocity: {Number(results.finalVelocity).toFixed(2)} m/s
          </Text>
          <Text style={styles.resultItem}>
            Acceleration: {Number(results.acceleration).toFixed(2)} m/s²
          </Text>
          <Text style={styles.resultItem}>
            Net force: {Number(results.netForce).toFixed(2)} N
          </Text>
          <Text style={styles.resultItem}>
            Weight: {Number(results.weight).toFixed(2)} N
          </Text>
          <Text style={styles.resultItem}>
            Drag force: {Number(results.drag).toFixed(2)} N
          </Text>
          <Text style={styles.resultItem}>
            G-force:{" "}
            {results.gForce === null ? "—" : Number(results.gForce).toFixed(2)}{" "}
            g
          </Text>
        </CardContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
    ...TYPOGRAPHY.label,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  buttons: {
    marginTop: 16,
  },
  resultTitle: {
    ...TYPOGRAPHY.subtitle,
    marginBottom: 8,
  },
  resultItem: {
    fontSize: 16,
    marginBottom: 6,
  },
});
