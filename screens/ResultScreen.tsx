import { useQuery } from "@apollo/react-hooks";
import React from "react";
import {
  ActivityIndicator,
  ListView,
  StyleSheet,
  View,
  Platform,
  Button,
  Text
} from "react-native";
import HTML from "react-native-render-html";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import QUESTIONS_QUERY from "../graphql/QUERY_QUESTIONS";
import { QuestionsQuery } from "../src/generated/graphql";
import TabBarIcon from "../components/TabBarIcon";
import { client } from "../App";
import { Header } from "../components/Header";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  slide: {
    backgroundColor: "rgba(20,20,200,0.3)"
  },
  buttonContainer: {
    flexDirection: "row",
    width: 150,
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
});

type Params = {};
type ScreenProps = {};

const ResultScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation
}) => {
  const { loading, error, data } = useQuery<QuestionsQuery>(QUESTIONS_QUERY, {
    fetchPolicy: "cache-first"
  });

  if (loading) {
    return (
      <View style={[styles.slideContainer, styles.slide]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error && process.env.NODE_ENV === "development") {
    return (
      <View style={[styles.slideContainer, styles.slide]}>
        <Text>`Error! ${error.message}`</Text>
      </View>
    );
  }

  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  const dataSource = {
    dataSource: ds.cloneWithRows(data.questions.results)
  };

  const correctAnswers = data.questions.results.filter(question => {
    return (
      JSON.parse(question.correct_answer.toLowerCase()) === question.userAnswer
    );
  }).length;

  return (
    <View>
      <Header
        correctAnswers={correctAnswers}
        totalQuestions={data.questions.results.length}
      />
      <ListView
        dataSource={dataSource.dataSource}
        renderRow={rowData => {
          const parsedUserAnswer = JSON.parse(
            rowData.correct_answer.toLowerCase()
          );

          return (
            <View>
              <View style={styles.row}>
                {rowData.userAnswer === parsedUserAnswer ? (
                  <TabBarIcon name="md-add" />
                ) : (
                  <TabBarIcon name="md-remove" />
                )}
                <HTML html={`<p>${rowData.question}</p>`} />
              </View>
            </View>
          );
        }}
      />
      <Button
        title="Play again"
        onPress={() => {
          client.resetStore();
          navigation.navigate("HomeScreen");
        }}
      />
    </View>
  );
};

export default ResultScreen;
