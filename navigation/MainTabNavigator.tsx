import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import { createBottomTabNavigator,  } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";

const config: any = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

HomeStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: QuizScreen
  },
  {
    ...config,
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

LinksStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack
});

(tabNavigator as any).path = "";

export default tabNavigator;
