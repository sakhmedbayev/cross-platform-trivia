import { ApolloProvider } from "@apollo/react-hooks";
import { Ionicons } from "@expo/vector-icons";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { RestLink } from "apollo-link-rest";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { typeDefs, resolvers } from "./resolvers";
import NavigationService from "./services/NavigationService";

// setup your `RestLink` with your endpoint
const restLink = new RestLink({
  uri: "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean",
  typePatcher: {
    Questions: (data, outerType, patchDeeper) => {
      if (data.results != null) {
        data.results = data.results.map(result => ({
          __typename: "Question",
          ...result
        }));
      }
      return data;
    }
  }
});

const cache = new InMemoryCache();
// setup your client
export const client = new ApolloClient({
  link: restLink,
  cache,
  typeDefs,
  resolvers
});

const writeDataToCache = () => cache.writeData({
  data: {
    answers: []
  }
});

writeDataToCache()

client.onResetStore(() => {
  cache.writeData({
    data: {
      answers: []
    }
  })
  return null
})

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </View>
      </ApolloProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
