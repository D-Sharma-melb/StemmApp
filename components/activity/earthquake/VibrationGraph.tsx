import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface Props {
  data: number[];
}

export const VibrationGraph: React.FC<Props> = ({ data }) => {
  return (
    <View style={{ marginVertical: 20, alignItems: "center" }}>
      <LineChart
        data={{
          labels: [],
          datasets: [{ data: data.length ? data : [0] }],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        withDots={false}
        withVerticalLines={false}
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: "0",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};
