import React from "react";
import { Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useQuery } from "@apollo/react-hooks";
import { QuestionsQuery } from "../src/generated/graphql";
import QUESTIONS_QUERY from "../graphql/QUERY_QUESTIONS";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  }
});

type Params = {};
type ScreenProps = {};

const HomeScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation
}) => {
  const { loading, error, data } = useQuery<QuestionsQuery>(QUESTIONS_QUERY, {
    fetchPolicy: "no-cache"
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error && process.env.NODE_ENV === "development") {
    return (
      <View style={styles.container}>
        <Text>`Error! ${error.message}`</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container]}>
        <View style={styles.welcomeContainer}>
          <Text>Welcome to the Trivia Challenge</Text>

          <Text>You will be presented with {data.questions.results.length} True or False quesﬁons.</Text>

          <Text>Can you score 100%?</Text>

          <Button
            title="BEGIN"
            onPress={() => navigation.navigate("QuizScreen")}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
