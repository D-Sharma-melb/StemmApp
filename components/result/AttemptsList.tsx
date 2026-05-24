import React from "react";
import { FlatList } from "react-native";
import { AttemptItem, AttemptItemCard } from "./AttemptItemCard";

interface AttemptsListProps {
  attempts: AttemptItem[];
}

export function AttemptsList({ attempts }: AttemptsListProps) {
  return (
    <FlatList
      data={attempts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AttemptItemCard attempt={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}
