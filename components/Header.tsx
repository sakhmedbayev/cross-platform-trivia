import * as React from "react";
import { View, Text } from "react-native";

interface Props {
  correctAnswers: number;
  totalQuestions: number;
}

export const Header: React.FC<Props> = ({ correctAnswers, totalQuestions }) => {
  return (
    <View>
      <Text>Your score:</Text>
      <Text>
        {correctAnswers} / {totalQuestions}
      </Text>
    </View>
  );
};
