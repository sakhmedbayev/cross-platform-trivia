import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  active: {
    backgroundColor: 'green'
  }
});

interface Props {
  selected: Boolean;
  title: String;
  onPress: () => void;
}

export const ButtonBoolean: React.FC<Props> = ({ title, selected, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, selected && styles.active]} onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
