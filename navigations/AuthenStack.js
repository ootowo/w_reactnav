import { createStackNavigator } from "react-navigation";

import FacebookDoneScreen from "../screens/FacebookDone";
import LoginScreen from "../screens/Login";
import RegisterDoneScreen from "../screens/RegisterDone";
import RegisterScreen from "../screens/Register";

const generalConfig = {
  headerMode: "none",
  cardStyle: {
    backgroundColor: "#FFFFFF"
  }
};

export default createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    RegisterDone: RegisterDoneScreen,
    FacebookDone: FacebookDoneScreen
  },
  generalConfig
);
