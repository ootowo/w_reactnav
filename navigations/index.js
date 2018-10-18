import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import RegisterDoneScreen from "../screens/RegisterDone";
import FacebookDoneScreen from "../screens/FacebookDone";
import MainStack from "./MainStack";

const generalConfig = {
  headerMode: "none",
  cardStyle: {
    backgroundColor: "#FFFFFF"
  }
};
export const GuestStack = createStackNavigator(
  {
    Login: LoginScreen,
    FacebookDone: FacebookDoneScreen,
    Register: RegisterScreen,
    RegisterDone: RegisterDoneScreen,
    Main: MainStack
  },
  generalConfig
);

export const LoggedInStack = createStackNavigator(
  {
    Main: MainStack
  },
  generalConfig
);
