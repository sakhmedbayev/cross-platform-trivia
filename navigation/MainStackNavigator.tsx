import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";

const config: any = Platform.select({
  web: { headerMode: "none" },
  default: {}
});

const stackNavigator = createStackNavigator(
  {
    HomeScreen,
    QuizScreen,
    ResultScreen
  },
  config
);

(stackNavigator as any).path = "";

export default stackNavigator;
